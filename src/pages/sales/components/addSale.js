import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box  from "@material-ui/core/Box";
import DeleteSvg from "assets/icons/redDelete.svg"
import StyledSelect from 'components/StyledSelectField/StyledSelectField';
import StyledTextField from 'components/StyledTextField/StyledTextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor: theme.palette.secondary.background,
        margin: "10px",
        padding: "0",
        fontFamily: theme.custom.typography,
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
        width: '55px',
        height: '39px',
    },
    label:{
        fontSize: "12px",
        color:theme.palette.button.progress,
        marginTop:"4px"
    },
    FieldsText:{
        marginTop:"5px",
        marginBottom:"5px",
        "& .MuiInputBase-root": {
            height: 30,
            "& input": {
                textAlign: "center"
              }
          }
    },
    sideFieldsText:{
        marginTop:"0"
    },
    resize:{
        fontSize: "10px"
    }

}))

function  AddSale({setSalePage}) {
    const classes = useStyles()
    return (
        <Box className={classes.background}>
           <Box style={{
               display:"flex",
               justifyContent:"space-between"
           }}>
               <Box width="75%"
               style={{
               display:"flex",
               justifyContent:"space-between"
                }}>
                   <Box width="35%">
                   <StyledSelect
                    placeholder={
                        <span>
                            Choose Customer
                        </span>
                    }
                    values={[]}
                    />
                   </Box>
                   <Box width="23%">
                   <StyledTextField
                        margin="normal"
                        id="newentry"
                        label="New Entry"
                        type="text"
                        name="newEntry"
                        className={classes.sideFieldsText}
                        InputLabelProps={{required:false}}
                        />
                   </Box>
                   <Box width="20%">
                   <StyledTextField
                        margin="normal"
                        id="quantity"
                        label="Qty"
                        type="text"
                        name="quantity"
                        className={classes.sideFieldsText}
                        InputLabelProps={{required:false}}
                        />
                   </Box>
                   <Box width="15%">
                   <button
                    onClick={() => {
                    setSalePage("full")
                    }}
                    className={classes.continueButton}>
                    ADD
                </button>
                   </Box>
               </Box>
               <Box width="10%"><label className={classes.label} style={{
                   fontSize:"7px"
               }}>11/02/2032 9.32am</label></Box>
           </Box>
           <Box mb={2} display="flex">
               <Box width="80%">
               <Box width="90%">
                   <Box my={2} p={2} pt={1} pb={2} bgcolor="#EEEBF0" display="flex" style={{
                alignItems:"center",
                borderRadius:"8px"
            }}>
                <Box width="43%" style={{
                    display:"flex",
                    justifyContent:"center"
                }}>
                    <label className={classes.label}>Item</label>
                    </Box>
                    <Box width="17%"  style={{
                        display:"flex",
                        justifyContent:"center"
                    }}>
                        <label className={classes.label}>Quantity</label>
                    </Box>
                    <Box width="17%"  style={{
                        display:"flex",
                        justifyContent:"center"
                    }}>
                        <label className={classes.label}>Price</label>
                    </Box>
                    <Box width="17%"  style={{
                        display:"flex",
                        justifyContent:"center"
                    }}>
                    <label className={classes.label}>Total</label>
                    </Box>
                </Box>
            </Box>
                   <Box display="flex" width="100%"
                   style={{
                       justifyContent:"space-between"
                   }}>
                       <Box width="90%" style={{
                           display:"flex",
                           alignItems:"center",
                           border:"1px solid #707070"
                       }}>
                        <Box width="43%" style={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    padding: " 0 4px 0"
                }}>
                    <StyledTextField
                        margin="normal"
                        id=""
                        label="Jones Wheat Bread(Small) "
                        type="text"
                        name=""
                        className={classes.FieldsText}
                        InputLabelProps={{required:false, style:{
                            fontSize: 13
                        }}}
                        InputProps ={{
                            classes:{
                                input: classes.resize
                            }
                        }}
                        />
                    </Box>
                    <Box width="17%"  style={{
                        display:"flex",
                        justifyContent:"center"
                    }}>
                        <StyledTextField
                        margin="normal"
                        id="productname"
                        label="5"
                        type="text"
                        name="productname"
                        className={classes.FieldsText}
                        InputLabelProps={{required:false, style:{
                            fontSize: 13
                        }}}
                        />
                    </Box>
                    <Box width="17%"  style={{
                        display:"flex",
                        justifyContent:"center"
                    }}>
                        <label className={classes.label}>N 200</label>
                    </Box>
                    <Box width="17%"  style={{
                        display:"flex",
                        justifyContent:"center"
                    }}>
                    <label className={classes.label}>N5,000.00</label>
                    </Box>
                       </Box>
                       <Box width="7%" m={1}>
                       <button
                       style={{
                           backgroundColor:"#FDEEEE",
                           border:"0",
                           padding:"4px 7px 4px"
                       }}>
                        <img src={DeleteSvg} alt="delete" style={{
                            width:"10px"
                        }}></img>
                       </button>
                       </Box>
                   </Box>
               </Box>
               <Box width="20%">
                    <Typography style={{
                        textAlign:"center",
                        fontSize: "30px",
                        letterSpacing:"2px"
                    }}>Total</Typography>
                   <Box color="#FFFFFF" mb={2} style={{
                       backgroundColor:"#513166",
                       boxShadow:"0px 3px 6px #00000029",
                       border:"1px solid #707070",
                       borderRadius:"16px",
                       color:"FFFFFF",
                       fontSize:"25px",
                       padding:"25px",
                       display:"flex",
                       alignItems:"center"
                   }}>
                        <span style={{
                            color:"FFFFFF",
                            textColor:"FFFFFF",
                            fontColor:"FFFFFF",
                        }}>N5,750</span>
                   </Box>
                   <Box>
                   <label className={classes.label} style={{
                        fontSize:"15px"
                    }}>PAYMENT OPTIONS</label>
                    <Box display="flex" style={{
                        border:"1px solid #707070",
                        flexDirection:"column",
                        padding:"15px",
                        justifyContent:"center",
                        alignItems:"center"
                    }}>
                        <button
                            className={classes.continueButton}
                            style={{
                                width:"100px",
                                padding:"10px",
                                marginBottom:"10px"
                            }}>
                            Cash
                        </button>
                        <button
                            className={classes.continueButton}
                            style={{
                                width:"100px",
                                padding:"10px",
                                marginBottom:"10px"
                            }}>
                            Transfer
                        </button>
                        <button
                            className={classes.continueButton}
                            style={{
                                width:"100px",
                                padding:"10px",
                                marginBottom:"10px"
                            }}>
                            USSD
                        </button>
                        <button
                            className={classes.continueButton}
                            style={{
                                width:"100px",
                                padding:"10px",
                                marginBottom:"10px",
                                fontSize:"10px"
                            }}>
                            <span>Copy Pay Link</span>
                        </button>
                    </Box>
                   </Box>
               </Box>
           </Box>
        </Box>
    );
}

export default AddSale;