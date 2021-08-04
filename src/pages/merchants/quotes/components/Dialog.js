import withStyles from '@material-ui/core/styles/withStyles';
import MuiDialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PerfectScrollbar from 'react-perfect-scrollbar';

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

function Dialog({ isOpen, toggleDialog, children, ...rest }) {

    const classes = useStyles()

    return (
        <MuiDialog
            TransitionComponent={Transition}
            onClose={toggleDialog}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
            {...rest}
            classes={{ paper: classes.paper }}
        >

            <DialogContent>
                <PerfectScrollbar>
                    {children}
                </PerfectScrollbar>
            </DialogContent>

        </MuiDialog>
    )
}

export default Dialog
