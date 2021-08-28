import React from "react";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import InventoryShoe from 'assets/images/inventoryShoe.png';
import Grid from '@material-ui/core/Grid';

import useMediaQuery from '@material-ui/core/useMediaQuery';


import { Spinner } from "components";
import ImageUpload from 'assets/icons/imageBackground.svg';


import { useParams, useHistory } from 'react-router-dom';
import { useData } from "data";
import { moneyFormatter } from "helpers";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.secondary.background,
        margin: "10px",
        padding: "0",
        fontFamily: theme.custom.typography,
    },
    submit: {
        width: '260px',
        height: '48px',
        margin: theme.spacing(3, 0, 1),
        overflowY: 'hidden',
        textTransform: 'none'
    },
    label: {
        fontSize: "12px",
        color: theme.palette.button.progress,
        marginTop: "4px"
    },
    uploadImage: {
        backgroundImage: `url(${InventoryShoe})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        height: "180px",
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main
    },
    menuButton: {
        textTransform: 'capitalize',
        '&.MuiButton-text': {
            padding: '4px 16px'
        }
    }

}))

function Inventory() {
    const classes = useStyles()
    const { id } = useParams();

    const { location: { state } } = useHistory();

    const theme = useTheme();
    const isMedUp = useMediaQuery(theme.breakpoints.up('md'));

    const { data, isLoading } = useData(`products/${id}`);

    if (isLoading) return <Box display="flex" justifyContent="center">
        <Spinner />
    </Box>

    return (
        <Box className={classes.background} style={{ padding: isMedUp ? '0px 30px' : 0 }}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Link color="inherit" to={state?.from === '/dashboard' ? '/dashboard' : '/inventory'} className={classes.link}>
                    {state?.from === "/dashboard" ? "Dashboard" : "Inventory"}
                </Link>
                <Typography color="textPrimary">{data?.data?.name}</Typography>
            </Breadcrumbs>
            <Box mt={8} >
                <Grid container spacing={1}>
                    <Grid item md={8} xs={12}>
                        <Grid container spacing={1}>
                            <Grid item md={8} xs={12}>
                                <Box pb={3}>
                                    <label className={classes.label}>Product Name</label>
                                    <Typography>{data?.data?.name}</Typography>
                                </Box>
                                <Box pb={3}>
                                    <label className={classes.label}>Description</label>
                                    <Typography>{data?.data?.description || 'N/A'}</Typography>
                                </Box>
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item md={12} xs={6}>
                                        <Box pb={3}>
                                            <label className={classes.label}>Selling Price(N)</label>
                                            <Typography>{moneyFormatter(data?.data?.unit_price)}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item md={12} xs={6}>
                                        <Box pb={3}>
                                            <label className={classes.label}>Currently in stock</label>
                                            <Typography>{data?.data?.quantity}</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container spacing={1}>
                            <Grid item md={8} xs={6}>
                                <Box pb={3}>
                                    <label className={classes.label}>Length(cm)</label>
                                    <Typography>{data?.data?.dimensions?.length || 'N/A'}</Typography>
                                </Box>
                            </Grid>
                            <Grid item md={4} xs={6}>
                                <Box pb={3}>
                                    <label className={classes.label}>Cost Price(N)</label>
                                    <Typography>{moneyFormatter(data?.data?.cost_price)}</Typography>
                                </Box>
                            </Grid>
                            <Grid item md={8} xs={6}>
                                <Box pb={3}>
                                    <label className={classes.label}>Height(cm)</label>
                                    <Typography>{data?.data?.dimensions?.height || 'N/A'}</Typography>
                                </Box>
                            </Grid>
                            <Grid item md={4} xs={6}>
                                <Box pb={3}>
                                    <Typography className={classes.label}>Variants</Typography>
                                    <Typography>{data?.data?.variant?.color || 'N/A'} | {data?.data?.variant?.size || 'N/A'}</Typography>
                                </Box>
                            </Grid>
                            <Grid item md={8} xs={6}>
                                <Box pb={3}>
                                    <label className={classes.label}>Width(cm)</label>
                                    <Typography>{data?.data?.dimensions?.width || 'N/A'}</Typography>
                                </Box>
                            </Grid>
                            <Grid item md={4} xs={6}>
                                <Box pb={3}>
                                    <label className={classes.label}>Overall quantity sold</label>
                                    <Typography>{data?.data?.overall_quantity_sold}</Typography>
                                </Box>
                            </Grid>
                            <Grid item md={8} xs={6}>
                                <Box pb={3}>
                                    <label className={classes.label}>Weight(kg)</label>
                                    <Typography>{data?.data?.weight || 'N/A'}</Typography>
                                </Box>
                            </Grid>
                            <Grid item md={4} xs={6}>
                                <Box pb={3}>
                                    <label className={classes.label}>Overall quantity stocked</label>
                                    <Typography>{data?.data?.overall_quantity}</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Box mb="20px" display="flex" flexDirection="column" alignItems="center" justifyContent="center" >
                            <img height="150px" width="90%" src={data?.data?.images?.[0]?.url || ImageUpload} alt="upload" />
                        </Box>
                    </Grid>
                </Grid>

            </Box>
        </Box>
    )
};

export default Inventory;