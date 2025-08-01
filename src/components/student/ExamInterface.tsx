"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, X, ArrowRight, User } from "lucide-react";
import { cn } from "@/lib/utils";

type Question = {
  text: string;
  options: string[];
  correctAnswer: number;
};

type Exam = {
  id: string;
  title: string;
  teacher: string;
  timePerQuestion: number;
  questions: Question[];
};

type ExamInterfaceProps = {
  exam: Exam;
};

export function ExamInterface({ exam }: ExamInterfaceProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(exam.timePerQuestion);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = exam.questions[currentQuestionIndex];

  useEffect(() => {
    if (isAnswered) return;

    if (timeLeft === 0) {
      handleNextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered]);

  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
  };
  
  const handleConfirmAnswer = () => {
    if (selectedAnswer === null) return;
    setIsAnswered(true);
    setAnswers(prev => [...prev, selectedAnswer]);
  };

  const handleNextQuestion = () => {
    const finalAnswers = isAnswered ? answers : [...answers, selectedAnswer];
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(exam.timePerQuestion);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
        // In a real app, you would save `finalAnswers` to the database
        console.log("Final answers:", finalAnswers);
        router.push(`/student/results/${exam.id}`);
    }
  };

  const progressValue = (timeLeft / exam.timePerQuestion) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto my-8">
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle className="font-headline text-2xl md:text-3xl">{exam.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-2">
                    <User className="h-4 w-4" />
                    <span>Created by {exam.teacher}</span>
                </CardDescription>
            </div>
            <div className="text-right">
                <div className="font-bold text-lg">Question</div>
                <div className="text-muted-foreground">{currentQuestionIndex + 1} / {exam.questions.length}</div>
            </div>
        </div>
        <div className="pt-4">
            <Progress value={progressValue} className="w-full h-4" />
            <p className="text-center text-sm text-muted-foreground mt-2">{timeLeft} seconds remaining</p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <p className="text-xl md:text-2xl text-center font-semibold mb-8 min-h-[6rem] flex items-center">{currentQuestion.text}</p>
        
        <RadioGroup
          value={selectedAnswer !== null ? String(selectedAnswer) : ""}
          onValueChange={(value) => handleSelectAnswer(Number(value))}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
          disabled={isAnswered}
        >
          {currentQuestion.options.map((option, index) => {
            const isCorrect = index === currentQuestion.correctAnswer;
            const isSelected = index === selectedAnswer;
            
            return (
              <Label
                key={index}
                htmlFor={`option-${index}`}
                className={cn(
                  "flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-300",
                  "hover:border-primary",
                  isSelected && !isAnswered && "border-primary bg-primary/10",
                  isAnswered && isCorrect && "bg-green-100 border-green-500 text-green-800",
                  isAnswered && isSelected && !isCorrect && "bg-red-100 border-red-500 text-red-800",
                )}
              >
                <RadioGroupItem value={String(index)} id={`option-${index}`} className="sr-only" />
                <span className="flex-grow text-lg font-medium">{option}</span>
                {isAnswered && isSelected && (isCorrect ? <Check className="h-6 w-6 text-green-600" /> : <X className="h-6 w-6 text-red-600" />)}
                {isAnswered && !isSelected && isCorrect && <Check className="h-6 w-6 text-green-600" />}
              </Label>
            );
          })}
        </RadioGroup>
        
        <div className="mt-8 w-full flex justify-end">
          {!isAnswered ? (
            <Button onClick={handleConfirmAnswer} disabled={selectedAnswer === null} size="lg">
              Confirm Answer
            </Button>
          ) : (
             <Button onClick={handleNextQuestion} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              {currentQuestionIndex === exam.questions.length - 1 ? 'Finish Exam' : 'Next Question'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>

      </CardContent>
    </Card>
  );
      }
