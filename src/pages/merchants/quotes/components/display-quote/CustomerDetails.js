import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import StyledTextField from 'components/StyledTextField/StyledTextField';
import makeStyles from '@material-ui/core/styles/makeStyles';



const useStyles = makeStyles(theme => ({
    subContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    subtopicText: {
        fontSize: '20px',
        color: theme.palette.secondary.subtopic,
    },
    subSubtopicText: {
        fontSize: '16px',
        color: theme.palette.secondary.subtopic,
    },
    inputContainer: {
        border: '1px solid #CBC2D1',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
    },
}))

function CustomerDetails({ customer }) {
    const classes = useStyles();

    return (
        <Box width="100%">
            <Typography className={classes.subtopicText} color="textPrimary" >Customer Details</Typography>
            <Box width="100%" className={classes.subContainer}>
                <Grid container spacing={1}>
                    <Grid item md={4} xs={12}>
                        <StyledTextField
                            margin="normal"
                            id="customer"
                            label="Chosen Customer"
                            type="text"
                            name="customer"
                            autoComplete="customer"
                            required={false}
                            contentEditable={false}
                            value={`${customer?.user?.first_name} ${customer?.user?.last_name}` || ''}
                        />
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <Box style={{ marginTop: "13px", padding: "20px" }} className={classes.inputContainer}>
                            <Grid container spacing={1}>
                                <Grid item md={6} xs={12}>
                                    <Typography className={classes.subSubtopicText} color="textPrimary" >Customer Details</Typography>
                                    <Box width="100%" className={classes.subContainer}>
                                        <Box width="48%">
                                            <StyledTextField
                                                margin="normal"
                                                id="firstname"
                                                label="First Name"
                                                type="text"
                                                name="firstname"
                                                required={false}
                                                contentEditable={false}
                                                value={customer?.user?.first_name || ''}
                                            />
                                        </Box>
                                        <Box width="48%">
                                            <StyledTextField
                                                margin="normal"
                                                id="lastname"
                                                label="Last Name"
                                                type="text"
                                                name="lastname"
                                                autoComplete="lastname"
                                                required={false}
                                                contentEditable={false}
                                                value={customer?.user?.last_name || ''}
                                            />
                                        </Box>
                                    </Box>
                                    <Box width="100%">
                                        <StyledTextField
                                            margin="normal"
                                            id="email"
                                            label="Email Address"
                                            type="text"
                                            name="email"
                                            autoComplete="email"
                                            required={false}
                                            contentEditable={false}
                                            value={customer?.user?.email || ''}
                                        />
                                    </Box>
                                    <Box width="100%">
                                        <StyledTextField
                                            margin="normal"
                                            id="phone"
                                            label="Phone Address"
                                            type="text"
                                            name="phone"
                                            autoComplete="phone"
                                            required={false}
                                            contentEditable={false}
                                            value={customer?.user?.phone_number || ''}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Typography className={classes.subSubtopicText} color="textPrimary">Billing</Typography>
                                    <Box>
                                        <StyledTextField
                                            margin="normal"
                                            id="address"
                                            label="Address"
                                            type="text"
                                            name="address"
                                            autoComplete="address"
                                            required={false}
                                            contentEditable={false}
                                            value={customer?.user?.address || ''}
                                        />
                                    </Box>
                                    <Box width="100%" className={classes.subContainer}>
                                        <Box width="48%">
                                            <StyledTextField
                                                margin="normal"
                                                id="city"
                                                label="City"
                                                type="text"
                                                name="city"
                                                autoComplete="city"
                                                required={false}
                                                contentEditable={false}
                                                value={customer?.user?.city || ''}
                                            />
                                        </Box>
                                        <Box width="48%">
                                            <StyledTextField
                                                margin="normal"
                                                id="state"
                                                label="State"
                                                type="text"
                                                name="state"
                                                required={false}
                                                contentEditable={false}
                                                value={customer?.user?.state || ''}
                                            />
                                        </Box>
                                    </Box>
                                    <Box>
                                        <StyledTextField
                                            margin="normal"
                                            id="postal"
                                            label="Postal/Zip code"
                                            type="text"
                                            name="postal"
                                            required={false}
                                            contentEditable={false}
                                            value={customer?.user?.postal_code || ''}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                </Grid>


            </Box>
        </Box>
    )
}

export default CustomerDetails
