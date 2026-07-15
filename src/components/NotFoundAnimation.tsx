import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/* ── Key → Value mapping data ── */
const mappings = [
  { key: "{{client_name}}", value: "Acme Corp.",   color: "bg-sky-100 text-sky-600" },
  { key: "{{issue_date}}", value: "04 Jun 2026",   color: "bg-violet-100 text-violet-600" },
  { key: "{{doc_id}}",     value: "DG-00492",      color: "bg-amber-100 text-amber-600" },
  { key: "{{amount}}",     value: "$12,400.00",    color: "bg-emerald-100 text-emerald-600" },
  { key: "{{due_date}}",   value: "30 Jun 2026",   color: "bg-rose-100 text-rose-600" },
];

/* Typing effect hook */
function useTyped(text: string, speed = 45, active = true) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!active) return;
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, active]);

  return displayed;
}

/* Single mapping row with typing value */
function MappingRow({
  keyLabel,
  value,
  color,
  delay,
}: {
  keyLabel: string;
  value: string;
  color: string;
  delay: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const typed = useTyped(value, 40, visible);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-2"
        >
          {/* Key pill */}
          <span
            className={`shrink-0 rounded-md px-2 py-0.5 font-mono text-[0.58rem] font-semibold ${color}`}
          >
            {keyLabel}
          </span>

          {/* Arrow */}
          <span className="text-[0.6rem] text-gray-400">→</span>

          {/* Value with cursor */}
          <span className="text-[0.65rem] text-gray-700">
            {typed}
            {typed.length < value.length && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-px h-3 bg-gray-500 ml-0.5 align-middle"
              />
            )}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Document preview lines with placeholders replaced ── */
const docLines = [
  { text: "Service Agreement", bold: true },
  { text: "Client:  {{client_name}}", isKey: true },
  { text: "Date:    {{issue_date}}", isKey: true },
  { text: "Ref ID:  {{doc_id}}", isKey: true },
  { text: "─────────────────────", dim: true },
  { text: "Amount due: {{amount}}", isKey: true },
  { text: "Due by: {{due_date}}", isKey: true },
];

const resolvedValues: Record<string, string> = {
  "{{client_name}}": "Acme Corp.",
  "{{issue_date}}": "04 Jun 2026",
  "{{doc_id}}": "DG-00492",
  "{{amount}}": "$12,400.00",
  "{{due_date}}": "30 Jun 2026",
};

function DocLine({
  text,
  bold,
  dim,
  isKey,
  resolved,
}: {
  text: string;
  bold?: boolean;
  dim?: boolean;
  isKey?: boolean;
  resolved?: boolean;
}) {
  const display =
    isKey && resolved
      ? text.replace(/\{\{[^}]+\}\}/g, (m) => resolvedValues[m] ?? m)
      : text;

  return (
    <p
      className={`font-mono text-[0.6rem] leading-relaxed transition-colors duration-700 ${
        bold ? "font-bold text-gray-800" : ""
      } ${dim ? "text-gray-300" : ""} ${
        isKey && !resolved ? "text-amber-600/90" : ""
      } ${isKey && resolved ? "text-emerald-600/90" : ""} ${
        !bold && !dim && !isKey ? "text-gray-500" : ""
      }`}
    >
      {display}
    </p>
  );
}

/* ── Main component ── */
const NotFoundAnimation = () => {
  const [resolved, setResolved] = useState(false);

  /* After mappings finish animating, flip the doc to resolved state */
  useEffect(() => {
    const totalDelay = mappings.length * 420 + 1600;
    const t = setTimeout(() => {
      setResolved(true);
      /* Reset after a pause so it loops */
      setTimeout(() => setResolved(false), 4000);
    }, totalDelay);
    return () => clearTimeout(t);
  }, [resolved]);

  return (
    <div className="relative flex flex-col gap-4 w-[18rem] md:w-[22rem]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-[hsl(195_65%_60%)]/20 blur-[70px]" />

      {/* ── Document preview panel ── */}
      <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-md shadow-xl overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-400/80" />
            <span className="h-2 w-2 rounded-full bg-amber-400/80" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
          </div>
          <p className="text-[0.58rem] uppercase tracking-[0.25em] text-gray-400">
            template.docx
          </p>
          {/* Live build indicator */}
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center gap-1"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="text-[0.55rem] text-gray-400">building</span>
          </motion.div>
        </div>

        <div className="px-4 py-3 space-y-0.5">
          {docLines.map((line, i) => (
            <DocLine key={i} {...line} resolved={resolved} />
          ))}
        </div>
      </div>

      {/* ── Key Mapping panel ── */}
      <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-md shadow-xl overflow-hidden">
        <div className="border-b border-gray-100 px-4 py-2.5 flex items-center justify-between">
          <p className="text-[0.58rem] uppercase tracking-[0.25em] text-gray-500">
            Field Mapping
          </p>
          <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[0.55rem] text-gray-500">
            {mappings.length} keys
          </span>
        </div>

        <div className="px-4 py-3 space-y-2.5">
          {mappings.map(({ key, value, color }, i) => (
            <MappingRow
              key={`${key}-${resolved}`}
              keyLabel={key}
              value={value}
              color={color}
              delay={i * 420 + 300}
            />
          ))}
        </div>
      </div>

      {/* ── Floating "Generated" badge ── */}
      <AnimatePresence>
        {resolved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="absolute -right-5 top-8 rounded-2xl border border-emerald-300 bg-emerald-50 px-3 py-2 backdrop-blur-md shadow-xl"
          >
            <p className="text-[0.6rem] font-semibold text-emerald-600">
              ✓ Doc Generated
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotFoundAnimation;
