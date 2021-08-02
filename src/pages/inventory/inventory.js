import React, { useState} from "react";
import StyledSideBar from 'components/StyledSideBar/StyledSideBar';
import CreateInventory from './components/createInventory';
import ViewInventory from './components/viewInventory';
import AllInventory from './components/allInventory';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box  from "@material-ui/core/Box";
import EmptyQuotes  from "assets/icons/EmptyQuotes.svg";
import Button from '@material-ui/core/Button';
// import Fade from '@material-ui/core/Fade';
// import CircularProgress from '@material-ui/core/CircularProgress';



const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor: theme.palette.secondary.background,
        margin: "0",
        padding: "0",
        fontFamily: theme.custom.typography,
        height:"100vh"
    },
    sideBackground:{
        backgroundColor: "#FFFFFF",
        height:"100vh",
        display:"flex",
        flexDirection:"column",
        overflowY:"hidden"
    },
    topicText:{
        fontSize: "13px",
        color: "000000"
    },
    emptyQuotesLogo:{
        width:"200px",
        height: "250"
    },
    emptyQuotesTopic:{
        color:theme.custom.secondary.main,
        fontSize: "20px",
        fontWeight: "600"
    },
    emptyQuotesText:{
        color:theme.palette.button.progress,
        fontSize: "12px",
        width: "450px",
        margin: "auto",
        textAlign: "center",
    },
    submit: {
        width: '360px',
        height: '48px',
        margin: theme.spacing(3, 0, 1),
        overflowY:'hidden',
        textTransform: 'none'
      },

}))

function  Inventory() {
    const classes = useStyles();
    const [inventoryPage, setInventoryPage] = useState('empty');
    return (
        <Box container className={classes.root} style={{
            display:"flex"
        }}>
        <Box  width={160} style={{
            flexShrink:"0"
        }} >
            <StyledSideBar/>
        </Box>
        <Box width="100%" className={classes.sideBackground}>
            <Box py={2} w="100%" style={{
                backgroundColor: "#EEEBF0",
                textAlign : "center",
                flexShrink:"0"
            }}>
                <Typography className={classes.topicText}>Inventory</Typography>
            </Box>
           <Box 
           style={{
               overflowY:"auto",
               height:"100%",
           }}>
            {
                inventoryPage === "empty" && (
                    <Box mt={3} style={{
                    display:"flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <img src={EmptyQuotes} alt="Empty Quotes" className={classes.emptyQuotesLogo}></img>
                    <Typography className= {classes.emptyQuotesTopic}>No Product Yet!</Typography>
                    <Typography className ={classes.emptyQuotesText}>It appears as though you haven't added any product yet. Fill your Inventory now.</Typography>
                    <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => {
                    setInventoryPage("create")
                    }}
                    >
                    Add Your First Product
                    </Button>
                    </Box>
                )
            }
            
            {
                inventoryPage === "create" && (
                    <Box mt={2} pb={2} height="100%" style={{
                    display:"flex",
                    flexDirection: "column",
                    padding:"20px",
                    paddingBottom:"40px"
                }}>
                    <CreateInventory
                        setInventoryPage={setInventoryPage}
                    />
                    </Box>
                )
            }
            {
                inventoryPage === "view" && (
                    <Box mt={2} pb={2} height="100%" style={{
                    display:"flex",
                    flexDirection: "column",
                    padding:"20px",
                    paddingBottom:"40px"
                }}>
                    <ViewInventory
                        setInventoryPage={setInventoryPage}
                    />
                    </Box>
                )
            }
            {
            inventoryPage === "full" && (
                <Box mt={2} pb={2} height="100%" style={{
                display:"flex",
                flexDirection: "column",
                padding:"20px",
                paddingBottom:"40px"
            }}>
                <AllInventory
                    setInventoryPage={setInventoryPage}
                />
                </Box>
            )
            }
           </Box>
        </Box>
        </Box>
    );
}

export default Inventory;