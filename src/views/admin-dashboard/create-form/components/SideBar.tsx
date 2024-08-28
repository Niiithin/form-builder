import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  List,
  Typography,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import styles from "./index.style";
import SidebarItem from "./SidebarItem";
import SidebarConfig from "./helper/sidebarConfig";
import { AppDispatch, RootState } from "store/store";
import {
  setFormDate,
  setFormTime,
  setFormURL,
  setUrlCondition,
  setSpecificDate,
  setSpecificTime,
} from "store/formSlice";

interface SidebarProps {
  onAddField: (fieldType: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onAddField }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    urlCondition,
    specificDate,
    specificTime,
    formURL,
    formDate,
    formTime,
  } = useSelector((state: RootState) => state.form);

  const handleURLConditionChange = (checked: boolean) => {
    dispatch(setUrlCondition(checked));
  };

  const handleSpecificDateChange = (checked: boolean) => {
    dispatch(setSpecificDate(checked));
  };

  const handleSpecificTimeChange = (checked: boolean) => {
    dispatch(setSpecificTime(checked));
  };

  const handleURLChange = (value: string) => {
    dispatch(setFormURL(value));
  };

  const handleDateChange = (value: string) => {
    dispatch(setFormDate(value));
  };

  const handleTimeChange = (value: string) => {
    dispatch(setFormTime(value));
  };

  return (
    <Box
      sx={(theme) => ({
        ...styles.mainContainer(theme),
        display: "flex",
        flexDirection: "column",
      })}
    >
      <Typography variant="h4" sx={(theme) => styles.heading(theme)}>
        <b>Add fields</b>
      </Typography>
      <Box
        sx={{
          ...styles.listContainer,
          flexGrow: 1,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.1)",
            outline: "1px solid slategrey",
          },
        }}
      >
        <List sx={(theme) => styles.sidebarList(theme)}>
          {SidebarConfig.map((item, index) => (
            <SidebarItem
              key={index}
              title={item.title}
              icon={item.icon}
              onClick={() => onAddField(item.title)}
            />
          ))}
        </List>
        <Box sx={{ paddingBottom: 12 }}>
          <Typography variant="h4" sx={(theme) => styles.heading(theme)}>
            <b>Add logic</b>
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={urlCondition}
                onChange={(e) => handleURLConditionChange(e.target.checked)}
              />
            }
            label="Show based on URL conditions"
          />
          {urlCondition && (
            <TextField
              fullWidth
              placeholder="Enter URL condition"
              sx={{ mt: 1 }}
              value={formURL}
              onChange={(e) => handleURLChange(e.target.value)}
            />
          )}
          <FormControlLabel
            control={
              <Switch
                checked={specificDate}
                onChange={(e) => handleSpecificDateChange(e.target.checked)}
              />
            }
            label="Show on a specific date"
          />
          {specificDate && (
            <TextField
              fullWidth
              placeholder="MM/DD/YYYY"
              sx={{ mt: 1 }}
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formDate}
              onChange={(e) => handleDateChange(e.target.value)}
            />
          )}
          <FormControlLabel
            control={
              <Switch
                checked={specificTime}
                onChange={(e) => handleSpecificTimeChange(e.target.checked)}
              />
            }
            label="Show on a specific time"
          />
          {specificTime && (
            <TextField
              fullWidth
              placeholder="hh:mm aa"
              sx={{ mt: 1 }}
              type="time"
              InputLabelProps={{ shrink: true }}
              value={formTime}
              onChange={(e) => handleTimeChange(e.target.value)}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
