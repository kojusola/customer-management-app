import React, { useState, Fragment} from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box  from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import Cancel from "assets/icons/cancel.svg";
import Danger from "assets/icons/danger.svg";
import StyledSelect from 'components/StyledSelectField/StyledSelectField';
import Grid from '@material-ui/core/Grid';
import StyledTextField from 'components/StyledTextField/StyledTextField';
import { components } from "react-select";
import AddIcon from '@material-ui/icons/Add';
import Delete  from "assets/icons/delete.svg";
import Backdrop from '@material-ui/core/Backdrop';
import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Fade from '@material-ui/core/Fade';
// import CircularProgress from '@material-ui/core/CircularProgress';



  const Menu = (props) => {
    const classes = useStyles();
    return (
    <Fragment>
        <components.Menu {...props}>
        <Box p={1} style={{
            textAlign:"left",
        }}>
        {/* <button>{props.selectProps.name}</button> */}
          <button 
          onClick={() => {
            props.selectProps.setOverlay(true);
            }}
          className={classes.selectButton}
          >
            <AddIcon style={{
                fontSize: "10px",
                padding: "0 4px 0"
            }}/>
            Add new Product 
          </button>
        </Box>
      </components.Menu>
    </Fragment>
    );
  };

const useStyles = makeStyles((theme) => ({
    selectGrid:{
        marginTop:'4px',
        marginLeft:'5px'
    },
    sideFieldsTextState: {
        width:'145px',
        marginTop:'5px',
        height: '25px',
        fontFamily: theme.custom.typography,
        "& .MuiInputBase-root": {
            height: 36,
            "& input": {
                textAlign: "center"
              }
          },
          "& .MuiFormLabel-root": {
            fontSize :'15px',
          }
    },
    fieldsText: {
        fontFamily: theme.custom.typography,
        height: "30px",
    },
      selectButton:{
          border: '0',
          backgroundColor: theme.palette.secondary.background,
          color: theme.palette.success.background,
          display: "flex",
          fontSize: "10px",
          padding: "8px 20px 8px",
          width: "100%",
          height:"100%",
          textAlign: "left",
          borderRadius: "2px"
      },
      cancelButton:{
          border: '1px solid #281833',
          backgroundColor: theme.palette.secondary.background,
          color: theme.palette.success.background,
          fontSize: "10px",
          fontWeight: "600",
          padding: "9px 20px 9px",
          borderRadius:"3px"
      },
      continueButton:{
        border: '0',
        backgroundColor: theme.palette.success.background,
        color:  "#FFFFFF",
        fontSize: "11px",
        fontWeight: "600",
        width: "100px",
        paddingTop:"9px",
        paddingBottom:"9px",
        marginLeft: "10px",
        borderRadius:"3px"
    },
    cancelLogo:{
        border: '0',
        backgroundColor: theme.palette.secondary.background,
        padding: '0'
    },
    sideFieldsGrid:{
        display: "flex",
        justifyContent: 'space-between'
    },
    sideFieldsGridLeft:{
        display: "flex",
        justifyContent: 'left'
    },
    sideFieldsText: {
        width:'165px',
        fontFamily: theme.custom.typography,
    },
    sideGrid: {
        paddingLeft: "5px"
      
    },
    infoText:{
        backgroundColor: theme.palette.secondary.info,
        TextColor: theme.palette.secondary.info,
        fontSize: '8px',
        fontFamily: theme.custom.typography,
    },
    detailsText:{
        border:"0",
        width:"100%",
        backgroundColor: theme.palette.secondary.background,
        margin:"0",
        marginTop:"10px",
        padding:"7px",
        borderRadius: "4px",
    },
    detailsText2:{
        border:"0",
        width:"100%",
        backgroundColor: theme.palette.secondary.danger,
        margin:"0",
        marginTop:"10px",
        padding:"4px",
        display: 'flex',
        marginBottom:"10px",
        borderRadius: "4px",
    },
    horizontal:{
        width: "80px",
        margin: " auto ",
    },
    selectGridProduct:{
        marginTop:'17px',
    },
    sideGridProduct:{
        paddingLeft: '5px'
    },
    sideGridProductDelete:{
        marginTop: "15px",
        marginBottom: "15px",
        display:"flex",
        justifyContent: "flex-end",
    },
    boldText:{
        fontWeight: "600",
        fontSize:"20px"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 4,
        color: theme.palette.success.background,
        overflowY: "scroll",
      },

}))

function CompletedQuotes(props) {
    const classes = useStyles();
    // const [openState, setOpenState]= useState(false)
    const [productNumber, setProductNumber]= useState(1)
    const [overlay, setOverlay]= useState(false)
    const [checked, setChecked]= useState(true)
    // const checkedTextVisible =() =>{
    //     setChecked(false)
    // }
    const TopMargin = {
        marginTop: "390px",
        marginBottom: "40px"
    };

    const TopMarginOverlay ={
        marginTop: "0px",
        marginBottom: "0px"
    }
    if(checked=== false){
        TopMarginOverlay.marginTop= "150px"
        TopMarginOverlay.marginBottom= "40px"
    }
    if(productNumber=== 2){
        TopMargin.marginTop= "540px";
    }
    const products = []
    for(let i= 0; i< productNumber; i++){
        products.push(
            <>
                <Grid container >
                            <Grid item xs={6} className={classes.selectGridProduct}>
                            <StyledSelect
                            name="customers"
                            placeholder={
                                <span>
                                    Product name<sup>*</sup>
                                </span>
                            }
                           
                            className={classes.sideFieldsText}
                            classNamePrefix="react-select"
                            menuPlacement="auto"
                            components ={{Menu}}
                            customerPage ={props.setPage}
                            closeInitialSelect={props.setInitialSelect}
                            setOverlay={setOverlay}
                            />
                            </Grid>
                            <Grid item xs={2}>
                                <StyledTextField
                                margin="normal"
                                id="quantity"
                                label="Qty"
                                type="numeric"
                                name="quantity"
                                autoComplete="quantity"
                                className={classes.sideFieldsTextProduct}

                                />
                            </Grid>
                            <Grid item xs={4} className= {classes.sideGridProduct}>
                                <StyledTextField
                               margin="normal"
                                id="unit-price"
                                label="Unit Price"
                                type="text"
                                name="unit-price"
                                autoComplete="unit-price"
                                className={classes.sideFieldsTextProduct}

                                />
                            </Grid>
                        </Grid>
                        <Grid container className={classes.sideFieldsGrid}>
                            <Grid item xs={4}>
                                <StyledTextField
                                margin="normal"
                                id="discount"
                                label="Discount"
                                type="text"
                                name="discount"
                                autoComplete="discount"
                                className={classes.sideFieldsTextProduct}

                                />
                            </Grid>
                            <Grid item xs={6} className= {classes.sideGridProduct}>
                                <StyledTextField
                                margin="normal"
                                id="amount"
                                label="Amount N0.00"
                                type="text"
                                name="ageRange"
                                autoComplete="ageRange"

                                />
                            </Grid>
                            <Grid item xs={2} className= {classes.sideGridProductDelete}>
                                <Box bgcolor="#EEEBF0" width="25px" style={{
                                    display:"flex",
                                    alignItems: "center",
                                    borderRadius: "4px"
                                }}>
                                    <img src={Delete} alt="delete"></img>
                                </Box>
                            </Grid>
                            </Grid>
                            <hr className={classes.horizontal}></hr>
                </>
        )
    }
    console.log(productNumber);
    return (
            <Box>
                <Box style={TopMargin}>
                <Box
                style={{
                    backgroundColor:"#ffffff",
                    borderRadius: "8px",
                    width:"400px",
                }}>
                    <Box display="flex" pt={2} p={2} style={{
                        justifyContent: "space-between",
                        backgroundColor: "#EEEBF0"
                    }}> 
                        <Typography style={{
                            fontWeight:"600"
                        }}>Add New Quote</Typography>
                        <Button 
                        onClick={() => {
                            props.setPage('');
                            props.setInitialSelect(false);
                            props.setOpen(false);
                        }}
                        className={classes.cancelLogo}>
                            <img src={Cancel} alt="cancel logo"></img>
                        </Button>
                    </Box>
                        <Box style={{
                            padding:"30px"
                        }}>
                        <StyledTextField
                            margin="normal"
                            id="quote-name"
                            label="Quote Name"
                            name="quote-name"
                        />
                        <hr className={classes.horizontal}></hr>
                        {products}
                            <button
                            onClick = {()=>setProductNumber(prevProductNumber => prevProductNumber + 1)}
                            className={classes.detailsText}>
                                <Box m={1}>
                                    <Typography style={{
                                            fontSize:"12px",
                                            color: "#281833"
                                        }}   className="classes.infoText">
                                        <AddIcon style={{
                                           fontSize: "14px",
                                            padding: "0 4px 0"
                                        }}/>
                                       Add Another Product
                                    </Typography>
                                </Box>
                            </button>
                            <Box px={4} py={3} my={3} border={1} borderColor="#cbc2d1"
                            style={{
                                borderRadius: "8px",
                                fontSize:"12px",
                                border: "1px solid #CBC2D1"
                            }}>
                                <Box display="flex"
                                style={{
                                    justifyContent:"space-between",
                                    padding:"5px 0 5px"
                                }}>
                                    <Typography style={{
                                        fontSize:"10px",
                                        fontWeight: "600"
                                    }}>Subtotal:</Typography>
                                    <Typography
                                    style={{
                                        fontSize:"10px",
                                        color:"#9783A3"
                                    }}>N0.00</Typography>
                                </Box>
                                <Box display="flex"
                                 style={{
                                    justifyContent:"space-between",
                                    padding:"5px 0 5px"
                                }}>
                                    <Typography
                                    style={{
                                        fontSize:"10px",
                                        color:"#9783A3"
                                    }}>Tax:</Typography>
                                    <Typography
                                    style={{
                                        fontSize:"10px",
                                        color:"#9783A3"
                                    }}>N0.00</Typography>
                                </Box>
                                <Box display="flex"
                                 style={{
                                    justifyContent:"space-between",
                                    padding:"5px 0 5px"
                                }}>
                                    <Typography
                                    style={{
                                        fontSize:"10px",
                                        color:"#9783A3"
                                    }}>Shipping/Handling</Typography>
                                    <Typography
                                    style={{
                                        fontSize:"10px",
                                        color:"#9783A3"
                                    }}>N0.00</Typography>
                                </Box>
                                <Box display="flex"
                                 style={{
                                    justifyContent:"space-between",
                                    padding:"5px 0 5px"
                                }}>
                                    <Typography style={{
                                        fontSize:"10px",
                                        fontWeight: "600"
                                    }}>Total:</Typography>
                                    <Typography
                                    style={{
                                        fontSize:"10px",
                                        color:"#9783A3"
                                    }}>N0.00</Typography>
                                </Box>
                            </Box>
                            <div>
                                <StyledSelect
                                name="state"
                                placeholder={
                                    <span>
                                        Assigned To <sup>*</sup>
                                    </span>
                                }
                                
                                classNamePrefix="react-select"
                                menuPlacement="auto"
                                maxMenuHeight={90}
                                />
                            </div>
                            <StyledTextField
                            margin="normal"
                            id="remark"
                            label="Remark"
                            name="remark"
                            />
                    </Box>
                    <Box display="flex"  pt={2} p={2} style={{
                        justifyContent: "space-between",
                        backgroundColor: "#EEEBF0"
                    }}>
                        <button
                            onClick={() => {
                                props.setPage('');
                                props.setInitialSelect(false);
                                props.setOpen(false);
                        }}
                            className={classes.cancelButton}>Cancel</button>
                        <Box>
                            <button 
                            onClick={() => {
                                    props.setPage('');
                                    props.setInitialSelect(true);
                                }}
                            className={classes.cancelButton}>Back</button>
                            <button 
                            onClick={() => {
                                    props.setPage('CompletedQuote');
                                    props.setInitialSelect(false);
                                    props.setOpen(false);
                                }}
                            className={classes.continueButton}>Add Quote</button>
                        </Box>
                    </Box>
                </Box>
                </Box>
                {overlay === true && (
                    <Backdrop
                    className={classes.backdrop}
                    open={overlay}
                    >
                    <Box>
                    <Box>
                    {/* <Fade>
                        <CircularProgress color="inherit" /> 
                    </Fade> */}
                    <Box style={TopMarginOverlay}>
                    <Box
                    style={{
                        backgroundColor:"#ffffff",
                        borderRadius: "8px",
                        width:"400px"
                    }}>
                        <Box display="flex" pt={2} p={2} style={{
                            justifyContent: "space-between",
                            backgroundColor: "#EEEBF0"
                        }}> 
                            <Typography style={{
                                fontWeight:"600"
                            }}>Add New Product </Typography>
                            <Button
                            onClick={() => {
                            setOverlay(false)
                            }} 
                            className={classes.cancelLogo}>
                                <img src={Cancel} alt="cancel logo"></img>
                            </Button>
                        </Box>
                            <Box style={{
                                padding:"35px 20px 35px"
                            }}>
                                <StyledTextField
                                margin="normal"
                                id="product-name"
                                label="Product Name"
                                name="product-name"
                                />

                                <Grid container className={classes.sideFieldsGrid}>
                                <Grid item xs={6}>
                                    <StyledTextField
                                    margin="normal"
                                    id="quantity"
                                    label="Quantity"
                                    type="text"
                                    name="quantity"
                                    autoComplete="quantity"
                                    className={classes.sideFieldsTextProduct}

                                    />
                                </Grid>
                                <Grid item xs={6} className= {classes.sideGridProduct}>
                                    <StyledTextField
                                    margin="normal"
                                    id="unit-price"
                                    label="Unit price"
                                    type="text"
                                    name="unit-price"
                                    autoComplete="unit-price"
                                    />
                                </Grid>
                                </Grid>
                                <div>
                                <StyledSelect
                                name="state"
                                placeholder={
                                    <span>
                                        Branch <sup>*</sup>
                                    </span>
                                }
                                
                                classNamePrefix="react-select"
                                menuPlacement="auto"
                                maxMenuHeight={90}
                                />
                                </div>
                                <div
                                className={classes.detailsText}>
                                        <Typography style={{
                                                fontSize:"10px",
                                                color: "#281833",
                                                display: "flex",
                                                justifyContent: "center",
                                                
                                            }}   className="classes.infoText">
                                            <p style={
                                                {
                                                    marginRight:"14px",
                                                    marginTop: "12px"
                                                }
                                            }>
                                                Create an outstanding purchase order with this product
                                            </p>
                                            
                                            <Box mt={1}>
                                            <Switch Style={{
                                                paddingRight: "4px",
                                                marginTop: "6px"
                                            }}
                                            onChange= {(evt)=>{
                                                console.log(evt.target.checked)
                                                setChecked(evt.target.checked);
                                            }}
                                            name="checked" size='small' />
                                            </Box>
                                        </Typography>
                                        {
                                    checked ===false && (
                                        
                                        <div className={classes.detailsText2}  >
                                            <img src={Danger} alt="danger"></img>
                                            <Typography
                                            style={{
                                                fontSize:"10px",
                                                color: "#FDEEEE",
                                                display: "flex",
                                                justifyContent: "center",
                                                
                                            }}>When this is disabled, a purchase order record for this product will not be created automatically, and this will affect your account balancing.</Typography>
                                        </div>
                                    )
                                }
                                </div>
                               
                             </Box>
                            <Box display="flex" pt={2} p={2} style={{
                                justifyContent: "flex-end",
                                backgroundColor: "#EEEBF0"
                            }}>
                            <button
                            onClick={() => {
                            setOverlay(false)
                            }}
                             className={classes.cancelButton}>Cancel</button>
                            <button 
                            onClick={() => {
                            setOverlay(false)
                            }}
                            className={classes.continueButton}>Add Product</button>
                        </Box>
                    </Box>
                    </Box>
                </Box>
                    </Box>

                    </Backdrop>
                    
                )}
            </Box>
    );
}

export default CompletedQuotes;