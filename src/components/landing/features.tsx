"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";
import { Tilt } from "@/components/ui/motion-primitives/tilt";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const MotionCard = motion(Card);

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
      w-[84px] md:w-[108px] h-[108px] md:h-[132px] 
      rounded-xl text-white grid place-items-center 
      font-extrabold tracking-wide text-lg md:text-xl
      shadow-[0_12px_28px_rgba(0,0,0,0.18)] relative
      border border-white/20
    `}
    style={{
      background: color,
      transform: `rotate(${rotate}deg) translateX(${offsetX}px)`,
      zIndex,
    }}
  >
    {label}
    <div className="absolute top-0 right-0 w-[32%] h-[26%] bg-white/25 rounded-bl-lg [clip-path:polygon(0_0,100%_0,100%_100%)]" />
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
  <Badge
    variant={active ? "default" : "secondary"}
    className={`
      px-3 h-9 rounded-lg font-bold tracking-wide
      ${
        active
          ? "bg-slate-900 text-white border-slate-900"
          : "bg-background text-muted-foreground border-border"
      }
    `}
  >
    <div className="flex items-center gap-2">
      {iconSrc && (
        <Image
          src={iconSrc}
          alt={`${label} logo`}
          width={16}
          height={16}
          className="block"
        />
      )}
      <span>{label}</span>
    </div>
  </Badge>
);

const ModelsRow = () => (
  <div className="flex flex-wrap gap-3" aria-label="Models">
    <ModelChip label="Claude 3.5" iconSrc="/claude.svg" />
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
        background: `
          radial-gradient(1200px 400px at 50% -200px, rgba(0,0,0,0.04), transparent), 
          linear-gradient(180deg, #faf7f2 0%, #f6f3ee 100%)
        `,
      }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-left mb-8 md:mb-12"
        >
          <p className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-2">
            POWERFUL FEATURES
          </p>
          <h1 className="font-extrabold tracking-tight text-slate-900 text-4xl md:text-5xl leading-tight mb-4">
            Modern features that feel effortless
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Draft with confidence, upload securely, work with specialized
            agents, and chat with top models—purpose‑built for legal work.
          </p>
        </motion.div>

        {/* Row 1 */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-12 md:col-span-7">
            <Tilt rotationFactor={6} className="h-full">
              <MotionCard
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4 }}
                className="p-6 h-full flex flex-col gap-4 bg-gradient-to-b from-white to-slate-50 border rounded-xl"
              >
                <div className="flex flex-wrap gap-3 items-center">
                  <Badge className="bg-primary text-primary-foreground font-bold">
                    <Check className="w-3 h-3 mr-1" />
                    Citations & compliance
                  </Badge>
                  <Badge variant="outline">Jurisdiction aware</Badge>
                  <Badge variant="outline">Redlines</Badge>
                </div>

                <div>
                  <h3 className="mt-2 font-bold text-xl md:text-2xl mb-2">
                    Precision contract insights
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Identify high‑risk clauses, get negotiation strategies, and
                    generate enforceable alternatives with clear citations.
                  </p>

                  <div className="space-y-2 text-muted-foreground text-sm">
                    <div className="flex gap-2 items-center">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Risk scoring with HIGH / MEDIUM / LOW levels</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Clause replacements with jurisdictional notes</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>One‑click overall summary and recommendations</span>
                    </div>
                  </div>
                </div>
              </MotionCard>
            </Tilt>
          </div>

          <div className="col-span-12 md:col-span-5">
            <Tilt rotationFactor={6} className="h-full">
              <MotionCard
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="p-6 h-full flex flex-col gap-4 bg-gradient-to-b from-white to-slate-50 border rounded-xl items-center justify-center"
              >
                <TiltedFileDeck />
                <div className="text-center">
                  <h3 className="font-bold text-xl md:text-2xl mb-2">
                    Seamless File Handling
                  </h3>
                  <p className="text-muted-foreground">
                    Upload PDFs and DOCX, parse CSV data, and keep everything
                    organized. Your documents stay secure and accessible.
                  </p>
                </div>
              </MotionCard>
            </Tilt>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <Tilt rotationFactor={6} className="h-full">
              <MotionCard
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4 }}
                className="p-6 h-full flex flex-col gap-4 bg-gradient-to-b from-white to-slate-50 border rounded-xl"
              >
                <div className="flex flex-wrap gap-3">
                  <Badge variant="secondary">Research</Badge>
                  <Badge variant="secondary">Citations</Badge>
                  <Badge variant="secondary">Context windows</Badge>
                </div>
                <div>
                  <h3 className="font-bold text-xl md:text-2xl mb-2">
                    Specialized legal agents
                  </h3>
                  <p className="text-muted-foreground">
                    Contract review, legal research, and compliance agents tuned
                    for your practice areas.
                  </p>
                </div>
              </MotionCard>
            </Tilt>
          </div>

          <div className="col-span-12 md:col-span-7">
            <Tilt rotationFactor={6} className="h-full">
              <MotionCard
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="p-6 h-full flex flex-col gap-4 bg-gradient-to-b from-white to-slate-50 border rounded-xl"
              >
                <div className="flex-grow flex items-center">
                  <ModelsRow />
                </div>
                <div>
                  <h3 className="font-bold text-xl md:text-2xl mb-2">
                    Intelligent conversational AI
                  </h3>
                  <p className="text-muted-foreground">
                    Harness GPT‑4o, Claude 3.5, and Gemini 1.5 for contextual,
                    cited guidance that accelerates drafting and strategy.
                  </p>
                </div>
              </MotionCard>
            </Tilt>
          </div>
        </div>
      </div>
    </section>
  );
}
