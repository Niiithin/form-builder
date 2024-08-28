export interface FormField {
  id: number;
  type: string;
  label: string;
  required: boolean;
  errorMessage?: string;
  value?: any;
  options?: string[]; // Make it optional again
  selectedOption?: string;
}

export interface Feedback {
  id: string;
  url: string;
  title: string;
  viewCount: number;
  date: string;
  time: string;
}
export interface SidebarConfigItem {
  title: string;
  icon: string;
}

export interface CustomIcon {
  icon: React.ReactElement;
  label: string;
}
