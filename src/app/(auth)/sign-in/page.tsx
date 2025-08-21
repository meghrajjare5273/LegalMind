import AuthContainer from "@/components/auth/auth-container";

export const metadata = {
  title: "Sign In | LegalMind",
  description: "Access your LegalMind account",
};

export default function SignInPage() {
  return <AuthContainer whichForm="signin" />;
}
