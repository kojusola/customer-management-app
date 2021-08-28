import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import PartnerDetails from "./PartnerDetails";
import BusinessDetails from "./BusinessDetails";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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
          <PartnerDetails control={control} errors={errors} />
        </Grid>
        <Grid item md={6} xs={12}>
          <BusinessDetails />
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
