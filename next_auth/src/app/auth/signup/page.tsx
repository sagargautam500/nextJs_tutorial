"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import LoadingButton from "@/components/ui/loading-button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

import { handleCredentialsSignUp } from "@/app/actions/authAction";
import { signUpSchema } from "@/lib/zod";
import { useRouter } from "next/navigation";



type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      hobbies: [],
      role: "user",
    },
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const hobbiesList = ["Reading", "Coding", "Sports", "Music"];

 const onSubmit = async (values: SignUpFormValues) => {
  setIsLoading(true);
  setGlobalError(null);

  try {
    await handleCredentialsSignUp(values);
    router.push("/auth/signin"); // redirect on success
  } catch (err: any) {
    setGlobalError(err.message || "Signup failed");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl backdrop-blur-md bg-white/90">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-800">
            Create Account
          </CardTitle>
        </CardHeader>

        <CardContent>
          {globalError && <p className="text-red-500 text-center mb-2">{globalError}</p>}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Full Name" className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"/>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm"/>
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="you@example.com" className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"/>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm"/>
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="98XXXXXXXX" className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"/>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm"/>
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="••••••••" className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"/>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm"/>
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="••••••••" className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"/>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm"/>
                  </FormItem>
                )}
              />

              {/* Hobbies */}
              <FormField
                control={form.control}
                name="hobbies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hobbies</FormLabel>
                    <div className="flex flex-col space-y-2 mt-1">
                      {hobbiesList.map((hobby) => (
                        <div key={hobby} className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value.includes(hobby)}
                            onCheckedChange={(checked) => {
                              field.onChange(
                                checked
                                  ? [...field.value, hobby]
                                  : field.value.filter((v) => v !== hobby)
                              );
                            }}
                          />
                          <span>{hobby}</span>
                        </div>
                      ))}
                    </div>
                    <FormMessage className="text-red-500 text-sm"/>
                  </FormItem>
                )}
              />

              {/* Role */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent className="bg-white shadow-md rounded-xl border border-gray-200">
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm"/>
                  </FormItem>
                )}
              />

              {/* Submit */}
              <LoadingButton pending={isLoading} label="Signing Up" />
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-center text-sm text-gray-600 bg-gray-50 py-3">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-blue-600 hover:underline font-medium">
            Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
