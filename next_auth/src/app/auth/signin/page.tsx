"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { signInSchema } from "@/lib/zod";
import {
  handleCredentialsSignIn,
  handleGithubSignIn,
} from "@/app/actions/authAction";
import ErrorMsg from "@/components/ui/error-msg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignInForm() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [globalError, setGlobalError] = React.useState<string | null>(null);

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    setIsLoading(true);
    setGlobalError(null);

    try {
      await handleCredentialsSignIn(values.email, values.password);
      // success case never reaches here (redirect happens)
    } catch (error) {
      if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
        return; // success → redirected
      }
      setGlobalError((error as Error).message); // show real error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl backdrop-blur-md bg-white/90">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-800">
            Sign In to your account
          </CardTitle>
        </CardHeader>
        <CardContent>
          {globalError && <ErrorMsg error={globalError} />}
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        {...field}
                        className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Forgot password link (added) */}
              <div className="flex justify-end">
                <Link
                  href="/auth/forgot"
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <LoadingButton pending={isLoading} label="Sign In" />
            </form>
          </Form>

          <div className="text-sm text-gray-600 text-center p-2">or</div>
          <div className="flex flex-col space-y-2">
            <Button
              type="button"
              variant={"default"}
              className="w-full rounded-xl bg-indigo-400 hover:bg-indigo-500 text-white font-semibold py-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              onClick={() => handleGithubSignIn()}
            >
              Sign In with Github
            </Button>
            <Button
              type="button"
              variant={"default"}
              className="w-full rounded-xl bg-indigo-400 hover:bg-indigo-500 text-white font-semibold py-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              Sign In with Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-sm text-gray-600 justify-center">
          <p className="text-center">
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
