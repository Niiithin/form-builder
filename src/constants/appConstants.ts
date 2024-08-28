import { CustomIcon } from "models/models";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

export const getDefaultLabel = (fieldType: string): string => {
  switch (fieldType) {
    case "Text Area":
      return "Would you like to add a comment?";
    case "Numeric Rating":
      return "How likely is it that you will recommend us to your family and friends?";
    case "Star Rating":
      return "Give a star rating for the website.";
    case "Smiley Rating":
      return "What is your opinion of this page?";
    case "Single Line Input":
      return "Do you have any suggestions to improve our website?";
    case "Radio Button":
      return "Multiple choice - 1 answer";
    case "Categories":
      return "Pick a subject and provide your feedback:";
    default:
      return `New ${fieldType}`;
  }
};

export const toastMessages = {
  success: {
    auth: {
      login: "Login Successful",
      register: "User Registered Successful!. Sign in to continue.",
    },
    form: {
      added: "Form created successfully",
      deleted: "Form deleted successfully",
      updated: "Form updated successfully",
    },
    feedback: {
      submit: "Feedback submitted successfully",
    },
  },
  warning: {
    limit: "Maximum of 7 fields can be added",
  },
  error: {
    common: "Unable to process your request. Please try again.",
  },
};
