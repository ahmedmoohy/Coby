import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, Timestamp } from "firebase/firestore"; 
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

export type Exam = ExamData & {
  id: string;
  createdAt: Timestamp;
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

export async function getExams(): Promise<Exam[]> {
  try {
    const examsCollection = collection(db, "exams");
    const q = query(examsCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const exams = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Exam));
    return exams;
  } catch (e) {
    console.error("Error getting documents: ", e);
    throw new Error("Failed to fetch exams.");
  }
}
