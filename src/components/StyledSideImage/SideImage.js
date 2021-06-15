import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import SigninImage from '../../assets/images/signin.svg';

const useStyles = makeStyles((theme) => ({
    root:{
        display:"flex",
        alignItems: "center",
        backgroundColor: "#EEEBF0",
        height:"100vh",
    },
    imageContainer:{
        backgroundImage: `url(${SigninImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display:"flex",
        margin:"auto",
        height:"90vh",
        width:"90%",
    }
}))

function SideImage() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.imageContainer}>
            </div>
        </div>
    );
}

export default SideImage;