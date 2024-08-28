// helper/sidebarConfig.ts
import {
  TextFields as TextFieldsIcon,
  Score as ScoreIcon,
  Grade as GradeIcon,
  EmojiEmotions as EmojiEmotionsIcon,
  ShortText as ShortTextIcon,
  RadioButtonChecked as RadioButtonCheckedIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";
import { SidebarConfigItem } from "models/models";

const SidebarConfig: SidebarConfigItem[] = [
  {
    title: "Text Area",
    icon: "/assets/svg/textarea.svg",
  },
  {
    title: "Numeric Rating",
    icon: "/assets/svg/numeric.svg",
  },
  {
    title: "Star Rating",
    icon: "/assets/svg/star_icon.svg",
  },
  {
    title: "Smiley Rating",
    icon: "/assets/svg/smiley_icon.svg",
  },
  {
    title: "Single Line Input",
    icon: "/assets/svg/single_input.svg",
  },
  {
    title: "Radio Button",
    icon: "/assets/svg/radio_icon.svg",
  },
  {
    title: "Categories",
    icon: "/assets/svg/category_icon.svg",
  },
];

export default SidebarConfig;
