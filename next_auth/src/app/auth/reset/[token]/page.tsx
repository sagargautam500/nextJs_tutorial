// app/auth/reset/[token]/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
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
import { Loader2 } from "lucide-react";

const resetSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();
  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Hide any existing UI elements when component mounts
  useEffect(() => {
    // Hide body overflow to prevent scrolling
    document.body.style.overflow = 'hidden';
    
    // Clean up on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const onSubmit = async (values: z.infer<typeof resetSchema>) => {
    setIsLoading(true);
    setGlobalError(null);
    setSuccess(null);

    try {
      const res = await axios.post(`/api/auth/reset`, {
        token,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });

      if (res.data?.success) {
        setSuccess("✅ Password reset successfully!");
        form.reset(); // clear fields

        // Close page after 5 seconds
        setTimeout(() => {
          window.close();
        }, 5000);

      } else {
        throw new Error(res.data?.message || "Something went wrong");
      }
    } catch (err: any) {
      setGlobalError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-white z-[9999] flex items-center justify-center"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'white',
        zIndex: 9999
      }}
    >
      {/* Centered popup card */}
      <Card className="w-full max-w-md shadow-2xl rounded-2xl p-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-800">
            Reset Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          {globalError && (
            <p className="text-red-600 text-center mb-3">{globalError}</p>
          )}
          {success && (
            <p className="text-green-600 text-center mb-3">{success}</p>
          )}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="animate-spin h-4 w-4 mr-2 inline-block" />
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-500">
            This is a standalone reset page
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}