"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons/Logo";
import { LogOut } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

type DashboardHeaderProps = {
  userType: "Student" | "Teacher";
};

export function DashboardHeader({ userType }: DashboardHeaderProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push("/");
    } catch (error) {
      console.error("Logout Error:", error);
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "An error occurred while logging out. Please try again.",
      });
    }
  };

  return (
    <header className="bg-card shadow-sm p-4 flex justify-between items-center rounded-lg">
      <div className="flex items-center gap-4">
        <Logo className="h-10 w-10 text-primary" />
        <div>
            <h1 className="text-xl font-bold font-headline text-primary">EduKid</h1>
            <p className="text-sm text-muted-foreground">{userType} Dashboard</p>
        </div>
      </div>
      <Button variant="ghost" onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </header>
  );
}
