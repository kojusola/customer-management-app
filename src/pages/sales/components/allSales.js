import React from "react";
import StyledSearchBar from 'components/StyledSearchBar/StyledSearchBar';
import { makeStyles } from '@material-ui/core/styles';
import Box  from "@material-ui/core/Box";
// import Fade from '@material-ui/core/Fade';
// import CircularProgress from '@material-ui/core/CircularProgress';



const useStyles = makeStyles((theme) => ({
      continueButton:{
        border: '0',
        backgroundColor: theme.palette.success.background,
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

}))

function  AllInventory({setSalePage}) {
    const classes = useStyles();
    
    return (
        <Box className={classes.background}>
            <Box  w="105%" style={{
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
                    label="Search"
                    />
                </Box>
                <button  
                onClick={() => {
                    setSalePage("create")
                    }}
                className={classes.continueButton}>
                Make A New Sale
                </button>
            </Box>
            <Box my={2} p={2} pb={2} bgcolor="#EEEBF0" display="flex" style={{
                alignItems:"center",
                borderRadius:"8px"
            }}>
                <Box width="19%" style={{
                    display:"flex",
                    justifyContent:"center"
                }}>
                    <label className={classes.label}>Order Reference</label>
                </Box>
                <Box width="31%"  style={{
                    display:"flex",
                    justifyContent:"center"
                }}>
                    <label className={classes.label}>Customer</label>
                </Box>
                <Box width="33%"  style={{
                    display:"flex",
                    justifyContent:"center"
                }}>
                    <label className={classes.label}>Date of Order</label>
                </Box>
                <Box width="17%"  style={{
                    display:"flex",
                    justifyContent:"center"
                }}>
                 <label className={classes.label}>Amount</label>
                </Box>
            </Box>
            <Box p={2} pb={1} display="flex" style={{
                alignItems:"center",
                borderBottom:"1px solid #707070"

            }}>
                <Box width="19%"  style={{
                    display:"flex",
                    justifyContent:"center"
                }}>
                    <label className={classes.label} >20320211-0023</label>
                </Box>
                <Box width="31%"  style={{
                    display:"flex",
                    justifyContent:"center"
                }}>
                    <label className={classes.label}>Deanmaj Enterprise</label>
                </Box>
                <Box width="33%"  style={{
                    display:"flex",
                    justifyContent:"center"
                }}>
                    <label className={classes.label}>11/02/2032 09:37AM</label>
                </Box>
                <Box width="17%"
                 style={{
                    display:"flex",
                    justifyContent:"center"
                }}>
                    <label className={classes.label}>N5750.00</label>
                </Box>
            </Box>
        </Box>
    );
}

export default AllInventory;