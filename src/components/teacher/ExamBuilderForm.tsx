"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Trash2, Save, Loader2 } from "lucide-react";
import { saveExam, type ExamData } from "@/lib/firebase/exams";

const questionSchema = z.object({
  text: z.string().min(1, "Question text cannot be empty."),
  options: z.array(z.string().min(1, "Option text cannot be empty.")).length(4, "Please provide 4 options."),
  correctAnswer: z.coerce.number().min(0).max(3),
});

const examBuilderSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  startTime: z.string().min(1, "Start time is required."),
  endTime: z.string().min(1, "End time is required."),
  timePerQuestion: z.coerce.number().min(5, "Time per question must be at least 5 seconds."),
  questions: z.array(questionSchema).min(1, "Please add at least one question."),
});

type ExamBuilderFormValues = z.infer<typeof examBuilderSchema>;

export function ExamBuilderForm() {
  const router = useRouter();
  const { toast } = useToast();
  
  const form = useForm<ExamBuilderFormValues>({
    resolver: zodResolver(examBuilderSchema),
    defaultValues: {
      title: "",
      startTime: "",
      endTime: "",
      timePerQuestion: 30,
      questions: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  async function onSubmit(data: ExamBuilderFormValues) {
    try {
      await saveExam(data as ExamData);
      toast({
        title: "Exam Created! ✨",
        description: "Your new exam has been saved successfully.",
      });
      router.push("/teacher/dashboard");
    } catch (error) {
      console.error("Failed to save exam:", error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "There was an issue saving your exam. Please try again.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Exam Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exam Title</FormLabel>
                  <FormControl><Input placeholder="e.g., Chapter 5: Algebra Basics" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="startTime" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Start Time</FormLabel>
                        <FormControl><Input type="datetime-local" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="endTime" render={({ field }) => (
                    <FormItem>
                        <FormLabel>End Time</FormLabel>
                        <FormControl><Input type="datetime-local" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            <FormField
              control={form.control}
              name="timePerQuestion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time per Question (in seconds)</FormLabel>
                  <FormControl><Input type="number" {...field} /></FormControl>
                  <FormDescription>How long students have to answer each question.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Separator />

        <div>
            <h3 className="text-2xl font-bold font-headline mb-4">Questions</h3>
            {fields.map((field, index) => (
              <Card key={field.id} className="mb-6 relative pt-8">
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => remove(index)}>
                  <Trash2 className="h-5 w-5" />
                  <span className="sr-only">Remove Question</span>
                </Button>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name={`questions.${index}.text`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question {index + 1}</FormLabel>
                        <FormControl><Textarea placeholder="What is 2 + 2?" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`questions.${index}.correctAnswer`}
                    render={({ field }) => (
                        <FormItem>
                             <FormLabel>Options (select the correct answer)</FormLabel>
                             <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={String(field.value)} className="space-y-2">
                                    {[0, 1, 2, 3].map((optionIndex) => (
                                        <FormField
                                            key={optionIndex}
                                            control={form.control}
                                            name={`questions.${index}.options.${optionIndex}`}
                                            render={({ field: optionField }) => (
                                                <FormItem className="flex items-center space-x-3">
                                                    <FormControl>
                                                        <RadioGroupItem value={String(optionIndex)} />
                                                    </FormControl>
                                                    <Input placeholder={`Option ${optionIndex + 1}`} {...optionField} />
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            ))}

            {form.formState.errors.questions && !form.formState.errors.questions.root && fields.length > 0 && (
                 <p className="text-sm font-medium text-destructive">{form.formState.errors.questions.message}</p>
            )}

            {form.formState.errors.questions?.root && (
                 <p className="text-sm font-medium text-destructive">{form.formState.errors.questions.root.message}</p>
            )}


            <Button type="button" variant="outline" onClick={() => append({ text: "", options: ["", "", "", ""], correctAnswer: 0 })}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Question
            </Button>
        </div>

        <div className="flex justify-end">
            <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Saving...
                    </>
                ) : (
                    <>
                        <Save className="mr-2 h-5 w-5" /> Save Exam
                    </>
                )}
            </Button>
        </div>
      </form>
    </Form>
  );
}
