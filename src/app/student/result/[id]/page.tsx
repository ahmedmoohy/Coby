
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Home } from "lucide-react";
import { DashboardHeader } from "@/components/shared/DashboardHeader";

// In a real app, this page would receive the exam ID from the URL params
// and fetch the student's results for that exam.
export default function ResultsPage({ params }: { params: { id: string } }) {
  const mockScore = 8;
  const mockTotalQuestions = 10;
  const percentage = (mockScore / mockTotalQuestions) * 100;
  
  let message = "Good effort!";
  if (percentage >= 90) {
    message = "Excellent work! You're a superstar! ✨";
  } else if (percentage >= 75) {
    message = "Great job! Keep it up!";
  }

  return (
    <div className="min-h-screen container mx-auto p-4 sm:p-6 lg:p-8 flex flex-col">
       <div className="w-full max-w-4xl mx-auto">
         <DashboardHeader userType="Student" />
       </div>
       <main className="flex-grow flex items-center justify-center">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <div className="mx-auto bg-accent/20 p-4 rounded-full w-fit">
                        <Trophy className="h-16 w-16 text-accent" strokeWidth={1.5} />
                    </div>
                    <CardTitle className="text-3xl font-headline mt-4">Exam Complete!</CardTitle>
                    <CardDescription className="text-lg">{message}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-background p-6 rounded-lg">
                        <p className="text-muted-foreground text-sm font-bold uppercase">Your Score</p>
                        <p className="text-6xl font-bold text-primary">
                            {mockScore} <span className="text-4xl text-muted-foreground">/ {mockTotalQuestions}</span>
                        </p>
                    </div>
                    <Button asChild size="lg" className="w-full">
                        <Link href="/student/dashboard">
                            <Home className="mr-2 h-5 w-5" />
                            Back to Dashboard
                        </Link>
                    </Button>
                </CardContent>
            </Card>
       </main>
    </div>
  );
}
