import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, CheckCircle, PlayCircle, Trophy, User } from "lucide-react";
import { DashboardHeader } from "@/components/shared/DashboardHeader";
import { Badge } from "@/components/ui/badge";

const mockExams = [
  { id: "1", title: "Math Basics - Chapter 1", status: "available", questions: 10, teacher: "Mr. Davison" },
  { id: "2", title: "Science: The Solar System", status: "completed", questions: 15, score: "12/15", teacher: "Ms. Frizzle" },
  { id: "3", title: "History: Ancient Civilizations", status: "upcoming", questions: 20, teacher: "Mr. Jones" },
];

export default function StudentDashboard() {
  return (
    <div className="min-h-screen container mx-auto p-4 sm:p-6 lg:p-8">
      <DashboardHeader userType="Student" />
      
      <main className="mt-8">
        <h2 className="text-3xl font-bold font-headline mb-6">Your Exams</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockExams.map((exam) => (
            <Card key={exam.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="flex items-start gap-3">
                    <Pencil className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <span>{exam.title}</span>
                  </CardTitle>
                  <Badge variant={exam.status === 'completed' ? 'default' : 'secondary'} className={exam.status === 'completed' ? 'bg-green-500 text-white' : ''}>
                    {exam.status}
                  </Badge>
                </div>
                <CardDescription className="flex flex-col gap-2">
                  <span>{exam.questions} questions</span>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <User className="mr-1 h-3 w-3" />
                    <span>Created by {exam.teacher}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                {exam.status === "completed" && (
                  <div className="flex items-center gap-2 text-lg font-bold text-green-600">
                    <Trophy className="h-5 w-5" />
                    <span>Score: {exam.score}</span>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {exam.status === "available" && (
                  <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href={`/student/exam/${exam.id}`}>
                      <PlayCircle className="mr-2 h-5 w-5" />
                      Start Exam
                    </Link>
                  </Button>
                )}
                 {exam.status === "completed" && (
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/student/results/${exam.id}`}>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      View Results
                    </Link>
                  </Button>
                )}
                {exam.status === "upcoming" && (
                  <Button className="w-full" disabled>
                    Not yet available
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
