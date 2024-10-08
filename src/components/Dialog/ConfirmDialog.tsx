/* Imports */
import { memo } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// ----------------------------------------------------------------------

/* Types/Interfaces */
/**
 * Interface used to create popup dialog component for confirmation message.
 *
 * @interface ConfirmDialogProps
 * @property {boolean} open - to open and close the dialog
 * @property {string|node} title - title for the dialog
 * @property {string|node} description - describing the confirmation message
 * @property {boolean} isSubmitting - to show the loading for button
 * @property {string} agreeText - text for 'Yes' button
 * @property {string} disagreeText - text for 'No' button
 * @property {function} onAgreeAction - action for 'Yes' button
 * @property {function} onDisAgreeAction - action for 'No' button
 */
export interface ConfirmDialogProps {
  open?: boolean;
  title?: string | React.ReactNode;
  description: string | React.ReactNode;
  isSubmitting?: boolean;
  agreeText?: string;
  disagreeText?: string;
  disagreeButton?: boolean;
  onAgreeAction: () => void;
  onDisAgreeAction: () => void;
}

// ----------------------------------------------------------------------

/**
 * Popup dialog component for confirmation message
 *
 * @component
 * @param {boolean} open - to open and close the dialog
 * @param {string|node} title - title for the dialog
 * @param {string|node} description - describing the confirmation message
 * @param {boolean} isSubmitting - to show the loading for button
 * @param {string} agreeText - text for 'Yes' button
 * @param {string} disagreeText - text for 'No' button
 * @param {string} disagreeButton - text for 'No' button
 * @param {function} onAgreeAction - action for 'Yes' button
 * @param {function} onDisAgreeAction - action for 'No' button
 * @returns {JSX.Element}
 */
const ConfirmDialog = ({
  open = false,
  title,
  description,
  isSubmitting = false,
  agreeText = "Agree",
  disagreeText = "Disagree",
  disagreeButton,
  onAgreeAction,
  onDisAgreeAction,
}: ConfirmDialogProps): JSX.Element => {
  /* Output */
  return (
    <Dialog fullWidth maxWidth="xs" open={open}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {/* <DialogContent id="alert-dialog-title"> */}
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {disagreeButton && (
          <Button
            data-testid="buttonDisagree"
            variant="outlined"
            size="small"
            onClick={onDisAgreeAction}
          >
            {disagreeText}
          </Button>
        )}
        <LoadingButton
          data-testid="buttonAgree"
          size="small"
          variant="contained"
          loading={isSubmitting}
          onClick={onAgreeAction}
        >
          {agreeText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default memo(ConfirmDialog);
