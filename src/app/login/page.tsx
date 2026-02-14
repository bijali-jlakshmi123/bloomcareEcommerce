"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Flower2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }
      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("Something went wrong");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-rose-500 to-fuchsia-500 flex items-center justify-center">
              <Flower2 className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-rose-600 to-fuchsia-600 bg-clip-text text-transparent">
              BloomCare
            </span>
          </Link>
          <h1 className="text-2xl font-bold font-display">Welcome back</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Sign in to your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-xl"
        >
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 text-sm">
              {error}
            </div>
          )}
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="mt-4">
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            fullWidth
            className="mt-6"
            isLoading={loading}
            disabled={loading}
          >
            Sign In
          </Button>
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-rose-500 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
