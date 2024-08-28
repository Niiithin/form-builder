// Function to extract and format the date
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};

export interface FormDate {
  nanoseconds: number;
  seconds: number;
}

export function convertTimestampToDate(formDate: FormDate): string {
  const date = new Date(formDate.seconds * 1000);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// date-time-utils.ts

/**
 * Extracts the date from a date string or Date object and returns it in MM/DD/YYYY format.
 * @param date - The input date string or Date object.
 * @returns The formatted date string.
 */
export function extractDate(date: string | Date): string {
  const dateObject = date instanceof Date ? date : new Date(date);

  if (isNaN(dateObject.getTime())) {
    throw new Error("Invalid date provided");
  }

  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  const year = dateObject.getFullYear();

  return `${month}/${day}/${year}`;
}

/**
 * Extracts the time from a date string or Date object and returns it in HH:MM format.
 * @param date - The input date string or Date object.
 * @returns The formatted time string.
 */
export function extractTime(date: string | Date): string {
  const dateObject = date instanceof Date ? date : new Date(date);

  if (isNaN(dateObject.getTime())) {
    throw new Error("Invalid date provided");
  }

  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}
