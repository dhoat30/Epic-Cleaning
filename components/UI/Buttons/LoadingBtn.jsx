import styles from "./LoadingBtn.module.scss";
import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import DoneIcon from "@mui/icons-material/Done";
function LoadingBtn({
  align,
  isLoading,
  onClick,
  isSuccess,
  className,
  label,
  children,
  newSubmission,
  id,
}) {
  let labelText = children ? children : "Submit";
  return (
    <LoadingButtonStyle
      className={className}
      id={id}
      onClick={onClick}
      align={align}
      size="large"
      variant="contained"
      disableElevation
      disabled={isSuccess}
      loading={isLoading}
    >
      {isSuccess && !newSubmission ? (
        <DoneIcon className={styles.doneIcon} />
      ) : (
        labelText
      )}
    </LoadingButtonStyle>
  );
}

export default LoadingBtn;
const LoadingButtonStyle = ({ className = "", ...props }) =>
  React.createElement(LoadingButton, {
    ...props,
    className: `${styles.loadingButtonStyle} ${className}`.trim(),
  });
