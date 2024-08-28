import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormField } from "models/models";

interface FormState {
  fields: FormField[];
  isDirty: boolean;
  isPublished: boolean;
  formTitle: string;
  formURL: string;
  formDate: string;
  formTime: string;
  urlCondition: boolean;
  specificDate: boolean;
  specificTime: boolean;
}

const initialState: FormState = {
  fields: [],
  isDirty: false,
  isPublished: false,
  formTitle: "",
  formURL: "",
  formDate: "",
  formTime: "",
  urlCondition: false,
  specificDate: false,
  specificTime: false,
};

const formSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    initializeForm: (state) => {
      return { ...initialState };
    },
    addField: (state, action: PayloadAction<Omit<FormField, "options">>) => {
      const newField: FormField = {
        ...action.payload,
        options:
          action.payload.type === "Categories" ||
          action.payload.type === "Radio Button"
            ? ["Option 1", "Option 2", "Option 3"]
            : [],
      };

      state.fields.push(newField);
      state.isDirty = true;
    },
    updateField: (state, action: PayloadAction<FormField>) => {
      const index = state.fields.findIndex(
        (field) => field.id === action.payload.id
      );
      if (index !== -1) {
        state.fields[index] = action.payload;
        state.isDirty = true;
      }
    },
    deleteField: (state, action: PayloadAction<number>) => {
      state.fields = state.fields.filter(
        (field) => field.id !== action.payload
      );
      state.isDirty = true;
    },
    updateFieldOptions: (
      state,
      action: PayloadAction<{ id: number; options: string[] }>
    ) => {
      const { id, options } = action.payload;
      const field = state.fields.find((field) => field.id === id);
      if (
        field &&
        (field.type === "Radio Button" || field.type === "Categories")
      ) {
        field.options = options;
        state.isDirty = true;
      }
    },
    setCategoryOption: (
      state,
      action: PayloadAction<{ id: number; option: string }>
    ) => {
      const field = state.fields.find((f) => f.id === action.payload.id);
      if (field && field.type === "Categories") {
        field.selectedOption = action.payload.option;
        state.isDirty = true;
      }
    },
    saveForm: (state) => {
      state.isDirty = false;
    },
    publishForm: (state) => {
      state.isDirty = false;
      state.isPublished = true;
    },
    setFormTitle: (state, action: PayloadAction<string>) => {
      console.log("setFormTitle reducer called. New title:", action.payload);
      state.formTitle = action.payload;
      state.isDirty = true;
    },
    setFormURL: (state, action: PayloadAction<string>) => {
      state.formURL = action.payload;
      state.isDirty = true;
    },
    setFormDate: (state, action: PayloadAction<string>) => {
      state.formDate = action.payload;
      state.isDirty = true;
    },
    setFormTime: (state, action: PayloadAction<string>) => {
      state.formTime = action.payload;
      state.isDirty = true;
    },
    setUrlCondition: (state, action: PayloadAction<boolean>) => {
      state.urlCondition = action.payload;
      state.isDirty = true;
    },
    setSpecificDate: (state, action: PayloadAction<boolean>) => {
      state.specificDate = action.payload;
      state.isDirty = true;
    },
    setSpecificTime: (state, action: PayloadAction<boolean>) => {
      state.specificTime = action.payload;
      state.isDirty = true;
    },
    // New reorderFields reducer
    reorderFields: (state, action: PayloadAction<FormField[]>) => {
      state.fields = action.payload;
      state.isDirty = true;
    },

    populateForm: (state, action: PayloadAction<FormState>) => {
      return { ...action.payload, isDirty: false };
    },
  },
});

export const {
  initializeForm,
  addField,
  updateField,
  deleteField,
  saveForm,
  publishForm,
  setFormTitle,
  setFormURL,
  setFormDate,
  updateFieldOptions,
  setCategoryOption,
  setFormTime,
  setUrlCondition,
  setSpecificDate,
  setSpecificTime,
  reorderFields, // Export the new reorderFields action
  populateForm,
} = formSlice.actions;

export default formSlice.reducer;
