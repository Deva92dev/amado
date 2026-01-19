"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import { useSignUp } from "@clerk/nextjs";

export default function SignupPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState(""); //  OTP Code state

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Create Account & Send Email Code
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      // Create user
      await signUp.create({
        emailAddress: email,
        password,
        // Helper to split single name string into First/Last
        firstName: name.split(" ")[0],
        lastName: name.split(" ").slice(1).join(" ") || "",
      });

      // Prepare email verification
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Switch UI to verification mode
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError(err.errors?.[0]?.message || "Error creating account");
    } finally {
      setLoading(false);
    }
  };

  // Verify Code & Activate Session
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
        setError("Verification incomplete.");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError(err.errors?.[0]?.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  // RENDER: Verification Form
  if (pendingVerification) {
    return (
      <AuthLayout
        title="Verify your email"
        subTitle={`We sent a code to ${email}`}
      >
        <form onSubmit={handleVerify} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter 6-digit code"
                required
                className="bg-muted/30"
              />
            </div>
          </div>
          {error && (
            <p className="text-sm text-destructive font-medium">{error}</p>
          )}
          <Button type="submit" className="w-full h-11" disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Verify & Login"
            )}
          </Button>
        </form>
      </AuthLayout>
    );
  }

  // RENDER: Sign Up Form (Step 1)
  return (
    <AuthLayout
      title="Create an account"
      subTitle="Enter your details to get started"
    >
      <form onSubmit={handleSignup} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-muted/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-muted/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-muted/30"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive font-medium">{error}</p>
        )}

        <Button type="submit" className="w-full h-11" disabled={loading}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Create Account"
          )}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
