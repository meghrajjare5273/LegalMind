"use client";

import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EmailPasswordInput } from "@/lib/validations/auth-types";

interface FormFieldProps {
  label: string;
  name: keyof EmailPasswordInput;
  type: string;
  placeholder: string;
  form: UseFormReturn<EmailPasswordInput>;
  icon?: "mail" | "lock" | "user";
  showPasswordToggle?: boolean;
}

export default function FormField({
  label,
  name,
  type,
  placeholder,
  form,
  icon,
  showPasswordToggle = false,
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
  } = form;

  const getIcon = () => {
    switch (icon) {
      case "mail":
        return (
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        );
      case "lock":
        return (
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        );
      case "user":
        return (
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        );
      default:
        return null;
    }
  };

  const inputType = showPasswordToggle && showPassword ? "text" : type;

  return (
    <div className="space-y-1">
      <Label htmlFor={name} className="text-sm">
        {label}
      </Label>
      <div className="relative">
        {getIcon()}
        <Input
          id={name}
          type={inputType}
          placeholder={placeholder}
          className={`h-10 text-sm bg-gray-50 border-gray-200 focus:bg-white ${
            icon ? "pl-10" : ""
          } ${showPasswordToggle ? "pr-10" : ""}`}
          {...register(name)}
          aria-invalid={errors[name] ? "true" : "false"}
        />
        {showPasswordToggle && (
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
        )}
      </div>
      {errors[name] && (
        <p className="text-sm text-red-600">{errors[name]?.message}</p>
      )}
    </div>
  );
}
