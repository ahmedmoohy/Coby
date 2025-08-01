import { ExamInterface } from "@/components/student/ExamInterface";

// This is a server component that wraps the client component
export default function ExamPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch exam data here and pass it to the client component.
  // This helps with SEO and initial page load performance.
  const mockExam = {
    id: params.id,
    title: "Math Basics - Chapter 1",
    teacher: "Mr. Davison",
    timePerQuestion: 30,
    questions: [
      {
        text: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1,
      },
      {
        text: "What is 5 x 3?",
        options: ["12", "15", "18", "20"],
        correctAnswer: 1,
      },
      {
        text: "What is 10 - 7?",
        options: ["1", "2", "3", "4"],
        correctAnswer: 2,
      },
    ],
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ExamInterface exam={mockExam} />
    </div>
  );
}
