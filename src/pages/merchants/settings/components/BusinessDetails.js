import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import StyledTextField from "components/StyledTextField/StyledTextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  subSubtopicText: {
    fontSize: "16px",
    color: theme.palette.secondary.subtopic,
  },
}));

function BusinessDetails({ control, errors }) {
  const classes = useStyles();
  return (
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
        <Grid item xs={6}>
          <StyledTextField
            margin="normal"
            id="employeeNumber"
            label="Number of Employees"
            type="text"
            name="employeeNumber"
            autoComplete="employeeNumber"
            required={false}
            contentEditable={false}
          />
        </Grid>
        <Grid item xs={6}>
          <StyledTextField
            margin="normal"
            id="branchNumber"
            label="Number of Branches"
            type="text"
            name="branchNumber"
            autoComplete="branchNumber"
            required={false}
            contentEditable={false}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default BusinessDetails;
