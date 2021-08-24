import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined'

import TotalPurchase from "assets/icons/totalPurchase.svg";
import DashboardLogo from "assets/icons/DashboardIcon.svg";
import TotalRevenue from "assets/icons/totalRevenue.svg";
import TotalProfit from "assets/icons/totalProfit.svg";
import QuoteSent from "assets/icons/quotesSent.svg";
import HighInDemand from "assets/icons/highInDemand.svg";
import LowInDemand from "assets/icons/lowInDemand.svg";
import SingleSummary from "./components/SingleSummary";
import LowInStock from "./components/LowInStock";
import Demand from "./components/HighInDemand";
import { useMediaQueries } from 'helpers';



const useStyles = makeStyles(theme => ({
    dashboardTopic: {
        backgroundColor: theme.custom.sidenav.background,
        marginTop: '25px',
        borderRadius: '12px',
        display: "flex",
        justifyContent: "space-between"
    },
    topicText: {
        fontSize: 28,
        fontWeight: '600',
        color: theme.palette.primary.main,
    },
    subTopicText: {
        fontSize: 20,
        color: theme.palette.button.progress,
    },
    summaryContainer: {
        display: "flex",
        justifyContent: "space-between"
    },
    analyticsBox: {
        backgroundColor: theme.palette.primary.main,
        boxShadow: "0px 2px 12px #0000001F",
        borderRadius: "8px",
    },
    analyticsText: {
        fontSize: "24px",
        color: "#FFFFFF"
    },
    containerAnalytics: {
        justifyContent: "space-between"
    },
    customerContainer: {
        alignItems: "center",
        color: theme.palette.primary.main,
        backgroundColor: "#FFFFFF",
        boxShadow: '0px 3px 6px #00000029',
        border: '1px solid #EEEBF0',
        borderRadius: '6px',
        padding: "10px",
        display: 'flex',
        flexDirection: 'column',
    },
    customerText: {
        display: "flex",
        alignItems: "center",
        fontSize: "15px"
    },
    figure: {
        justifyText: "center",
        fontSize: "20px",
        letterSpacing: "5px",
        marginTop: "7px"
    }
}))

function Dashboard() {
    const classes = useStyles();
    const { xsAndDown, lgAndUp, smAndDown } = useMediaQueries();
    return (
        <Box width="100%">
            <Box className={classes.dashboardTopic} p={xsAndDown ? '15px' : '15px 30px'}>
                <Box pt={xsAndDown ? 0 : '10px'}>
                    <Typography className={classes.topicText}>Dashboard</Typography>
                    <Typography className={classes.subTopicText} style={{ fontSize: xsAndDown ? 15 : 20 }}>View analytics and business summary</Typography>
                </Box>
                <img style={{ height: 90 }} src={DashboardLogo} alt="duplicate quote"></img>
            </Box>
            <Box pt={7} >
                <Grid container spacing={lgAndUp ? 4 : 2}>
                    <Grid item md={3} sm={6} xs={12}>
                        <SingleSummary
                            logo={TotalPurchase}
                            topic="Total Purchase"
                            figure="6,312"
                        />
                    </Grid>
                    <Grid item md={3} sm={6} xs={12}>
                        <SingleSummary
                            logo={TotalRevenue}
                            topic="Total Revenue"
                            figure="757,440"
                            symbol="N"
                        />
                    </Grid>
                    <Grid item md={3} sm={6} xs={12}>
                        <SingleSummary
                            logo={TotalProfit}
                            topic="Total Profit"
                            figure="757, 440"
                            symbol="N"
                        />
                    </Grid>
                    <Grid item md={3} sm={6} xs={12}>
                        <SingleSummary
                            logo={QuoteSent}
                            topic="Quote Sent"
                            figure="726"
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box mt={7} className={classes.analyticsBox} p={smAndDown ? '10px' : '40px'}>
                <Box display="flex" className={classes.containerAnalytics} mt={smAndDown ? '10px' : 0} alignItems="center">
                    <Typography className={classes.analyticsText}>ANALYTICS</Typography>
                    <Box className={classes.customerContainer}>
                        <Typography className={classes.customerText}>
                            <PersonOutlineOutlinedIcon /> Customers
                        </Typography>
                        <Typography className={classes.figure}>1,058</Typography>
                    </Box>
                </Box>
                <Box mt={7} >
                    <Grid container spacing={1}>
                        <Grid item lg={4} md={6} xs={12}>
                            <LowInStock />
                        </Grid>
                        <Grid item lg={8} md={6} xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Demand
                                        demand={HighInDemand}
                                        topic="HIGH IN DEMAND"
                                    />
                                </Grid>
                                <Grid item xs={12}>

                                    <Demand
                                        demand={LowInDemand}
                                        topic="LOW IN DEMAND"
                                    />
                                </Grid>
                            </Grid>



                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}

export default Dashboard