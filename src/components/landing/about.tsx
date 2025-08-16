// components/about-legalmind.tsx
"use client";

import Image from "next/image";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  type Variants,
} from "framer-motion";
import { Tilt } from "@/components/ui/motion-primitives/tilt";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import * as React from "react";
import { Typography } from "@mui/material";

type Feature = {
  id: string;
  title: string;
  desc: string;
  img: string;
  tintFrom: string;
  tintVia?: string;
};

const FEATURES: Feature[] = [
  {
    id: "context",
    title: "Context Lens",
    desc: "Surfaces entities, dates, and facts from unstructured files and threads; aligns them to your issues with traceable spans.",
    img: "/images/gradient-rose.jpg",
    tintFrom: "from-lm-accent/70",
    tintVia: "via-lm-accentSoft/30",
  },
  {
    id: "citations",
    title: "Citation Graph",
    desc: "Ranks authorities by reasoning patterns and treatments, revealing persuasive analogies and conflicts across jurisdictions.",
    img: "/images/indigo-insight.jpg",
    tintFrom: "from-[#2d3d3d]/60",
    tintVia: "via-[#5d6f73]/30",
  },
  {
    id: "draft",
    title: "Structured Draft",
    desc: "Generates a grounded draft with issues, standards, controlling authority, and risk signals—ready for your redlines.",
    img: "/images/gradient-rose.jpg",
    tintFrom: "from-lm-accent/60",
    tintVia: "via-lm-accentSoft/20",
  },
];

const easeOutQuint = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutQuint } },
};

export default function AboutSection() {
  const [activeId, setActiveId] = React.useState<Feature["id"]>("context");
  const [shouldScroll, setShouldScroll] = React.useState(false);
  const previewRef = React.useRef<HTMLDivElement>(null);
  const hasMountedRef = React.useRef(false);

  const active = React.useMemo(
    () => FEATURES.find((f) => f.id === activeId) ?? FEATURES[0],
    [activeId]
  );

  React.useEffect(() => {
    if (shouldScroll && hasMountedRef.current && previewRef.current) {
      previewRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    hasMountedRef.current = true;
  }, [activeId, shouldScroll]);

  const handleFeatureSelect = (featureId: Feature["id"]) => {
    setActiveId(featureId);
    setShouldScroll(true); // Enable scrolling for this change
  };

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 70% 10%, rgba(125,158,166,0.15) 0%, rgba(241,249,255,0) 60%), radial-gradient(60% 50% at 0% 100%, rgba(45,61,61,0.18) 0%, rgba(241,249,255,0) 60%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-6 py-20">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="text-sm tracking-wide text-lm-inkMuted/80"
        >
          <Typography
            variant="overline"
            sx={{
              color: "primary.main",
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            About LegalMind
          </Typography>
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="mt-4 grid gap-4 md:max-w-3xl"
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "secondary.main",
              fontSize: { xs: "2rem", md: "2.75rem" },
              lineHeight: 1.15,
            }}
          >
            LegalMind reads the record, understands the law, and shows the why
            behind every suggestion.
          </Typography>
          <p className="text-base leading-relaxed text-lm-inkMuted md:text-lg">
            Explore the pillars below—each tile updates the live preview and
            details panel on the right.
          </p>
        </motion.div>

        {/* Two-column: left list of features, right preview */}
        <LayoutGroup>
          <div className="mt-12 grid items-center gap-8 md:grid-cols-2">
            {/* Left: clickable feature cards */}
            <div className="grid gap-6">
              {FEATURES.map((f) => (
                <FeatureOption
                  key={f.id}
                  feature={f}
                  active={f.id === activeId}
                  onSelect={() => handleFeatureSelect(f.id)}
                />
              ))}
            </div>

            {/* Right: sticky preview */}
            <div
              className="relative flex items-center justify-center min-h-[600px]"
              ref={previewRef}
            >
              <PreviewPanel active={active} />
            </div>
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}

function FeatureOption({
  feature,
  active,
  onSelect,
}: {
  feature: Feature;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <Tilt rotationFactor={6} isRevese>
      <motion.button
        layout
        type="button"
        onClick={onSelect}
        aria-pressed={active}
        className={[
          "group relative w-full rounded-xl border bg-lm-bgAlt text-left shadow-lm transition-colors",
          active
            ? "border-lm-ink/20"
            : "border-lm-border/60 hover:border-lm-ink/20",
          "focus:outline-none focus:ring-2 focus:ring-lm-accent focus:ring-offset-2 focus:ring-offset-lm-bg",
        ].join(" ")}
      >
        <motion.div
          layout
          className="relative h-40 overflow-hidden rounded-t-xl sm:h-44"
        >
          <Image
            src={feature.img || "/placeholder.svg"}
            alt=""
            fill
            className="object-cover opacity-95 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            priority={false}
          />
          <div
            className={`pointer-events-none absolute inset-0 rounded-t-xl bg-gradient-to-tr ${
              feature.tintFrom
            } ${feature.tintVia ?? ""} to-transparent mix-blend-multiply`}
          />
        </motion.div>

        <div className="flex items-start gap-3 p-5">
          <div
            className={[
              "mt-1 h-5 w-5 shrink-0 rounded-full border",
              active ? "bg-lm-ink border-lm-ink" : "border-lm-inkMuted/30",
            ].join(" ")}
          >
            <AnimatePresence initial={false}>
              {active && (
                <motion.span
                  key="dot"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid h-full w-full place-items-center text-white"
                >
                  <Check className="h-3.5 w-3.5" />
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-lm-ink">
                {feature.title}
              </h3>
              {active && (
                <motion.div
                  layoutId="active-pill"
                  className="rounded-full bg-lm-ink px-2.5 py-0.5 text-xs text-white"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  Selected
                </motion.div>
              )}
            </div>
            <p className="mt-1 text-sm leading-relaxed text-lm-inkMuted">
              {feature.desc}
            </p>
          </div>
        </div>
      </motion.button>
    </Tilt>
  );
}

function PreviewPanel({ active }: { active: Feature }) {
  return (
    <motion.div
      layout
      className="w-full max-w-md overflow-hidden rounded-2xl border border-lm-border/60 bg-white shadow-lm"
      transition={{ type: "spring", stiffness: 300, damping: 32 }}
    >
      {/* Image crossfade */}
      <div className="relative h-64 w-full sm:h-80">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={active.img || "/placeholder.svg"}
              alt={`${active.title} preview`}
              fill
              priority
              className="object-cover"
            />
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-tr ${
                active.tintFrom
              } ${active.tintVia ?? ""} to-transparent mix-blend-multiply`}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="space-y-2 p-6">
        <AnimatePresence mode="wait">
          <motion.h3
            key={`title-${active.id}`}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -6, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="text-xl font-semibold text-lm-ink"
          >
            {active.title}
          </motion.h3>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.p
            key={`desc-${active.id}`}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -6, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
            className="text-sm leading-relaxed text-lm-inkMuted"
          >
            {active.desc}
          </motion.p>
        </AnimatePresence>

        <div className="pt-3">
          <Button className="bg-lm-ink text-white hover:bg-lm-accent">
            Learn more
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
