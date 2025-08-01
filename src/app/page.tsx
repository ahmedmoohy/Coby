import { LoginForm } from "@/components/auth/LoginForm";
import { Logo } from "@/components/icons/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
       <div className="flex flex-col items-center justify-center text-center mb-8">
         <Logo className="h-20 w-20 mb-4 text-primary" />
        <h1 className="text-4xl font-bold font-headline text-primary">
          Welcome to EduKid!
        </h1>
        <p className="text-muted-foreground mt-2">
          Your fun and interactive learning journey starts here.
        </p>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Login</CardTitle>
          <CardDescription>
            Please select if you are a student or a teacher to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} EduKid Platform. All rights reserved.</p>
      </footer>
    </main>
  );
}
