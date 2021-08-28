import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import StyledTextField from "components/StyledTextField/StyledTextField";

import { ValidationError } from "components";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from 'react-redux';

import { editMerchantDetailsSchema } from "validators";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "30px",
  },
  inputContainer: {
    border: "1px solid #CBC2D1",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
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
  subSubtopicText: {
    fontSize: "16px",
    color: theme.palette.secondary.subtopic,
  },
}));

function Profile() {
  const classes = useStyles();

  const authUser = useSelector(state => state.user.authUser);

  // console.log(authUser);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editMerchantDetailsSchema),
  });
  return (
    <form
      noValidate
      className={classes.container}
      onSubmit={handleSubmit(editMerchantDetailsSchema)}
    >
      <Typography
        style={{ paddingBottom: "20px" }}
        className={classes.subtopicText}
        color="textPrimary"
      >
        Profile Details
      </Typography>
      <Grid container spacing={3} className={classes.inputContainer}>
        <Grid item md={6} xs={12}>
          <Box>
            <Typography className={classes.subSubtopicText} color="textPrimary">
              Personal Details
            </Typography>
            <Controller
              name="fullName"
              control={control}
              defaultValue={`${authUser.first_name} ${authUser.last_name}`}
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
              defaultValue={authUser.email}
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
              defaultValue={authUser.phone_number || ''}
              render={({ field }) => (
                <StyledTextField margin="normal" label="Phone Number" {...field} />
              )}
            />
            <ValidationError message={errors.phoneNumber?.message} />
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box>
            <Typography className={classes.subSubtopicText} color="textPrimary">
              Business Details
            </Typography>
            <StyledTextField
              margin="normal"
              id="businessName"
              label="Business Name"
              type="text"
              name="businessName"
              autoComplete="businessName"
              defaultValue={authUser.merchant?.stores?.[0]?.name || ''}
              required={false}
              contentEditable={false}
            />
            <StyledTextField
              margin="normal"
              id="businessCategory"
              label="Business Category"
              type="text"
              name="businessCategory"
              autoComplete="businessCategory"
              required={false}
              contentEditable={false}
            />
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <StyledTextField
                  margin="normal"
                  id="employeeNumber"
                  label="Number of Employees"
                  defaultValue={authUser.merchant?.number_of_employees || 0}
                  type="text"
                  name="employeeNumber"
                  autoComplete="employeeNumber"
                  required={false}
                  contentEditable={false}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <StyledTextField
                  margin="normal"
                  id="branchNumber"
                  label="Number of Branches"
                  type="text"
                  name="branchNumber"
                  defaultValue={authUser.merchant?.number_of_branches || 0}
                  autoComplete="branchNumber"
                  required={false}
                  contentEditable={false}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update profile
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default Profile;
