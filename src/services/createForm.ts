import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

interface FormData {
  [key: string]: any;
}

interface SubmissionData {
  [key: string]: any;
}

interface FeedbackData {
  [key: string]: any;
}
export const addForm = functions.https.onCall(
  async (data: FormData, context: functions.https.CallableContext) => {
    const formRef = await db.collection("forms").add({
      ...data,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      viewCount: 0,
      submissionCount: 0,
    });
    return { id: formRef.id };
  }
);

export const editForm = functions.https.onCall(
  async (
    data: { formId: string } & FormData,
    context: functions.https.CallableContext
  ) => {
    const { formId, ...updateData } = data;
    await db.collection("forms").doc(formId).update(updateData);
    return { success: true };
  }
);

export const deleteForm = functions.https.onCall(
  async (
    data: { formId: string },
    context: functions.https.CallableContext
  ) => {
    await db.collection("forms").doc(data.formId).delete();
    return { success: true };
  }
);

export const submitForm = functions.https.onCall(
  async (
    data: { formId: string; submissionData: SubmissionData },
    context: functions.https.CallableContext
  ) => {
    const { formId, submissionData } = data;
    await db
      .collection("submissions")
      .doc(formId)
      .collection("responses")
      .add({
        ...submissionData,
        submittedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    await db
      .collection("forms")
      .doc(formId)
      .update({
        submissionCount: admin.firestore.FieldValue.increment(1),
      });
    return { success: true };
  }
);

export const incrementViewCount = functions.https.onCall(
  async (
    data: { formId: string },
    context: functions.https.CallableContext
  ) => {
    await db
      .collection("forms")
      .doc(data.formId)
      .update({
        viewCount: admin.firestore.FieldValue.increment(1),
      });
    return { success: true };
  }
);

export const getAllForms = functions.https.onCall(
  async (data: any, context: functions.https.CallableContext) => {
    const formsSnapshot = await db.collection("forms").get();
    return formsSnapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
);
