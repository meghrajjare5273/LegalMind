"use client";

import React, { useState, useRef } from "react";
// import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { AtSignIcon, ChevronLeftIcon, LockIcon, UserIcon } from "lucide-react";
// import { FloatingPaths } from "@/components/floating-paths";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Prism from "./prism";
import { useRouter } from "next/navigation";

gsap.registerPlugin(useGSAP);

export function AuthPage() {
  const router = useRouter();
  const [isSignIn, setIsSignIn] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // ----------------------------------------------------------------------
  // BACKEND LOGIC PLACEHOLDERS
  // ----------------------------------------------------------------------

  const handleGoogleAuth = async () => {
    // TODO: Implement Google OAuth Logic here (e.g. NextAuth signIn)

    console.log("Initiating Google Auth...");
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Email/Password Sign In Logic
    console.log("Processing Sign In...");
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Account Creation Logic
    console.log("Processing Sign Up...");
  };

  // ----------------------------------------------------------------------
  // ANIMATIONS
  // ----------------------------------------------------------------------

  // 1. Initial Load Animation
  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".stagger-fade", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  // 2. Transition Animation (Toggle between Sign In / Sign Up)
  const toggleView = () => {
    const form = formRef.current;
    if (!form) return;

    // Animate OUT
    gsap.to(form, {
      opacity: 0,
      x: -20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        // Toggle State
        setIsSignIn(!isSignIn);

        // Animate IN
        gsap.fromTo(
          form,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
        );
      },
    });
  };

  return (
    <main
      ref={containerRef}
      className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2"
    >
      {/* ------------------ LEFT PANEL (Decorative) ------------------ */}
      <div className="relative hidden h-full flex-col border-r bg-secondary p-10 lg:flex dark:bg-secondary/20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="stagger-fade">
          {/* <Logo className="mr-auto h-5" /> */}
        </div>

        <div className="z-10 mt-auto stagger-fade">
          <blockquote className="space-y-2">
            <p className="text-xl">
              &ldquo;This Platform has helped me to save time and serve my
              clients faster than ever before.&rdquo;
            </p>
            <footer className="font-mono font-semibold text-sm">
              ~ Ali Hassan
            </footer>
          </blockquote>
        </div>
        <div className="absolute inset-0">
          <Prism
            animationType="rotate"
            timeScale={0.5}
            height={3.5}
            baseWidth={5.5}
            scale={1.5}
            hueShift={0}
            colorFrequency={1}
            noise={0.5}
            glow={1}
          />
        </div>
      </div>

      {/* ------------------ RIGHT PANEL (Form) ------------------ */}
      <div className="relative flex min-h-screen flex-col justify-center p-4">
        {/* Background Gradients */}
        <div
          aria-hidden
          className="-z-10 absolute inset-0 isolate opacity-60 contain-strict"
        >
          <div className="-translate-y-87.5 absolute top-0 right-0 h-320 w-140 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)]" />
          <div className="absolute top-0 right-0 h-320 w-60 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="-translate-y-87.5 absolute top-0 right-0 h-320 w-60 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)]" />
        </div>

        {/* Home Button */}
        <div className="stagger-fade absolute top-7 left-5">
          <Button
            variant="ghost"
            onClick={() => {
              router.back();
            }}
          >
            <ChevronLeftIcon className="mr-2 h-4 w-4" />
            Home
          </Button>
        </div>

        <div className="mx-auto space-y-4 sm:w-sm w-full" ref={formRef}>
          <div className="stagger-fade">
            {/* <Logo className="h-5 lg:hidden mb-4" /> */}
          </div>

          <div className="flex flex-col space-y-1 stagger-fade">
            <h1 className="font-bold text-2xl tracking-wide">
              {isSignIn ? "Welcome back!" : "Create an account"}
            </h1>
            <p className="text-base text-muted-foreground">
              {isSignIn
                ? "Login to access your personalized dashboard."
                : "Enter your details below to join our platform."}
            </p>
          </div>

          <div className="space-y-2 stagger-fade">
            <Button
              className="w-full"
              size="lg"
              type="button"
              onClick={handleGoogleAuth}
            >
              <GoogleIcon className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>
          </div>

          <div className="flex w-full items-center justify-center stagger-fade">
            <div className="h-px w-full bg-border" />
            <span className="px-2 text-muted-foreground text-xs uppercase">
              Or
            </span>
            <div className="h-px w-full bg-border" />
          </div>

          {/* DYNAMIC FORM */}
          <form
            className="space-y-2 stagger-fade"
            onSubmit={isSignIn ? handleSignIn : handleSignUp}
          >
            {!isSignIn && (
              <InputGroup>
                <InputGroupInput placeholder="Full Name" type="text" required />
                <InputGroupAddon>
                  <UserIcon className="h-4 w-4" />
                </InputGroupAddon>
              </InputGroup>
            )}

            <InputGroup>
              <InputGroupInput
                placeholder="name@example.com"
                type="email"
                required
              />
              <InputGroupAddon>
                <AtSignIcon className="h-4 w-4" />
              </InputGroupAddon>
            </InputGroup>

            <InputGroup>
              <InputGroupInput
                placeholder="Password"
                type="password"
                required
              />
              <InputGroupAddon>
                <LockIcon className="h-4 w-4" />
              </InputGroupAddon>
            </InputGroup>

            <Button className="w-full mt-4" type="submit">
              {isSignIn ? "Sign In" : "Sign Up"}
            </Button>
          </form>

          {/* TOGGLE LINK */}
          <div className="mt-8 text-center text-sm stagger-fade">
            <p className="text-muted-foreground">
              {isSignIn
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                onClick={toggleView}
                className="underline underline-offset-4 hover:text-primary font-medium"
              >
                {isSignIn ? "Sign Up Now" : "Sign In Here"}
              </button>
            </p>
          </div>

          <p className="mt-8 text-muted-foreground text-xs text-center stagger-fade">
            By clicking continue, you agree to our{" "}
            <a
              className="underline underline-offset-4 hover:text-primary"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              className="underline underline-offset-4 hover:text-primary"
              href="#"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}

const GoogleIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g>
      <path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669    C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62    c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401    c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" />
    </g>
  </svg>
);
