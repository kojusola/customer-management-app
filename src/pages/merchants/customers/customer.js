import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from 'react-router-dom';

import { Spinner, StyledTextField } from "components";

import makeStyles from '@material-ui/core/styles/makeStyles';

import { useParams } from 'react-router-dom';
import { useData } from "data";

const useStyles = makeStyles(theme => ({
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main
    },
    text: {
        color: theme.palette.primary.main
    },
    box: {
        border: `solid 1px ${theme.palette.primary.main}`,
        borderRadius: 10,
        padding: 10,
        paddingBottom: 80
    }
}))



function Customer() {
    const { id } = useParams()

    const { data, isLoading } = useData(`customers/${id}`);

    const classes = useStyles();


    if (isLoading) return <Box display="flex" justifyContent="center">
        <Spinner />
    </Box>

    return (
        <Box>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Link color="inherit" to="/customers" className={classes.link}>
                    Customers
                </Link>
                <Typography color="textPrimary">{`${data?.data?.customer?.user?.first_name} ${data?.data?.customer?.user?.last_name}`}</Typography>
            </Breadcrumbs>
            <Box mt={8} className={classes.box}>
                <Box mb={2}>
                    <Typography className={classes.text}>Contact details</Typography>
                </Box>
                <Grid container spacing={1}>
                    <Grid item sm={6} xs={12}>
                        <StyledTextField
                            label="First name"
                            value={data?.data?.customer?.user?.first_name || ''}
                            required={false}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <StyledTextField
                            label="Last name"
                            value={data?.data?.customer?.user?.last_name || ''}
                            required={false}
                        />
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Grid container spacing={1}>
                        <Grid item sm={6} xs={12}>
                            <StyledTextField
                                label="Email address"
                                value={data?.data?.customer?.user?.email || ''}
                                required={false}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <StyledTextField
                                label="Phone number"
                                value={data?.data?.customer?.user?.phone_number || ''}
                                required={false}
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Box mb={2} mt={4}>
                    <Typography className={classes.text}>Billing</Typography>
                </Box>
                <Grid container spacing={1}>
                    <Grid item sm={6} xs={12}>
                        <StyledTextField
                            label="Address"
                            value={data?.data?.customer?.user?.address || ''}
                            required={false}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <StyledTextField
                            label="City"
                            value={data?.data?.customer?.user?.city || ''}
                            required={false}
                        />
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Grid container spacing={1}>
                        <Grid item sm={6} xs={12}>
                            <StyledTextField
                                label="State"
                                value={data?.data?.customer?.user?.state || ''}
                                required={false}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <StyledTextField
                                label="Postal/Zip code"
                                value={data?.data?.customer?.user?.postal_code || ''}
                                required={false}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}

export default Customer
