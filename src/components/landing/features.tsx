"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";

const MotionDiv = motion.div;

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const Tile = ({
  label,
  color,
  rotate,
  zIndex,
  offsetX,
}: {
  label: string;
  color: string;
  rotate: number;
  zIndex: number;
  offsetX: number;
}) => (
  <div
    aria-label={`${label} tile`}
    className={`
      w-[84px] md:w-[108px] 
      h-[108px] md:h-[132px] 
      rounded-xl 
      text-white 
      grid 
      place-items-center 
      font-extrabold 
      tracking-wide 
      text-lg md:text-[22px] 
      shadow-[0_12px_28px_rgba(0,0,0,0.18)] 
      relative 
      border 
      border-white/20
    `}
    style={{
      background: color,
      transform: `rotate(${rotate}deg) translateX(${offsetX}px)`,
      zIndex,
    }}
  >
    {label}
    <div
      className="absolute top-0 right-0 w-[32%] h-[26%] bg-white/25 rounded-bl-lg"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 100%)",
      }}
    />
  </div>
);

const TiltedFileDeck = () => (
  <div className="relative w-[260px] md:w-[340px] h-[140px] md:h-[170px] flex items-center justify-center gap-0 mx-auto">
    <Tile label="CSV" color="#22c55e" rotate={-10} zIndex={3} offsetX={24} />
    <Tile label="PDF" color="#ef4444" rotate={8} zIndex={2} offsetX={-8} />
    <Tile label="DOC" color="#2563eb" rotate={-4} zIndex={1} offsetX={-40} />
  </div>
);

const ModelChip = ({
  label,
  active,
  iconSrc,
}: {
  label: string;
  active?: boolean;
  iconSrc?: string;
}) => (
  <div
    className={`
      inline-flex items-center gap-2 px-3 h-9 rounded-lg font-bold tracking-wide text-sm border
      ${
        active
          ? "bg-purple-600 text-white border-purple-600"
          : "bg-white text-gray-600 border-gray-200"
      }
    `}
  >
    {iconSrc && (
      <Image
        src={iconSrc || "/placeholder.svg"}
        alt={`${label} logo`}
        width={16}
        height={16}
        style={{ display: "block" }}
      />
    )}
    <span>{label}</span>
  </div>
);

const ModelsRow = () => (
  <div className="flex flex-wrap gap-3" aria-label="Models">
    <ModelChip label="AI Claude 3.5" iconSrc="/claude.svg" />
    <ModelChip label="GPT‑4o" iconSrc="/gpt.svg" />
    <ModelChip label="Gemini 2.0" iconSrc="/gemini.svg" />
  </div>
);

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-16 md:py-24 relative isolate"
      style={{
        background:
          "radial-gradient(1200px 400px at 50% -200px, rgba(0,0,0,0.04), transparent), linear-gradient(180deg, #faf7f2 0%, #f6f3ee 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-left mb-8 md:mb-12"
        >
          <div className="text-purple-600 font-bold tracking-[2px] text-xs uppercase mb-2">
            POWERFUL FEATURES
          </div>
          <h1 className="font-extrabold tracking-tight text-gray-800 text-4xl md:text-5xl leading-tight mb-4">
            Modern features that feel effortless
          </h1>
          <p className="text-gray-600 text-lg max-w-[700px]">
            Draft with confidence, upload securely, work with specialized
            agents, and chat with top models—purpose‑built for legal work.
          </p>
        </motion.div>

        {/* Row 1 */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* Left card */}
          <div className="col-span-12 md:col-span-7">
            <MotionDiv
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              className="p-6 h-full flex flex-col gap-4 rounded-xl border border-gray-200"
              style={{
                background: "linear-gradient(180deg, #ffffff, #fbfbfc)",
              }}
            >
              <div className="flex flex-wrap gap-3 items-center">
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-purple-600 text-white text-xs font-bold rounded-md">
                  <Check size={12} />
                  Citations & compliance
                </div>
                <div className="inline-flex items-center px-2 py-1 border border-gray-300 text-gray-600 text-xs font-medium rounded-md">
                  Jurisdiction aware
                </div>
                <div className="inline-flex items-center px-2 py-1 border border-gray-300 text-gray-600 text-xs font-medium rounded-md">
                  Redlines
                </div>
              </div>
              <div>
                <h3 className="mt-2 font-bold text-xl md:text-2xl text-gray-900 mb-2">
                  Precision contract insights
                </h3>
                <p className="text-gray-600 text-base mb-4">
                  Identify high‑risk clauses, get negotiation strategies, and
                  generate enforceable alternatives with clear citations.
                </p>
                <div className="space-y-2 text-gray-600 text-sm">
                  <div className="flex gap-2 items-center">
                    <Check size={16} className="text-green-600 flex-shrink-0" />
                    <span>Risk scoring with HIGH / MEDIUM / LOW levels</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Check size={16} className="text-green-600 flex-shrink-0" />
                    <span>Clause replacements with jurisdictional notes</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Check size={16} className="text-green-600 flex-shrink-0" />
                    <span>One‑click overall summary and recommendations</span>
                  </div>
                </div>
              </div>
            </MotionDiv>
          </div>

          {/* Right card */}
          <div className="col-span-12 md:col-span-5">
            <MotionDiv
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="p-6 h-full flex flex-col gap-4 rounded-xl border border-gray-200 items-center justify-center"
              style={{
                background: "linear-gradient(180deg, #ffffff, #fbfbfc)",
              }}
            >
              <TiltedFileDeck />
              <div className="text-center">
                <h3 className="font-bold text-xl md:text-2xl text-gray-900 mb-2">
                  Seamless File Handling
                </h3>
                <p className="text-gray-600 text-base">
                  Upload PDFs and DOCX, parse CSV data, and keep everything
                  organized. Your documents stay secure and accessible.
                </p>
              </div>
            </MotionDiv>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left card */}
          <div className="col-span-12 md:col-span-5">
            <MotionDiv
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              className="p-6 h-full flex flex-col gap-4 rounded-xl border border-gray-200"
              style={{
                background: "linear-gradient(180deg, #ffffff, #fbfbfc)",
              }}
            >
              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                  Research
                </div>
                <div className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                  Citations
                </div>
                <div className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                  Context windows
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl md:text-2xl text-gray-900 mb-2">
                  Specialized legal agents
                </h3>
                <p className="text-gray-600 text-base">
                  Contract review, legal research, and compliance agents tuned
                  for your practice areas.
                </p>
              </div>
            </MotionDiv>
          </div>

          {/* Right card */}
          <div className="col-span-12 md:col-span-7">
            <MotionDiv
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="p-6 h-full flex flex-col gap-4 rounded-xl border border-gray-200"
              style={{
                background: "linear-gradient(180deg, #ffffff, #fbfbfc)",
              }}
            >
              <div className="flex-grow flex items-center">
                <ModelsRow />
              </div>
              <div>
                <h3 className="font-bold text-xl md:text-2xl text-gray-900 mb-2">
                  Intelligent conversational AI
                </h3>
                <p className="text-gray-600 text-base">
                  Harness GPT‑4o, Claude 3.5, and Gemini 1.5 for contextual,
                  cited guidance that accelerates drafting and strategy.
                </p>
              </div>
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  );
}
