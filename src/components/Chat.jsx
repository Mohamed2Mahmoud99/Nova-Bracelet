import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion as MOTION, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

// Small typing dots component
const TypingDots = () => (
  <div className="flex space-x-1">
    <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce"></span>
    <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce delay-150"></span>
    <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce delay-300"></span>
  </div>
);

export default function Chat({
  onSend,
  storageKey = "nova_chat_history",
  placeholderKey = "placeholder", // translation key
}) {
  const { i18n, t } = useTranslation();
  // eslint-disable-next-line no-empty-pattern
  const [] = useState(i18n.language || "en");

  const [messages, setMessages] = useState(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Chat: failed reading history", e);
      return [];
    }
  });

  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [botTyping, setBotTyping] = useState(false);
  const [notice, setNotice] = useState(null);

  const listRef = useRef(null);
  const mountedRef = useRef(true);
  const saveTimeoutRef = useRef(null);

  // ✅ translate placeholder dynamically
  const placeholder = t(placeholderKey);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, []);

  // Debounced persist
  useEffect(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(messages));
      } catch (err) {
        console.error("Chat: failed saving history", err);
      }
    }, 300);
  }, [messages, storageKey]);

  // Auto scroll
  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, botTyping]);

  // Helpers
  const makeMsg = (props) => ({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    role: props.role,
    text: props.text ?? "",
    status: props.status ?? "sent",
    ts: props.ts ?? Date.now(),
    meta: props.meta ?? {},
  });

  const appendMessage = useCallback((msg) => {
    setMessages((m) => [...m, msg]);
  }, []);

  const updateMessage = useCallback((id, patch) => {
    setMessages((cur) =>
      cur.map((m) => (m.id === id ? { ...m, ...patch } : m))
    );
  }, []);

  const copyToClipboard = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setNotice(t("copied"));
      setTimeout(() => setNotice(null), 1500);
    } catch (err) {
      console.error("copy failed", err);
      setNotice(t("copyFailed"));
      setTimeout(() => setNotice(null), 1500);
    }
  }, [t]);

  const exportJSON = useCallback(() => {
    try {
      const blob = new Blob([JSON.stringify(messages, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `nova_chat_${new Date().toISOString()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("export failed", err);
      setNotice(t("exportFailed"));
      setTimeout(() => setNotice(null), 1500);
    }
  }, [messages, t]);

  const clearChat = useCallback(() => {
    setMessages([]);
    try {
      localStorage.removeItem(storageKey);
    } catch (err) {
      console.error("clearChat", err);
    }
  }, [storageKey]);

  const isAsyncIterable = (val) =>
    val && typeof val[Symbol.asyncIterator] === "function";

  const sendToBackend = useCallback(
    async (text, { onChunk } = {}) => {
      if (!onSend) {
        await new Promise((r) => setTimeout(r, 600 + Math.random() * 600));
        return `Echo: ${text}`;
      }
      const result = await onSend(text);

      if (isAsyncIterable(result) && typeof onChunk === "function") {
        for await (const chunk of result) {
          if (!mountedRef.current) break;
          try {
            onChunk(String(chunk));
          } catch (err) {
            console.error("onChunk handler failed", err);
          }
        }
        return;
      }

      return typeof result === "string" ? result : result?.reply ?? "";
    },
    [onSend]
  );

  const handleSend = useCallback(
    async (e) => {
      if (e && e.preventDefault) e.preventDefault();
      const trimmed = input.trim();
      if (!trimmed || sending) return;

      const userMsg = makeMsg({ role: "user", text: trimmed, status: "pending" });
      appendMessage(userMsg);
      setInput("");
      setSending(true);
      setBotTyping(true);

      let botMsg = makeMsg({ role: "bot", text: "", status: "sent" });
      appendMessage(botMsg);

      try {
        const maybe = await sendToBackend(trimmed, {
          onChunk: (chunk) => {
            botMsg = { ...botMsg, text: (botMsg.text || "") + String(chunk) };
            updateMessage(botMsg.id, { text: botMsg.text });
          },
        });

        if (maybe !== undefined && !isAsyncIterable(maybe)) {
          botMsg.text = String(maybe || "(no reply)");
          updateMessage(botMsg.id, { text: botMsg.text });
        }

        updateMessage(userMsg.id, { status: "sent" });
      } catch (err) {
        console.error("send failed", err);
        updateMessage(userMsg.id, { status: "failed" });
        updateMessage(botMsg.id, {
          text: t("sendFailed"),
        });
      } finally {
        if (mountedRef.current) {
          setBotTyping(false);
          setSending(false);
        }
      }
    },
    [input, sending, appendMessage, sendToBackend, updateMessage, t]
  );

  const retryMessage = useCallback(
    async (failedMsg) => {
      if (!failedMsg || failedMsg.role !== "user") return;
      updateMessage(failedMsg.id, { status: "pending" });
      try {
        setBotTyping(true);
        const reply = await sendToBackend(failedMsg.text);
        updateMessage(failedMsg.id, { status: "sent" });
        appendMessage(
          makeMsg({ role: "bot", text: reply || "(no reply)", status: "sent" })
        );
      } catch (err) {
        console.error("retry failed", err);
        updateMessage(failedMsg.id, { status: "failed" });
      } finally {
        setBotTyping(false);
      }
    },
    [sendToBackend, updateMessage, appendMessage]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const fmt = useCallback((ts) => {
    try {
      const d = new Date(ts);
      return d.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  }, []);

  useMemo(
    () => (messages.length ? messages[messages.length - 1].id : null),
    [messages]
  );

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <div className="bg-gradient-to-tr from-[#071014] to-[#061018] rounded-2xl shadow-lg overflow-hidden border border-white/5 pt-14">
        {/* Header */}
        <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1d697e] to-[#5ccae9] flex items-center justify-center text-white font-bold">
              AI
            </div>
            <div>
              <div className="text-white font-semibold">{t("chatTitle")}</div>
              <div className="text-xs text-white/60">{t("chatSubtitle")}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportJSON}
              className="text-sm px-3 py-1 rounded bg-white/6 text-white hover:bg-white/10"
            >
              {t("export")}
            </button>
            <button
              onClick={clearChat}
              className="text-sm px-3 py-1 rounded bg-white/6 text-white hover:bg-white/10"
            >
              {t("clear")}
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={listRef}
          className="h-[420px] sm:h-[520px] overflow-y-auto p-4 space-y-4"
          role="log"
          aria-live="polite"
          aria-atomic="false"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {messages.map((m) => (
              <MOTION.div
                key={m.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.16 }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="max-w-[82%] flex flex-col gap-2">
                  <div
                    className={`px-4 py-2 rounded-2xl shadow-sm whitespace-pre-wrap break-words ${
                      m.role === "user"
                        ? "bg-[#1d697e] text-black rounded-br-none"
                        : "bg-white/6 text-white rounded-bl-none"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-sm leading-snug">{m.text}</div>

                      <div className="ml-3 flex items-center gap-2">
                        {m.role === "user" && m.status === "pending" && (
                          <span className="text-xs text-white/60 italic">{t("sending")}</span>
                        )}
                        {m.role === "user" && m.status === "failed" && (
                          <button
                            onClick={() => retryMessage(m)}
                            className="text-xs px-2 py-1 bg-red-600 text-white rounded"
                          >
                            {t("retry")}
                          </button>
                        )}

                        <button
                          onClick={() => copyToClipboard(m.text)}
                          className="text-xs px-2 py-1 bg-white/6 text-white rounded"
                        >
                          {t("copy")}
                        </button>
                      </div>
                    </div>

                    <div className="text-[11px] text-white/50 mt-1 flex items-center justify-between">
                      <span>{fmt(m.ts)}</span>
                      <span className="ml-2 text-xs text-white/40">
                        {m.status === "failed"
                          ? t("failed")
                          : m.status === "pending"
                          ? t("pending")
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </MOTION.div>
            ))}

            {botTyping && (
              <MOTION.div
                key="typing-ind"
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.14 }}
                className="flex justify-start"
              >
                <div className="bg-white/6 text-white px-4 py-2 rounded-2xl rounded-bl-none">
                  <div className="flex items-center gap-2">
                    <TypingDots />
                    <span className="text-sm text-white/80">{t("thinking")}</span>
                  </div>
                </div>
              </MOTION.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input */}
        <form
          onSubmit={handleSend}
          className="px-4 py-3 border-t border-white/5 bg-gradient-to-t from-black/40 to-transparent"
        >
          <div className="flex gap-3 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="flex-1 min-h-[48px] max-h-[160px] resize-none rounded-xl bg-white/5 border border-white/6 px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#1d697e]"
            />

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                disabled={sending}
                className={`px-4 py-2 rounded-xl font-semibold transition ${
                  sending
                    ? "bg-gray-600 text-white/70 cursor-not-allowed"
                    : "bg-[#1d697e] text-black"
                }`}
              >
                {sending ? t("sending") : t("send")}
              </button>

              <button
                type="button"
                onClick={() => setInput("")}
                className="px-3 py-1 rounded bg-white/6 text-white text-xs"
              >
                {t("clearInput")}
              </button>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <div className="text-xs text-white/50">
              {t("tipSend")} {/* Example key for tips */}
            </div>
            <div className="flex items-center gap-2">
              {notice && (
                <div className="text-xs text-white/80 px-2 py-1 bg-white/6 rounded">
                  {notice}
                </div>
              )}
              <button
                onClick={exportJSON}
                type="button"
                className="text-xs text-white/60 hover:text-white underline"
              >
                {t("export")}
              </button>
              <button
                onClick={clearChat}
                type="button"
                className="text-xs text-white/60 hover:text-white underline"
              >
                {t("clear")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}