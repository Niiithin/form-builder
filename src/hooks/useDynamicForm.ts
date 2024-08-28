import { useState, useEffect } from "react";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "config/firebase";

interface FormField {
  id: number;
  label: string;
  options: any[];
  required: boolean;
  type: string;
}

interface FormData {
  description: undefined;
  form: {
    fields: FormField[];
    isDirty: boolean;
    isPublished: boolean;
  };
  id: string;
  submissionCount: number;
  title: undefined;
  viewCount: number;
}

export const useDynamicForm = () => {
  const [forms, setForms] = useState<FormData[]>([]);

  const fetchFormByDate = async () => {
    const currentURL = window.location.href;
    const currentTime = new Date();

    const formsQuery = query(
      collection(db, "forms"),
      where("formURL", "==", "http://localhost:3000/home"),
      limit(20)
    );

    try {
      const querySnapshot = await getDocs(formsQuery);
      const fetchedForms: FormData[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const formDate = data.formDate?.toDate();
        console.log(data, "data");
        if (formDate && isTimeMatch(currentTime, formDate)) {
          fetchedForms.push({
            id: doc.id,
            title: data.formTitle,
            description: data.description,
            viewCount: data.viewCount,
            submissionCount: data.submissionCount,
            form: data.form || [],
          });
        }
      });

      setForms(fetchedForms);
    } catch (error) {
      console.error("Error fetching forms: ", error);
    }
  };

  const isTimeMatch = (currentTime: Date, formTime: Date): boolean => {
    return (
      currentTime.getFullYear() === formTime.getFullYear() &&
      currentTime.getMonth() === formTime.getMonth() &&
      currentTime.getDate() === formTime.getDate() &&
      currentTime.getHours() === formTime.getHours() &&
      currentTime.getMinutes() === formTime.getMinutes()
    );
  };

  useEffect(() => {
    fetchFormByDate();
    const interval = setInterval(fetchFormByDate, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return forms;
};
