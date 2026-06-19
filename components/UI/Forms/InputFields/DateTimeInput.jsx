"use client";

import FormControl from "@mui/material/FormControl";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

export default function DateTimeInput({
  className = "",
  label,
  value,
  onChange,
  required,
  isInvalid,
  errorMessage,
}) {
  return (
    <FormControl
      className={className}
      fullWidth
      required={required}
      error={required ? isInvalid : null}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label={label}
          value={value ?? null}
          onChange={onChange}
          color="secondary"
          format="DD/MM/YYYY HH:mm"
          minDate={dayjs()}
          slotProps={{
            textField: {
              variant: "outlined",
              fullWidth: true,
              helperText: isInvalid ? errorMessage : "",
              error: isInvalid,
              color: "secondary",
            },
          }}
        />
      </LocalizationProvider>
    </FormControl>
  );
}
