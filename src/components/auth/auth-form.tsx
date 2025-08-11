"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RecovaBrand from "./recova-brand";
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { z } from "zod";

// Zod schemas
const signInSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
    .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .regex(/(?=.*\d)/, "Password must contain at least one number"),
});


interface AuthFormProps {
  mode: "sign-in" | "sign-up";
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  general?: string;
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    try {
      if (mode === "sign-in") {
        signInSchema.parse({
          email: formData.email,
          password: formData.password,
        });
      } else {
        signUpSchema.parse(formData);
      }
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors: FormErrors = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            formErrors[err.path[0] as keyof FormErrors] = err.message;
          }
        });
        setErrors(formErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      if (mode === "sign-in") {
        const result = await authClient.signIn.email({
          email: formData.email,
          password: formData.password,
        });

        if (result.error) {
          setErrors({ general: result.error.message });
        } else {
          router.push("/dashboard"); // Redirect to chat or dashboard
        }
      } else {
        const result = await authClient.signUp.email({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        if (result.error) {
          setErrors({ general: result.error.message });
        } else {
          router.push("/chat"); // Redirect to chat or dashboard
        }
      }
    } catch (error) {
      setErrors({ general: "An unexpected error occurred. Please try again." });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider: "google" | "microsoft") => {
    try {
      if (provider === "google") {
        await authClient.signIn.social({
          provider: "google",
        });
      }
      // Add Microsoft OAuth when implemented
    } catch (error) {
      setErrors({ general: "Social authentication failed. Please try again." });
      console.log(error);
    }
  };

  const switchMode = () => {
    const newMode = mode === "sign-in" ? "sign-up" : "sign-in";
    router.push(`/auth/${newMode}`);
  };

  return (
    <div className="w-full max-w-md mx-auto h-full flex flex-col justify-center">
      {/* Brand Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-4"
      >
        <RecovaBrand />
      </motion.div>

      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-2 text-center mb-6"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
          {mode === "sign-in" ? "Welcome back" : "Welcome to LegalMind"}
        </h1>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
          {mode === "sign-in"
            ? "Sign in to your account to continue your legal work."
            : "Transform your legal practice with AI-powered intelligence and automation."}
        </p>
      </motion.div>

      {/* General Error */}
      {errors.general && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md"
        >
          <p className="text-sm text-red-600">{errors.general}</p>
        </motion.div>
      )}

      {/* Social Login Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-2 mb-4"
      >
        <Button
          variant="social"
          size="lg"
          className="w-full h-10 text-sm font-medium"
          onClick={() => handleSocialAuth("google")}
          disabled={isLoading}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative mb-4"
      >
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-muted-foreground">Or</span>
        </div>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        onSubmit={handleSubmit}
        className="space-y-3 mb-4"
      >
        {mode === "sign-up" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-1"
          >
            <Label htmlFor="name" className="text-sm">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`h-10 text-sm bg-gray-50 border-gray-200 focus:bg-white pl-10 ${
                  errors.name ? "border-red-300" : ""
                }`}
                required={mode === "sign-up"}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-600">{errors.name}</p>
            )}
          </motion.div>
        )}

        <div className="space-y-1">
          <Label htmlFor="email" className="text-sm">
            Email address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="email"
              type="email"
              placeholder="john.doe@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`h-10 text-sm bg-gray-50 border-gray-200 focus:bg-white pl-10 ${
                errors.email ? "border-red-300" : ""
              }`}
              required
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password" className="text-sm">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder={
                mode === "sign-in"
                  ? "Enter your password"
                  : "Create a strong password"
              }
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`h-10 text-sm bg-gray-50 border-gray-200 focus:bg-white pl-10 pr-10 ${
                errors.password ? "border-red-300" : ""
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-600">{errors.password}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="ctaSoft"
          size="lg"
          className="w-full h-10 text-sm font-medium"
          disabled={isLoading}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Loader2 className="w-4 h-4" />
            </motion.div>
          ) : mode === "sign-in" ? (
            "Sign in"
          ) : (
            "Create Account"
          )}
        </Button>
      </motion.form>

      {/* Mode Toggle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center mb-3"
      >
        <span className="text-muted-foreground text-sm">
          {mode === "sign-in"
            ? "Don't have an account? "
            : "Already have an account? "}
        </span>
        <Button
          variant="link"
          className="p-0 h-auto font-medium text-primary hover:text-primary/80 text-sm"
          onClick={switchMode}
        >
          {mode === "sign-in" ? "Sign up" : "Sign in"}
        </Button>
      </motion.div>

      {/* Terms - Only for signup */}
      {mode === "sign-up" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-xs text-muted-foreground"
        >
          By signing up, you agree to our{" "}
          <Button
            variant="link"
            className="p-0 h-auto text-xs text-muted-foreground underline hover:text-foreground"
          >
            Terms of Service
          </Button>{" "}
          &{" "}
          <Button
            variant="link"
            className="p-0 h-auto text-xs text-muted-foreground underline hover:text-foreground"
          >
            Privacy Policy
          </Button>
        </motion.div>
      )}
    </div>
  );
}
