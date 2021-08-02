import React, { useState} from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box  from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import Cancel from "assets/icons/cancel.svg";
import StyledSelect from 'components/StyledSelectField/StyledSelectField';
import Grid from '@material-ui/core/Grid';
import StyledTextField from 'components/StyledTextField/StyledTextField';
import states from './states.js';
// import Fade from '@material-ui/core/Fade';
// import CircularProgress from '@material-ui/core/CircularProgress';


const customStyles = {
    control: () => ({
      height: 20,
      minHeight: 20
    })
  };



const useStyles = makeStyles((theme) => ({
    selectGrid:{
        marginTop:'4px',
        marginLeft:'5px'
    },
    sideFieldsTextState: {
        width:'165px',
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
          fontSize: "12px",
          padding: "10px 20px 10px",
          width: "100%",
          height:"100%",
          textAlign: "left",
          borderRadius: "2px"
      },
      cancelButton:{
          border: '0',
          backgroundColor: theme.palette.secondary.background,
          color: theme.palette.success.background,
          fontSize: "10px",
          fontWeight: "600",
          padding: "0 20px 0"
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
        padding: '2px',
        marginRight: '2px',
        fontSize: '8px',
        fontFamily: theme.custom.typography,
    },
    detailsText:{
        border:"0",
        width:"100%",
        backgroundColor: theme.palette.secondary.background,
        margin:"0",
        padding:"0",
        borderRadius: "4px",
    }

}))

function AddNewCustomers(props) {
    const classes = useStyles();
    const [openState, setOpenState]= useState(false)
    const handleOpenState = ()=>{
        setOpenState(!openState)
    }
    const TopMargin = {
        marginTop: "0",
        marginBottom: "0px"
    }
    if (openState){ 
        TopMargin.marginTop = "290px";
        TopMargin.marginBottom = "40px"
    }
    return (
            <Box>
                {/* <Fade>
                    <CircularProgress color="inherit" /> 
                </Fade> */}
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
                        }}>Add New Customer</Typography>
                        <Button 
                        onClick={() => {
                        props.setOpen(false);
                        props.setPage('');
                        }}
                        className={classes.cancelLogo}>
                            <img src={Cancel} alt="cancel logo"></img>
                        </Button>
                    </Box>
                        <Box style={{
                            padding:"30px"
                        }}>
                        <Grid container className={classes.sideFieldsGrid}>
                            <Grid item xs={6}>
                                <StyledTextField
                                margin="normal"
                                id="firstname"
                                label="First name"
                                type="text"
                                name="firstname"
                                className={classes.sideFieldsText}

                                />
                            </Grid>
                            <Grid item xs={6} className= {classes.sideGrid}>
                                <StyledTextField
                                margin="normal"
                                id="lastname"
                                label="Last name"
                                type="text"
                                name="lastname"
                                autoComplete="lastname"
                                className={classes.sideFieldsText}

                                />
                            </Grid>
                        </Grid>
                        <StyledTextField
                            margin="normal"
                            id="email"
                            label="Email Address"
                            name="email"
                        />
                        { !openState &&
                            <button
                            onClick={handleOpenState}
                            className={classes.detailsText}>
                                <Box m={1}>
                                    <Typography style={{
                                            fontSize:"12px",
                                            color: "#281833"
                                        }}   className="classes.infoText">
                                       Show additional details
                                    </Typography>
                                </Box>
                            </button>
                        }
                        { openState && (
                            <>
                                <button
                                onClick={handleOpenState}
                                className={classes.detailsText}>
                                    <Box m={1}>
                                        <Typography style={{
                                                fontSize:"12px",
                                                color: "#281833"
                                            }}   className="classes.infoText">
                                            Hide additional details
                                        </Typography>
                                    </Box>
                                </button>
                                <StyledTextField
                                    margin="normal"
                                    id="phonenumber"
                                    label="Phone Number"
                                    type="tel"
                                    name="phonenumber"
                                />
                                <Grid container className={classes.sideFieldsGrid}>
                                    <Grid item xs={6}>
                                        <StyledTextField
                                        margin="normal"
                                        id="gender"
                                        label="Gender"
                                        type="text"
                                        name="gender"
                                        className={classes.sideFieldsText}

                                        />
                                    </Grid>
                                    <Grid item xs={6} className= {classes.sideGrid}>
                                        <StyledTextField
                                        margin="normal"
                                        id="ageRange"
                                        label="Age Range"
                                        type="text"
                                        name="ageRange"
                                        autoComplete="ageRange"
                                        className={classes.sideFieldsText}

                                        />
                                    </Grid>
                                </Grid>
                                <StyledTextField
                                    margin="normal"
                                    id="address"
                                    label="Address"
                                    type="text"
                                    name="address"
                                />
                                <Grid container className={classes.sideFieldsGrid}>
                                <Grid item xs={6}>
                                    <StyledTextField
                                    margin="normal"
                                    id="lga"
                                    label="LGA"
                                    type="text"
                                    name="lga"
                                    className={classes.sideFieldsTextState}
                                    />
                                </Grid>
                                <Grid item xs={6} >
                                    <div className={classes.selectGrid}>
                                        <StyledSelect
                                        name="state"
                                        placeholder={
                                            <span>
                                                State <sup>*</sup>
                                            </span>
                                        }
                                        values={states.map((state) => ({ value: state, label: state }))}
                                        styles={customStyles}
                                        className={classes.sideFieldsTextState}
                                        classNamePrefix="react-select"
                                        menuPlacement="auto"
                                        maxMenuHeight={90}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                            <StyledTextField
                                    margin="normal"
                                    id="zipCode"
                                    label="Postal/Zip code "
                                    type="tel"
                                    name="phonenumber"
                                />
                            </>
                        )}
                    </Box>
                    <Box display="flex" pt={2} p={2} style={{
                        justifyContent: "flex-end",
                        backgroundColor: "#EEEBF0"
                    }}>
                        <button
                            onClick={() => {
                                props.setOpen(false);
                                props.setPage('');
                        }}
                            className={classes.cancelButton}>Cancel</button>
                        <button 
                         onClick={() => {
                                props.setPage('');
                                props.setInitialSelect(true);
                            }}
                        className={classes.continueButton}>Add Customer</button>
                    </Box>
                </Box>
                </Box>
            </Box>
    );
}

export default AddNewCustomers;