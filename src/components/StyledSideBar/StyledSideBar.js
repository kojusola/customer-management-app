import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import BnLogo from "assets/icons/favicon-32x32.png";
import Typography from '@material-ui/core/Typography';
import HomeLogo from "assets/icons/icon-home.svg";
import PurchaseLogo from "assets/icons/icon-purchase.svg";
import ReportLogo from "assets/icons/icon-report.svg";
import SalesLogo from "assets/icons/icon-sales.svg";
import SettingsLogo from "assets/icons/icon-settings.svg";
import StockLogo from "assets/icons/icon-stock.svg";
import Box  from "@material-ui/core/Box";
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor: theme.palette.secondary.background,
        margin: "0",
        padding: "0",
        fontFamily: theme.custom.typography,
        height:"100vh"
    },
    iconLogo :{
        padding: theme.spacing(1, 5, 4)
    },
    logos:{
        height: "17px",
        width: "17px",
        margin: theme.spacing(0, 1, 0)
    },
    sideText:{
        fontFamily: theme.custom.typography,
        fontSize: "13px",
        color: theme.palette.success.background
    },
    hoveredStyle:{
        backgroundColor: '#000000'
    }
}))

function SideBar() {
    const classes = useStyles();
    return (
        <Container className={classes.root}>
          <Container>
          <Box className={classes.iconLogo}>
                <img src={BnLogo} alt="logo"></img>
            </Box>
            <Box mt={2}>
                <Box display="flex" alignItems="center" my={1} py={1} width= {120}>
                    <img src={HomeLogo} alt="Home Logo" className={classes.logos}></img>
                    <Typography className={classes.sideText}>Home</Typography>
                </Box>
                <Box display="flex" my={1} py={1} width= {120}
                style={{
                    backgroundColor: "#D5CEDA"
                }}>
                    <img src={SalesLogo} alt="Quotes Logo" className={classes.logos}></img>
                    <Typography className={classes.sideText}>Quotes</Typography>
                </Box>
                <Box display="flex" my={1} py={1} width= {120}>
                    <img src={PurchaseLogo} alt="Purchase Logo" className={classes.logos}></img>
                    <Typography className={classes.sideText}>Sales</Typography>
                </Box>
                <Box display="flex" my={1} py={1} width= {120}>
                    <img src={StockLogo } alt="InventoryLogo" className={classes.logos}></img>
                    <Typography className={classes.sideText}>Inventory</Typography>
                </Box>
                <Box display="flex" my={1} py={1} width= {120}>
                    <img src={StockLogo } alt="InventoryLogo" className={classes.logos}></img>
                    <Typography className={classes.sideText}>Customers</Typography>
                </Box>
                <Box display="flex" my={1} py={1} width= {120}>
                    <img src={ReportLogo} alt="Reports Logo" className={classes.logos}></img>
                    <Typography className={classes.sideText}>Reports</Typography>
                </Box>
                <Box display="flex" my={1} py={1} width= {120}>
                    <img src={SettingsLogo} alt="Settings Logo" className={classes.logos}></img>
                    <Typography className={classes.sideText}>Settings</Typography>
                </Box>
            </Box>
          </Container>
        </Container>
    );
}

export default SideBar;