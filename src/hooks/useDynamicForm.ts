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
      where("formURL", "==", currentURL),
      limit(20)
    );

    try {
      const querySnapshot = await getDocs(formsQuery);
      const fetchedForms: FormData[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const formDate = data.formDate?.toDate();
        console.log("Form date:", formDate);
        console.log("Current time:", currentTime);
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

      console.log("Fetched forms:", fetchedForms);
      setForms(fetchedForms);
    } catch (error) {
      console.error("Error fetching forms: ", error);
    }
  };

  const isTimeMatch = (currentTime: Date, formTime: Date): boolean => {
    return (
      currentTime.getUTCFullYear() === formTime.getUTCFullYear() &&
      currentTime.getUTCMonth() === formTime.getUTCMonth() &&
      currentTime.getUTCDate() === formTime.getUTCDate() &&
      currentTime.getUTCHours() === formTime.getUTCHours() &&
      currentTime.getUTCMinutes() === formTime.getUTCMinutes()
    );
  };

  useEffect(() => {
    fetchFormByDate();
    const interval = setInterval(fetchFormByDate, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return forms;
};
