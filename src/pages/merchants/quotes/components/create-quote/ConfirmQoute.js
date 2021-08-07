import withStyles from '@material-ui/core/styles/withStyles';
import MuiDialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DialogActions from '@material-ui/core/DialogActions';
import makeStyles from '@material-ui/core/styles/makeStyles';


import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";

import CloseDialog from "../CloseDialog";
import CancelButton from "../CancelButton";
import OutlinedButton from "../OutlinedButton";
import { Spinner } from "components";

import { forwardRef } from 'react';



const Transition = forwardRef((props, ref) => {
    return <Slide direction="down" ref={ref} {...props} />;
});


const DialogContent = withStyles((theme) => ({
    root: {
        padding: 20,

    },
}))(MuiDialogContent);

const useStyles = makeStyles(theme => ({
    paper: {
        minWidth: 320,
    }
}))


function ConfirmQoute({ isLoading, saveQuote, isOpen, toggleDialog }) {

    const classes = useStyles()

    return (
        <MuiDialog
            TransitionComponent={Transition}
            onClose={toggleDialog}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
            classes={{ paper: classes.paper }}
            maxWidth="sm"

        >
            <MuiDialogTitle style={{ padding: 0 }}>
                <Box display="flex" pt={2} p={2} justifyContent="space-between" bgcolor="#EEEBF0">
                    <Typography style={{
                        fontWeight: 600

                    }}>Confirm</Typography>
                    <CloseDialog toggle={toggleDialog} />
                </Box>
            </MuiDialogTitle>


            <DialogContent>
                <Typography style={{ fontWeight: 600, marginBottom: 10, fontSize: 17 }}>
                    Do you want to create quote?
                </Typography>
                <Typography style={{ fontSize: 12 }}>
                    You cannot make changes beyond this point
                </Typography>
            </DialogContent>
            <DialogActions style={{ padding: 0 }}>
                <Box width="100%" display="flex" p={1} pt={1} bgcolor="#EEEBF0" justifyContent="space-around" >
                    <CancelButton
                        handleOnClicked={toggleDialog}
                    />
                    <OutlinedButton
                        disabled={isLoading}
                        text={isLoading ? <Spinner text="Saving..." /> : 'Continue'}
                        onClick={saveQuote}
                    />
                </Box>
            </DialogActions>


        </MuiDialog>
    )
}

export default ConfirmQoute
