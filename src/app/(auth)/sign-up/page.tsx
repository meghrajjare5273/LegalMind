import AuthContainer from "@/components/auth/auth-container";

export const metadata = {
  title: "Sign Up | LegalMind",
  description: "Join LegalMind and start your journey",
};

export default function SignUpPage() {
  return <AuthContainer whichForm="signup" />;
}
