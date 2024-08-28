// components/SidebarItem.tsx
import React from "react";
import { Box, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

interface SidebarItemProps {
  icon: string;
  title: string;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  title,
  onClick,
  ...other
}) => {
  return (
    <ListItemButton onClick={onClick} {...other}>
      <Box component="img" alt="i" src={Icon} pr={1} />
      <ListItemText
        primary={title}
        primaryTypographyProps={{
          variant: "body2",
        }}
      />
      <Box component="img" alt="i" src={"/assets/svg/plus_icon.svg"} />
    </ListItemButton>
  );
};

export default React.memo(SidebarItem);
