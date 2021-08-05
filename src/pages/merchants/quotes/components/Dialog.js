import MuiDialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from "@material-ui/core/Box";
import withStyles from '@material-ui/core/styles/withStyles';
import MuiDialogContent from '@material-ui/core/DialogContent';
import PerfectScrollbar from 'react-perfect-scrollbar';


import CloseDialog from "./CloseDialog";

import { forwardRef } from 'react';


const Transition = forwardRef((props, ref) => {
    return <Slide direction="down" ref={ref} {...props} />;
});

const DialogContent = withStyles((theme) => ({
    root: {
        paddingTop: '0px ! important',
        marginTop: '0px ! important',
        padding: 0
    },
}))(MuiDialogContent);

const useStyles = makeStyles(theme => ({
    paper: {
        minWidth: 340,
    }
}))

export const Dialog = ({ isOpen, toggleDialog, children, ...rest }) => {

    const classes = useStyles()

    return (
        <MuiDialog
            TransitionComponent={Transition}
            onClose={toggleDialog}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
            {...rest}
            classes={{ paper: classes.paper }}
            fullWidth
            maxWidth="sm"
        >

            <DialogContent>
                <PerfectScrollbar>
                    {children}
                </PerfectScrollbar>
            </DialogContent>

        </MuiDialog>
    )
}

export const DialogTitled = ({ isOpen, toggleDialog, title, children, ...rest }) => {

    const classes = useStyles()

    return (
        <MuiDialog
            TransitionComponent={Transition}
            onClose={toggleDialog}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
            {...rest}
            classes={{ paper: classes.paper }}
            fullWidth
            maxWidth="sm"
        >
            <MuiDialogTitle style={{ padding: 0 }}>
                <Box display="flex" pt={2} p={2} justifyContent="space-between" bgcolor="#EEEBF0">
                    <Typography style={{
                        fontWeight: "600"
                    }}>{title}</Typography>
                    <CloseDialog toggle={toggleDialog} />
                </Box>
            </MuiDialogTitle>
            {children}
        </MuiDialog>
    )
}


