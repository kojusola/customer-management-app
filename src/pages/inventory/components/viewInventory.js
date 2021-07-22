import React,{ useRef , useState} from "react";
import StyledSearchBar from 'components/StyledSearchBar/StyledSearchBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box  from "@material-ui/core/Box";
import InventoryShoe from 'assets/images/inventoryShoe.png';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor: theme.palette.secondary.background,
        margin: "10px",
        padding: "0",
        fontFamily: theme.custom.typography,
    },
    submit: {
        width: '260px',
        height: '48px',
        margin: theme.spacing(3, 0, 1),
        overflowY:'hidden',
        textTransform: 'none'
      },
    label:{
        fontSize: "12px",
        color:theme.palette.button.progress,
        marginTop:"4px"
    },
    uploadImage:{
        backgroundImage:`url(${InventoryShoe})`,
        backgroundRepeat: "no-repeat",
        backgroundSize:"contain",
        height:"180px",
    }

}))

function  ViewInventory({setInventoryPage}) {
    const classes = useStyles()
    const inputRef = useRef(null);
    const [openOptions, setOpenOptions] = useState(false)
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
                    borderRadius:"5px",
                    paddingBottom:"0"
                }}>
                    <StyledSearchBar
                    label="Search Product"
                    />
                </Box>
                <Box style={{
                    position: "relative",
                    color:"#513166",
                }}>
                    <button
                    onClick={() => {
                    setOpenOptions(!openOptions)
                    }}
                    style={{backgroundColor:"#EEEBF0",
                        padding:"5px",
                        border:0,
                        display:"block",
                        color:"#513166",}}>
                        <MoreVertIcon />
                    </button>
                    
                  {
                      openOptions === true && (
                        <Box style={{
                        backgroundColor:"#FFFFFF",
                        padding:"15px",
                        color:"#513166",
                        display:"block",
                        position:"absolute",
                        right:"20px",
                        top:"0",
                        zIndex:"50"
                    }}>
                        <button style={{
                        backgroundColor:"#FFFFFF",
                        padding:"5px",
                        border:0,
                        display:"block",
                        color:"#513166",
                        }}>Edit</button>
                        <button style={{
                        backgroundColor:"#FFFFFF",
                        padding:"5px",
                        border:0,
                        display:"block",
                        color:"#513166",
                        }}>Archive</button>
                        <button style={{
                        backgroundColor:"#FFFFFF",
                        padding:"5px",
                        border:0,
                        display:"block",
                        color:"#513166",
                        }}>Delete</button>
                    </Box>
                      )
                  }
                </Box>
            </Box>
            <Box display="flex" pt={2} style={{
                justifyContent:"space-between"
            }}>
                <Box  width="35%">
                    <Box pb={3}>
                    <label className={classes.label}>Product Name</label>
                    <Typography>Shoe 1</Typography>
                    </Box>
                    <Box pb={3}>
                    <label className={classes.label}>Description</label>
                    <Typography>Italian C</Typography>
                    </Box>
                    <Box pb={3}>
                    <label className={classes.label}>Length(cm)</label>
                    <Typography>15</Typography>
                    </Box>
                    <Box pb={3}>
                    <label className={classes.label}>Height(cm)</label>
                    <Typography>4</Typography>
                    </Box>
                    <Box pb={3}>
                    <label className={classes.label}>Width(cm)</label>
                    <Typography>5</Typography>
                    </Box>
                </Box>
                <Box width="20%">
                    <Box pb={3}>
                    <label className={classes.label}>Amount(N)</label>
                    <Typography>5,750</Typography>
                    </Box>
                    <Box pb={3}>
                    <label className={classes.label}>In Stock</label>
                    <Typography>274</Typography>
                    </Box>
                    <Box pb={3}>
                    <label className={classes.label}>Weight(kg)</label>
                    <Typography>0.2</Typography>
                    </Box>
                    <Box pb={3}>
                    <label className={classes.label}>Variant</label>
                    <Typography>43 | Brown</Typography>
                    </Box>
                </Box>
                <Box width="40%" onClick={() => inputRef.current.click()}>
                    <label className={classes.label}>Image</label>
                    <Box  className={classes.uploadImage}> 
                    </Box>
                    <Box style={{
                        border:"1px solid #513166",
                        height:"200px",
                        borderRadius:"2px",
                    }}>
                    <Box display="flex" width="100%" style={{textAlign:"center", alignItems:"center", justifyContent:"center"}}>
                    <label className={classes.label} style={{textAlign:"center"}}>Restock History</label>
                    </Box>
                    
                    <Box py={1} display="flex" style={{
                        alignItems:"center"
                    }}>
                        <Box width="36%">
                            <Typography style={{
                                fontSize:"13px",
                                margin:"auto",
                                paddingLeft:"5px"
                            }}>DATE</Typography>
                        </Box>
                        <Box width="30%" style={{
                                fontSize:"13px"
                            }}>
                            <Typography style={{
                                fontSize:"13px"
                            }}>OLD STOCK</Typography>
                        </Box>
                        <Box width= "34%" >
                            <Typography style={{
                                fontSize:"13px"
                            }}>ADDED STOCK</Typography>
                        </Box>
                    </Box>
                    <Box py={1} display="flex">
                        <Box px={1} width="36%">
                        <label className={classes.label}>01/06/2021</label>
                        </Box>
                        <Box px={1} width="30%" style={{
                                fontSize:"13px"
                            }}>
                            <label className={classes.label}>50</label>
                        </Box>
                        <Box px={1} width= "34%" >
                        <label className={classes.label}>200</label>
                        </Box>
                    </Box>
                    </Box>    
                </Box>
            </Box>
            <Box display="flex" width="100%" style={{textAlign:"center", alignItems:"center", justifyContent:"center"}}>
            <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
            setInventoryPage("full")
            }}
            >
            <ChevronLeftIcon/>
            Return to Product Homepage
            </Button>
            </Box>
        </Box>
    )
};

export default ViewInventory;