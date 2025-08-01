import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from "@/lib/firebase";

type Question = {
  text: string;
  options: string[];
  correctAnswer: number;
};

export type ExamData = {
  title: string;
  startTime: string;
  endTime: string;
  timePerQuestion: number;
  questions: Question[];
  // We'll add teacherId later when we have user context
};

export async function saveExam(examData: ExamData) {
  try {
    const docRef = await addDoc(collection(db, "exams"), {
      ...examData,
      createdAt: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Failed to save exam.");
  }
}
