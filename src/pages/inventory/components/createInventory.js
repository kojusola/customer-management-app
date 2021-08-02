import React,{ useRef } from "react";
import StyledSearchBar from 'components/StyledSearchBar/StyledSearchBar';
import { makeStyles } from '@material-ui/core/styles';
import Box  from "@material-ui/core/Box";
import StyledTextField from 'components/StyledTextField/StyledTextField';
import ImageUpload from 'assets/icons/imageBackground.svg';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor: theme.palette.secondary.background,
        margin: "10px",
        padding: "0",
        fontFamily: theme.custom.typography,
    },
    
    sideBackground:{
        backgroundColor: "#FFFFFF"
    },
    topicText:{
        fontSize: "13px",
        color: "000000"
    },
    submit: {
        width: '260px',
        height: '48px',
        margin: theme.spacing(3, 0, 1),
        overflowY:'hidden',
        textTransform: 'none'
      },
      cancelButton:{
          border: "1px solid #513166",
          borderRadius:"12px",
          backgroundColor: "#FFFFFF",
          color: theme.palette.button.main,
          fontSize: "13px",
          padding: "10px",
          textAlign:"center",
      },
      continueButton:{
        border: '0',
        backgroundColor:theme.palette.button.main,
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
        marginTop:"4px"
    },
    sideFieldsText:{
        marginTop:"5px"
    },
    longSideFieldsText:{
        marginTop:"5px",
        "& .MuiInputBase-root": {
            height: 146,
            "& input": {
                textAlign: "center"
              }
          }
    },
    arrowStyle:{
        display:"flex",
        flexDirection:"column",
        width: "16px",
        margin:"0 3px 0"
    },
    uploadImage:{
        backgroundImage:`url(${ImageUpload })`,
        backgroundRepeat: "no-repeat",
        backgroundSize:"contain",
        height:"150px",
    }

}))

function  CreateInventory({setInventoryPage}) {
    const classes = useStyles()
    const inputRef = useRef(null);
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
                setInventoryPage("full")
                }}
                className={classes.continueButton}>
                Save Product
                </button>
            </Box>
            <Box display="flex" pt={2} style={{
                justifyContent:"space-between"
            }}>
                <Box  width="35%">
                    <Box pb={2}>
                    <label className={classes.label}>Product Name</label>
                    <StyledTextField
                        margin="normal"
                        id="productname"
                        label="Product name"
                        type="text"
                        name="productname"
                        className={classes.sideFieldsText}
                        InputLabelProps={{required:false}}
                        />
                    </Box>
                    <Box pb={2}>
                    <label className={classes.label}>Description</label>
                        <StyledTextField
                            margin="normal"
                            id="description"
                            label="Description"
                            type="text"
                            name="description"
                            className={classes.longSideFieldsText}
                            InputLabelProps={{required:false}}
                            multiline
                            row={6}
                            />
                        </Box>
                    <Box>
                        <label className={classes.label}>Length | Height | Width (cm)</label>
                        <Box display="flex" style={{
                            justifyContent:"space-between"
                        }}>
                           <Box width="30%">
                            <StyledTextField
                                margin="normal"
                                id="length"
                                label="Length"
                                type="text"
                                name="length"
                                className={classes.sideFieldsText}
                                InputLabelProps={{required:false}}
                                />
                           </Box>
                            <Box width="30%">
                                <StyledTextField
                                margin="normal"
                                id="height"
                                label="Height"
                                type="text"
                                name="height"
                                className={classes.sideFieldsText}
                                InputLabelProps={{required:false}}
                                />
                            </Box>
                            <Box width="30%">
                                <StyledTextField
                                margin="normal"
                                id="width"
                                label="Width"
                                type="text"
                                name="width"
                                className={classes.sideFieldsText}
                                InputLabelProps={{required:false}}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box width="24%">
                <Box pb={2}>
                    <label className={classes.label} style={{
                        display:"flex",
                        alignItems:"center"
                    }}><span>Amount </span>
                    <span className={classes.arrowStyle}>
                    <button style={{
                        border:"0",
                        padding:"0",
                        margin:"0",
                        width:"10px",
                        height:"9px",
                        backgroundColor:"#FFFFFF"
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
                        backgroundColor:"#FFFFFF"
                    }}><svg  style={{
                        width:"10px",
                        height:"10px",
                        padding:"0",
                        margin:"0",
                        color:"#513166"
                    }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#513166" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                        </button>
                    </span></label>
                    <StyledTextField
                        margin="normal"
                        id="amount"
                        label="Enter Price"
                        type="text"
                        name="amount"
                        className={classes.sideFieldsText}
                        InputLabelProps={{required:false}}
                        />
                    </Box>
                    <Box pb={2}>
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
                        backgroundColor:"#FFFFFF"
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
                        backgroundColor:"#FFFFFF"
                    }}><svg  style={{
                        width:"10px",
                        height:"10px",
                        padding:"0",
                        margin:"0",
                        color:"#513166"
                    }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#513166" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                        </button>
                    </span></label>
                        <StyledTextField
                            margin="normal"
                            id="instock"
                            label="Enter Number"
                            type="text"
                            name="instock"
                            className={classes.sideFieldsText}
                            InputLabelProps={{required:false}}
                            style={{
                                height:"50px"
                            }}
                            />
                        </Box>
                        <Box pb={2}>
                        <label className={classes.label} style={{
                        display:"flex",
                        alignItems:"center"
                        }}><span>Weight(kg)</span>
                        <span className={classes.arrowStyle}>
                        <button style={{
                            border:"0",
                            padding:"0",
                            margin:"0",
                            width:"10px",
                            height:"9px",
                            backgroundColor:"#FFFFFF"
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
                            backgroundColor:"#FFFFFF"
                        }}><svg  style={{
                            width:"10px",
                            height:"10px",
                            padding:"0",
                            margin:"0",
                            color:"#513166"
                        }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#513166" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                            </button>
                        </span></label>
                            <StyledTextField
                                margin="normal"
                                id="weight"
                                label="Enter Weight"
                                type="text"
                                name="weight"
                                className={classes.sideFieldsText}
                                InputLabelProps={{required:false}}
                                
                                />
                            </Box>
                    <Box>
                        <label className={classes.label} style={{
                            display:"flex",
                            alignItems:"center"
                        }}><span>Variant </span>
                        <span className={classes.arrowStyle}>
                        <button style={{
                            border:"0",
                            padding:"0",
                            margin:"0",
                            width:"10px",
                            height:"9px",
                            backgroundColor:"#FFFFFF"
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
                            backgroundColor:"#FFFFFF"
                        }}><svg  style={{
                            width:"10px",
                            height:"10px",
                            padding:"0",
                            margin:"0",
                            color:"#513166"
                        }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#513166" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                            </button>
                        </span></label>
                        <Box display="flex" style={{
                            justifyContent:"space-between"
                        }}>
                           <Box width="45%">
                            <StyledTextField
                                margin="normal"
                                id="entry"
                                label="New Entry"
                                type="text"
                                name="entry"
                                className={classes.sideFieldsText}
                                InputLabelProps={{required:false, style:{fontSize:"11px"} }}
                                />
                           </Box>
                            <Box width="45%">
                                <StyledTextField
                                margin="normal"
                                id="entry1"
                                label="New Entry"
                                type="text"
                                name="entry1"
                                className={classes.sideFieldsText}
                                InputLabelProps={{required:false, style:{fontSize:"11px"} }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box width="35%" onClick={() => inputRef.current.click()}>
                    <label className={classes.label}>Image</label>
                    <Box  className={classes.uploadImage}> 
                    </Box>
                    <Box style={{
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    }}><button className={classes.cancelButton}>CLICK TO UPLOAD</button>
                    <input ref={inputRef} name="inventory-image" type="file" accept="image/*" hidden />
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
    );
}

export default CreateInventory;