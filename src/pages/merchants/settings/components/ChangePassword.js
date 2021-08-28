import Grid from "@material-ui/core/Grid";
import StyledPasswordInput from "components/StyledPasswordInput/StyledPasswordInput";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { ValidationError } from "components";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ChangePasswordSchema } from "validators";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "45px",
  },
  inputContainer: {
    border: "1px solid #CBC2D1",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
  },
  submit: {
    height: "48px",
    margin: theme.spacing(1, 0, 1),
    textTransform: "none",
  },
  subtopicText: {
    fontSize: "30px",
    color: theme.palette.secondary.subtopic,
    paddingBottom: "10px",
    fontWeight: "600",
  },
}));

function ChangePassword() {
  const classes = useStyles();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ChangePasswordSchema),
  });
  return (
    <form
      noValidate
      className={classes.container}
      onSubmit={handleSubmit(ChangePasswordSchema)}
    >
      <Typography
        className={classes.subtopicText}
        style={{ paddingBottom: "20px" }}
        color="textPrimary"
      >
        Change Password
      </Typography>
      <Grid container spacing={2} className={classes.inputContainer}>
        <Grid item md={4} xs={12}>
          <Controller
            name="oldPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <StyledPasswordInput
                margin="normal"
                label="Old Password"
                type="password"
                {...field}
              />
            )}
          />
          <ValidationError message={errors.oldPassword?.message} />
        </Grid>
        <Grid item md={4} xs={12}>
          <Controller
            name="newPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <StyledPasswordInput
                margin="normal"
                label="New Password"
                type="password"
                {...field}
              />
            )}
          />
          <ValidationError message={errors.newPassword?.message} />
        </Grid>
        <Grid item md={4} xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Change Password
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default ChangePassword;
