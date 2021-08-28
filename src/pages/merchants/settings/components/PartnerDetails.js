import Box from "@material-ui/core/Box";
import StyledTextField from "components/StyledTextField/StyledTextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

import { ValidationError } from "components";

import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  subSubtopicText: {
    fontSize: "16px",
    color: theme.palette.secondary.subtopic,
  },
}));

function PersonalDetails({ control, errors }) {
  const classes = useStyles();
  return (
    <Box>
      <Typography className={classes.subSubtopicText} color="textPrimary">
        Partner Details
      </Typography>
      <Controller
        name="fullName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <StyledTextField
            margin="normal"
            label="Full Name"
            type="text"
            {...field}
          />
        )}
      />
      <ValidationError message={errors.fullName?.message} />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <StyledTextField
            margin="normal"
            label="Email"
            type="text"
            {...field}
          />
        )}
      />
      <ValidationError message={errors.email?.message} />
      <Controller
        name="phoneNumber"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <StyledTextField margin="normal" label="Phone Number" {...field} />
        )}
      />
      <ValidationError message={errors.phoneNumber?.message} />
    </Box>
  );
}

export default PersonalDetails;
