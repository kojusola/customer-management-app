import React from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Box  from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
// import Fade from '@material-ui/core/Fade';
// import CircularProgress from '@material-ui/core/CircularProgress';



const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor: "",
        fontFamily: theme.custom.typography,
    },
    textField:{
        backgroundColor: "",
        fontFamily: theme.custom.typography,
        height: "22px",
        margin: "0",
        "& .MuiInputBase-root": {
            height: 36,
            "& input": {
                textAlign: "center",
                background: ""
              }
          },
          "& .MuiFilledInput-root": {
            background: ""
          }
    }  

}))

function  StyledSearchBar({ ...rest }) {
    const classes = useStyles()
    return (
        <Box>
            <TextField
			classes={{
				root: classes.textField,
			}}
			variant="outlined"
			margin="dense"
			fullWidth
			autoComplete="off"
			size="small"
            InputProps={{
                endAdornment: (
                <InputAdornment
                style={{
                        margin:"0",
                        backgroundColor:""
                    }}>
                    <IconButton
                    style={{
                    backgroundColor:"#513166",
                    borderRadius: "2px",
                    padding: "1px",
                    color:"#FFFFFF",
                    margin:"0"
                }}>
                    <SearchIcon style={{
                        height: "20px",
                        width: "20px"
                    }} />
                    </IconButton>
                </InputAdornment>
                )
            }}
            { ...rest }
		/>
        </Box>
    );
}

export default StyledSearchBar;