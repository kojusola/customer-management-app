import React from "react";
import StyledSearchBar from 'components/StyledSearchBar/StyledSearchBar';
import { makeStyles } from '@material-ui/core/styles';
import Box  from "@material-ui/core/Box";
import InventoryShoe from 'assets/images/inventoryShoe.png';
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
      continueButton:{
        border: '0',
        backgroundColor: theme.palette.button.main,
        color:  "#FFFFFF",
        fontSize: "11px",
        fontWeight: "600",
        borderRadius: "4px",
        paddingTop:"9px",
        paddingBottom:"9px",
        width: '150px',
        height: '36px',
    },
    label:{
        fontSize: "12px",
        color:theme.palette.button.progress,
    },
    arrowStyle:{
        display:"flex",
        flexDirection:"column",
        width: "16px",
        margin:"0 3px 0"
    },
    uploadImage:{
        backgroundImage:`url(${InventoryShoe})`,
        backgroundRepeat: "no-repeat",
        backgroundSize:"contain",
        height:"55px",
    }

}))

function  AllInventory({setInventoryPage}) {
    const classes = useStyles();
    
    return (
        <Box className={classes.background}>
            <Box  w="100%" style={{
                padding:"15px",
                display:"flex",
                justifyContent:"space-between",
                backgroundColor:"#EEEBF0",
                color:"#FFFFFF"
            }}>
                 <Box bgcolor="#FFFFFF" p={0} m={0} style={{
                    padding:"0",
                    borderRadius:"4px"
                }}>
                    <StyledSearchBar
                    label="Search Product"
                    />
                </Box>
                <button  
                onClick={() => {
                    setInventoryPage("create")
                    }}
                className={classes.continueButton}>
                Add New Product
                </button>
            </Box>
            <Box my={2} p={2} pb={2} bgcolor="#EEEBF0" display="flex" style={{
                alignItems:"center",
                borderRadius:"8px"
            }}>
                <Box width="20%">
                    <label className={classes.label}>Image</label>
                </Box>
                <Box width="20%">
                    <label className={classes.label}>Product Name</label>
                </Box>
                <Box width="20%">
                <label className={classes.label} style={{
                        display:"flex",
                        alignItems:"center"
                    }}><span>In stock </span>
                    <span className={classes.arrowStyle}>
                    <button style={{
                        border:"0",
                        padding:"0",
                        margin:"0",
                        width:"10px",
                        height:"9px",
                        backgroundColor:"#EEEBF0"
                    }}><svg
                    style={{
                        width:"10px",
                        height:"10px",
                        padding:"0",
                        margin:"0",
                        color:"#513166",
                    }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#513166" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg></button>
                    <button
                    style={{
                        border:"0",
                        padding:"0",
                        margin:"0",
                        width:"10px",
                        height:"9px",
                        color:"#513166",
                        backgroundColor:"#EEEBF0"
                    }}><svg  style={{
                        width:"10px",
                        height:"10px",
                        padding:"0",
                        margin:"0",
                        color:"#513166"
                    }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#513166" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                        </button>
                    </span></label>
                </Box>
                <Box width="20%">
                <label className={classes.label} style={{
                        display:"flex",
                        alignItems:"center"
                    }}><span>Selling Price</span>
                    <span className={classes.arrowStyle}>
                    <button style={{
                        border:"0",
                        padding:"0",
                        margin:"0",
                        width:"10px",
                        height:"9px",
                        backgroundColor:"#EEEBF0"
                    }}><svg
                    style={{
                        width:"10px",
                        height:"10px",
                        padding:"0",
                        margin:"0",
                        color:"#513166",
                    }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#513166" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg></button>
                    <button
                    style={{
                        border:"0",
                        padding:"0",
                        margin:"0",
                        width:"10px",
                        height:"9px",
                        color:"#513166",
                        backgroundColor:"#EEEBF0"
                    }}><svg  style={{
                        width:"10px",
                        height:"10px",
                        padding:"0",
                        margin:"0",
                        color:"#513166"
                    }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#513166" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                        </button>
                    </span></label>
                </Box>
                <Box width="20%">
                 <label className={classes.label}>Amount Sold</label>
                </Box>
            </Box>
            <button
            onClick={() => {
            setInventoryPage("view")
            }}
            style={{
            backgroundColor: "#FFFFFF",
            border:"0",
            width:"100%"
            }}>
            <Box  bgcolor="#F5F5F5" display="flex" style={{
                alignItems:"center",
                borderRadius:"8px",
                boxShadow: "0px 2px 6px #00000080",
                padding:"4px"

            }}>
                <Box width="20%" className={classes.uploadImage}></Box>
                <Box width="20%">
                    <label className={classes.label} style={{
                    paddingLeft:"6px"
                    }}>Shoe 1</label>
                </Box>
                <Box width="20%">
                    <label className={classes.label}>274</label>
                </Box>
                <Box width="20%">
                    <label className={classes.label}>N5750.00</label>
                </Box>
                <Box width="20%">
                    <label className={classes.label}>15 | 4 | 6</label>
                </Box>
            </Box>
            </button>
        </Box>
    );
}

export default AllInventory;