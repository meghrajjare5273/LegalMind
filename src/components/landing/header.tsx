/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Menu,
  MapPin as LocationOn,
  Clock as Schedule,
  Phone,
  Mail as Email,
} from "lucide-react";

// ShadcnUI imports
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// Keep outside component to avoid re-creation
const NAV_ITEMS = Object.freeze([
  {
    label: "Features",
    href: "#features",
    description: "Explore our powerful features",
  },
  { label: "About", href: "#about", description: "Learn about our mission" },
  {
    label: "Solutions",
    href: "#solutions",
    description: "Discover our solutions",
  },
  { label: "Contact", href: "#contact", description: "Get in touch with us" },
]);

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for mobile and reduced motion preference
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const checkReducedMotion = () =>
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );

    checkMobile();
    checkReducedMotion();

    window.addEventListener("resize", checkMobile);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    mediaQuery.addEventListener("change", checkReducedMotion);

    return () => {
      window.removeEventListener("resize", checkMobile);
      mediaQuery.removeEventListener("change", checkReducedMotion);
    };
  }, []);

  // State
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  // Stable color tokens and computed styles
  const colors = useMemo(() => {
    const gold = "#d4af37";
    const bronze = "#b08d28";
    const brightGold = "#ffcc33";
    return { gold, bronze, brightGold };
  }, []);

  // Format time only when 'now' changes
  const formattedTime = useMemo(() => {
    return new Date(now).toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }, [now]);

  // Time updater with page visibility optimization
  useEffect(() => {
    let intervalId: number | null = null;

    const start = () => {
      if (intervalId == null) {
        intervalId = window.setInterval(() => setNow(Date.now()), 1000);
      }
    };
    const stop = () => {
      if (intervalId != null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") start();
      else stop();
    };

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Scroll handler, passive + rAF throttle
  const rafRef = useRef<number | null>(null);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => {
      lastScrollY.current = window.scrollY;
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(() => {
          setScrolled(lastScrollY.current > 50);
          rafRef.current = null;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((v) => !v);
  }, []);

  const goTop = useCallback(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  // Active section detection (basic: matches hash)
  const activeHash = typeof window !== "undefined" ? window.location.hash : "";
  const isActive = useCallback(
    (href: string) => href === activeHash,
    [activeHash]
  );

  // Motion helpers respecting reduced motion
  const motionFast = prefersReducedMotion
    ? { initial: false, animate: {}, transition: {} }
    : { transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as any } };

  return (
    <TooltipProvider>
      {/* Custom CSS for dynamic colors */}
      <style jsx>{`
        .gold-text {
          color: ${colors.gold};
        }
        .gold-bg {
          background-color: ${colors.gold}14;
        }
        .gold-border {
          border-color: ${colors.gold}30;
        }
        .gold-hover:hover {
          color: ${colors.brightGold};
        }
        .gold-gradient {
          background: linear-gradient(135deg, ${colors.gold}, ${colors.bronze});
        }
        .gold-gradient-hover:hover {
          background: linear-gradient(
            135deg,
            ${colors.brightGold},
            ${colors.gold}
          );
        }
      `}</style>

      <motion.header
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: -20 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={
          prefersReducedMotion ? undefined : { duration: 0.6, ease: "easeOut" }
        }
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          scrolled
            ? "bg-white/90 backdrop-blur-[12px] backdrop-saturate-[160%] border-b"
            : "bg-transparent border-b border-white/8"
        )}
        style={{
          borderBottomColor: scrolled
            ? `${colors.gold}40`
            : "rgba(255,255,255,0.08)",
        }}
      >
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between py-5 px-4 sm:px-8 gap-8">
            {/* Logo and Info Section */}
            <div className="flex items-center gap-4 sm:gap-8">
              <motion.div
                initial={
                  prefersReducedMotion ? undefined : { opacity: 0, x: -12 }
                }
                animate={
                  prefersReducedMotion ? undefined : { opacity: 1, x: 0 }
                }
                {...motionFast}
              >
                <div className="flex items-center gap-4">
                  <h1
                    role="button"
                    tabIndex={0}
                    aria-label="Go to top"
                    className={cn(
                      "text-xl font-bold cursor-pointer tracking-wide transition-all duration-300 hover:scale-105",
                      scrolled ? "gold-text" : "text-white",
                      "gold-hover"
                    )}
                    onClick={goTop}
                    onKeyDown={(e) => e.key === "Enter" && goTop()}
                  >
                    LegalMind
                  </h1>
                </div>
              </motion.div>

              {!isMobile && (
                <motion.div
                  initial={
                    prefersReducedMotion ? undefined : { opacity: 0, x: -8 }
                  }
                  animate={
                    prefersReducedMotion ? undefined : { opacity: 1, x: 0 }
                  }
                  {...motionFast}
                >
                  <div className="flex items-center gap-5">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge
                          variant="outline"
                          className={cn(
                            "flex items-center gap-1 px-3 py-1 font-semibold backdrop-blur-sm transition-all duration-200",
                            scrolled
                              ? "text-white border-white/40 hover:bg-white/15"
                              : "bg-white/16 text-white border-white/24 hover:bg-white/24"
                          )}
                          style={{
                            backgroundColor: scrolled
                              ? `${colors.gold}14`
                              : undefined,
                            color: scrolled ? colors.gold : undefined,
                            borderColor: scrolled
                              ? `${colors.gold}30`
                              : undefined,
                          }}
                        >
                          <LocationOn className="w-4 h-4" />
                          Pune
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Our Location</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge
                          variant="outline"
                          className={cn(
                            "flex items-center gap-1 px-3 py-1 font-semibold backdrop-blur-sm font-mono tabular-nums",
                            scrolled
                              ? "text-white border-white/40"
                              : "bg-white/16 text-white border-white/24"
                          )}
                          style={{
                            backgroundColor: scrolled
                              ? `${colors.gold}14`
                              : undefined,
                            color: scrolled ? colors.gold : undefined,
                            borderColor: scrolled
                              ? `${colors.gold}30`
                              : undefined,
                          }}
                          aria-live="polite"
                        >
                          <Schedule className="w-4 h-4" />
                          {formattedTime}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Current Time</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Desktop Navigation */}
            {!isMobile && (
              <nav className="flex items-center gap-2 md:gap-8">
                {NAV_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={
                      prefersReducedMotion ? undefined : { opacity: 0, y: -10 }
                    }
                    animate={
                      prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                    }
                    transition={{
                      duration: 0.35,
                      delay: prefersReducedMotion ? 0 : index * 0.06,
                    }}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          asChild
                          variant="ghost"
                          className={cn(
                            "relative px-6 py-3 font-semibold text-base tracking-wide rounded-lg transition-all duration-200",
                            scrolled ? "text-gray-900" : "text-white",
                            "hover:scale-[1.02]",
                            isActive(item.href) &&
                              "after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-[70%] after:h-0.5 after:transition-all"
                          )}
                          style={
                            {
                              "--hover-color": colors.gold,
                              "--hover-bg": scrolled
                                ? `${colors.gold}10`
                                : "rgba(255,255,255,0.08)",
                            } as React.CSSProperties
                          }
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = colors.gold;
                            e.currentTarget.style.backgroundColor = scrolled
                              ? `${colors.gold}10`
                              : "rgba(255,255,255,0.08)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = scrolled
                              ? "#111827"
                              : "#ffffff";
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                          }}
                          aria-current={
                            isActive(item.href) ? "page" : undefined
                          }
                        >
                          <Link href={item.href}>{item.label}</Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </motion.div>
                ))}
              </nav>
            )}

            {/* Mobile Section */}
            {isMobile && (
              <div className="flex items-center gap-4">
                <Badge
                  variant="outline"
                  className={cn(
                    "font-mono tabular-nums text-xs font-semibold",
                    scrolled
                      ? "text-white border-white/40"
                      : "bg-white/16 text-white border-white/24"
                  )}
                  style={{
                    backgroundColor: scrolled ? `${colors.gold}14` : undefined,
                    color: scrolled ? colors.gold : undefined,
                    borderColor: scrolled ? `${colors.gold}30` : undefined,
                  }}
                  aria-live="polite"
                >
                  {formattedTime}
                </Badge>

                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                  <SheetTrigger asChild>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className={cn(
                            "transition-all duration-200",
                            scrolled
                              ? "text-gray-900 border-white/40"
                              : "bg-white/16 text-white border-white/24 hover:bg-white/22"
                          )}
                          style={{
                            backgroundColor: scrolled
                              ? `${colors.gold}14`
                              : undefined,
                            borderColor: scrolled
                              ? `${colors.gold}30`
                              : undefined,
                          }}
                          aria-label="Open navigation menu"
                          onClick={handleDrawerToggle}
                        >
                          <Menu className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Open Menu</p>
                      </TooltipContent>
                    </Tooltip>
                  </SheetTrigger>

                  <AnimatePresence>
                    {mobileOpen && (
                      <SheetContent
                        side="right"
                        className="w-80 bg-white/96 backdrop-blur-2xl border-l"
                        style={{ borderLeftColor: `${colors.gold}30` }}
                      >
                        <SheetHeader
                          className="border-b pb-4"
                          style={{ borderBottomColor: `${colors.gold}20` }}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar
                              className="w-7 h-7"
                              style={{
                                background: `linear-gradient(135deg, ${colors.gold}, ${colors.bronze})`,
                              }}
                            >
                              <AvatarFallback className="text-white font-bold text-sm">
                                L
                              </AvatarFallback>
                            </Avatar>
                            <SheetTitle
                              style={{ color: colors.gold }}
                              className="font-bold"
                            >
                              LegalMind
                            </SheetTitle>
                          </div>
                        </SheetHeader>

                        <nav className="pt-4">
                          {NAV_ITEMS.map((item, index) => (
                            <motion.div
                              key={item.label}
                              initial={
                                prefersReducedMotion
                                  ? undefined
                                  : { opacity: 0, x: 12 }
                              }
                              animate={
                                prefersReducedMotion
                                  ? undefined
                                  : { opacity: 1, x: 0 }
                              }
                              transition={{
                                duration: 0.25,
                                delay: prefersReducedMotion ? 0 : index * 0.05,
                              }}
                            >
                              <Button
                                asChild
                                variant="ghost"
                                className="w-full justify-start rounded-lg mb-1 p-3 h-auto hover:translate-x-1 transition-all duration-200"
                                style={
                                  {
                                    "--hover-bg": `${colors.gold}14`,
                                  } as React.CSSProperties
                                }
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = `${colors.gold}14`;
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "transparent";
                                }}
                                aria-current={
                                  isActive(item.href) ? "page" : undefined
                                }
                                onClick={() => setMobileOpen(false)}
                              >
                                <Link href={item.href}>
                                  <div className="text-left">
                                    <div className="font-semibold">
                                      {item.label}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {item.description}
                                    </div>
                                  </div>
                                </Link>
                              </Button>
                            </motion.div>
                          ))}

                          <motion.div
                            className="pt-10 px-3"
                            initial={
                              prefersReducedMotion
                                ? undefined
                                : { opacity: 0, y: 10 }
                            }
                            animate={
                              prefersReducedMotion
                                ? undefined
                                : { opacity: 1, y: 0 }
                            }
                            transition={{ duration: 0.3, delay: 0.2 }}
                          >
                            <Button
                              className="w-full text-white font-bold py-5 rounded-xl transition-all duration-300 hover:shadow-lg"
                              style={
                                {
                                  background: `linear-gradient(135deg, ${colors.gold}, ${colors.bronze})`,
                                  "--hover-bg": `linear-gradient(135deg, ${colors.brightGold}, ${colors.gold})`,
                                  "--hover-shadow": `0 8px 24px ${colors.gold}4d`,
                                } as React.CSSProperties
                              }
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = `linear-gradient(135deg, ${colors.brightGold}, ${colors.gold})`;
                                e.currentTarget.style.boxShadow = `0 8px 24px ${colors.gold}4d`;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = `linear-gradient(135deg, ${colors.gold}, ${colors.bronze})`;
                                e.currentTarget.style.boxShadow = "";
                              }}
                            >
                              Start Free Trial
                            </Button>
                          </motion.div>

                          <motion.div
                            className="pt-10 px-3 mt-8 border-t"
                            style={{ borderTopColor: `${colors.gold}20` }}
                            initial={
                              prefersReducedMotion ? undefined : { opacity: 0 }
                            }
                            animate={
                              prefersReducedMotion ? undefined : { opacity: 1 }
                            }
                            transition={{ duration: 0.3, delay: 0.4 }}
                          >
                            <p className="text-xs text-gray-500 mb-4">
                              Quick Contact
                            </p>
                            <div className="flex gap-4">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hover:bg-opacity-10 transition-colors duration-200"
                                    style={{ color: colors.gold }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor = `${colors.gold}14`;
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        "transparent";
                                    }}
                                    aria-label="Call"
                                  >
                                    <Phone className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Call us</p>
                                </TooltipContent>
                              </Tooltip>

                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hover:bg-opacity-10 transition-colors duration-200"
                                    style={{ color: colors.gold }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor = `${colors.gold}14`;
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        "transparent";
                                    }}
                                    aria-label="Email"
                                  >
                                    <Email className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Email us</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </motion.div>
                        </nav>
                      </SheetContent>
                    )}
                  </AnimatePresence>
                </Sheet>
              </div>
            )}
          </div>
        </div>
      </motion.header>
    </TooltipProvider>
  );
}
