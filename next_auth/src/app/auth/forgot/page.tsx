// app/auth/forgot/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/ui/loading-button";
import ErrorMsg from "@/components/ui/error-msg";

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function ForgotPasswordPage() {
  const form = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (values: z.infer<typeof forgotSchema>) => {
    setIsLoading(true);
    setGlobalError(null);
    setSuccess(null);

    try {
      const res = await axios.post("/api/auth/forgot", values);

      if (res.data?.success) {
        setSuccess("If this email exists, a reset link was sent.please check your inbox.");
         setTimeout(() => {
          router.push("/auth/signin");
        }, 2000);
      } else {
        throw new Error(res.data?.error || "Something went wrong");
      }
    } catch (err: any) {
      setGlobalError(err.response?.data?.error || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl backdrop-blur-md bg-white/90">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-800">
            Forgot Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          {globalError && <ErrorMsg error={globalError} />}
          {success && (
            <p className="text-green-600 text-sm text-center mb-2">{success}</p>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        type="email"
                        {...field}
                        className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
              <LoadingButton pending={isLoading} label="Send Reset Link" />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-sm text-gray-600 text-center">
          <Button
            variant="link"
            onClick={() => router.push("/auth/signin")}
            className="text-indigo-600"
          >
            Back to Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
