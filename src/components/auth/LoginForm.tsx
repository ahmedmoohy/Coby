"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { LogIn, User, BookUser } from "lucide-react";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  AuthError,
} from "firebase/auth";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
  role: z.enum(["student", "teacher"], {
    required_error: "You need to select a role.",
  }),
});

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "student",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password, role } = values;
    try {
      // First, try to sign in the user
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Login Successful!",
        description: "Welcome back! Redirecting to your dashboard...",
      });
      // Redirect based on role
      if (role === "teacher") {
        router.push("/teacher/dashboard");
      } else {
        router.push("/student/dashboard");
      }
    } catch (error) {
        const authError = error as AuthError;
        // If the user doesn't exist, create a new account
        if (authError.code === 'auth/user-not-found') {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                toast({
                    title: "Account Created!",
                    description: "Welcome! Your account has been created successfully.",
                });
                 // Redirect based on role
                if (role === "teacher") {
                    router.push("/teacher/dashboard");
                } else {
                    router.push("/student/dashboard");
                }
            } catch (createError) {
                const createAuthError = createError as AuthError;
                toast({
                    variant: "destructive",
                    title: "Sign Up Error",
                    description: createAuthError.message,
                });
            }
        } else {
            // Handle other errors (e.g., wrong password)
            toast({
                variant: "destructive",
                title: "Login Error",
                description: authError.message,
            });
        }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>I am a...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="student" />
                    </FormControl>
                    <FormLabel className="font-normal flex items-center gap-2">
                      <User className="h-4 w-4" /> Student
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="teacher" />
                    </FormControl>
                    <FormLabel className="font-normal flex items-center gap-2">
                     <BookUser className="h-4 w-4" /> Teacher
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          size="lg"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Processing...' : (
            <>
              <LogIn className="mr-2 h-5 w-5" />
              Login / Sign Up
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
