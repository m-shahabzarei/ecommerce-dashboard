import { AuthForm } from "@/components/auth/AuthForm";

export default function AuthPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12"
    >
      <AuthForm />
      <p className="mt-4 text-center text-xs text-gray-400"
      >
        ورود شما به معنای پذیرش شرایط و قوانین است
      </p>
    </div>
  );
}
