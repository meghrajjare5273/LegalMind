"use client";
import { motion, MotionConfig, Transition, Variant } from "motion/react";
import { cn } from "@/lib/utils";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useLayoutEffect,
  useRef,
  useEffect,
  useMemo,
} from "react";

export type AccordionContextType = {
  expandedValue: React.Key | null;
  toggleItem: (value: React.Key) => void;
  transition?: Transition;
  variants?: { expanded: Variant; collapsed: Variant };
};

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

function useAccordion() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("useAccordion must be used within an AccordionProvider");
  }
  return context;
}

export type AccordionProviderProps = {
  children: ReactNode;
  variants?: { expanded: Variant; collapsed: Variant };
  transition?: Transition;
  expandedValue?: React.Key | null;
  onValueChange?: (value: React.Key | null) => void;
};

function AccordionProvider({
  children,
  variants,
  transition,
  expandedValue: externalExpandedValue,
  onValueChange,
}: AccordionProviderProps) {
  const [internalExpandedValue, setInternalExpandedValue] =
    useState<React.Key | null>(null);

  const expandedValue =
    externalExpandedValue !== undefined
      ? externalExpandedValue
      : internalExpandedValue;

  const toggleItem = (value: React.Key) => {
    const newValue = expandedValue === value ? null : value;
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setInternalExpandedValue(newValue);
    }
  };

  return (
    <AccordionContext.Provider
      value={{ expandedValue, toggleItem, variants, transition }}
    >
      {children}
    </AccordionContext.Provider>
  );
}

export type AccordionProps = {
  children: ReactNode;
  className?: string;
  transition?: Transition;
  variants?: { expanded: Variant; collapsed: Variant };
  expandedValue?: React.Key | null;
  onValueChange?: (value: React.Key | null) => void;
};

function Accordion({
  children,
  className,
  transition = { duration: 0.22, ease: "easeInOut" },
  variants,
  expandedValue,
  onValueChange,
}: AccordionProps) {
  return (
    <MotionConfig transition={transition}>
      <div className={cn("relative", className)} aria-orientation="vertical">
        <AccordionProvider
          variants={variants}
          transition={transition}
          expandedValue={expandedValue}
          onValueChange={onValueChange}
        >
          {children}
        </AccordionProvider>
      </div>
    </MotionConfig>
  );
}

export type AccordionItemProps = {
  value: React.Key;
  children: ReactNode;
  className?: string;
};

function AccordionItem({ value, children, className }: AccordionItemProps) {
  const { expandedValue } = useAccordion();
  const isExpanded = value === expandedValue;

  return (
    <div
      className={cn("overflow-hidden", className)}
      {...(isExpanded ? { "data-expanded": "" } : { "data-closed": "" })}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return React.cloneElement(child as any, {
            ...(typeof child.props === "object" && child.props
              ? child.props
              : {}),
            value,
            expanded: isExpanded,
          });
        }
        return child;
      })}
    </div>
  );
}

export type AccordionTriggerProps = {
  children: ReactNode;
  className?: string;
};

function AccordionTrigger({
  children,
  className,
  ...props
}: AccordionTriggerProps) {
  const { toggleItem, expandedValue } = useAccordion();
  const value = (props as { value?: React.Key }).value;
  const isExpanded = value === expandedValue;

  return (
    <button
      onClick={() => value !== undefined && toggleItem(value!)}
      aria-expanded={isExpanded}
      type="button"
      className={cn("group", className)}
      {...(isExpanded ? { "data-expanded": "" } : { "data-closed": "" })}
    >
      {children}
    </button>
  );
}

export type AccordionContentProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Jitter-free height animation:
 * - Always mounted to avoid layout thrash from mount/unmount.
 * - Measure content height and animate numeric height.
 */
function AccordionContent({
  children,
  className,
  ...props
}: AccordionContentProps) {
  const { expandedValue, variants, transition } = useAccordion();
  const value = (props as { value?: React.Key }).value;
  const isExpanded = value === expandedValue;

  const contentRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [measured, setMeasured] = useState(0);

  // Measure intrinsic height
  const measure = () => {
    const el = measureRef.current;
    if (el) {
      // Use scrollHeight to capture full content height
      setMeasured(el.scrollHeight ?? 0);
    }
  };

  // Measure on mount and when dependencies change
  useLayoutEffect(() => {
    measure();
  }, []);

  useEffect(() => {
    // Re-measure on toggle after paint
    requestAnimationFrame(() => measure());
  }, [isExpanded, children]);

  // Optional: ResizeObserver for dynamic content changes
  useEffect(() => {
    const el = measureRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Compute target height
  const targetHeight = isExpanded ? measured : 0;

  // Merge external variants if provided (opacity only to avoid reflow)
  const computedVariants = useMemo(
    () => ({
      expanded: { height: targetHeight, opacity: 1, transition },
      collapsed: { height: 0, opacity: 0, transition },
      // Use a neutral state to update to new measured height without snapping
      update: { height: targetHeight },
    }),
    [targetHeight, transition]
  );

  return (
    <div className="w-full">
      {/* Animated wrapper: overflow-hidden to avoid paint overflows */}
      <motion.div
        ref={contentRef}
        // switch between expanded/collapsed
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={{
          expanded: {
            ...computedVariants.expanded,
            ...(variants?.expanded ?? {}),
          },
          collapsed: {
            ...computedVariants.collapsed,
            ...(variants?.collapsed ?? {}),
          },
        }}
        style={{
          overflow: "hidden",
          willChange: "height, opacity",
          // Avoid interaction during transition to prevent double toggles
          pointerEvents: isExpanded ? "auto" : "none",
        }}
        className={cn("isolate", className)}
        // When measured height changes while open, apply update to avoid snap
        onUpdate={() => {
          // no-op, but keeps motion sync; variants include "update"
        }}
      >
        {/* Measurement node: position static so scrollHeight is accurate */}
        <div ref={measureRef}>{children}</div>
      </motion.div>
    </div>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
