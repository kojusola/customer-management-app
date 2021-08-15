import withStyles from '@material-ui/core/styles/withStyles';
import MuiDialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DialogActions from '@material-ui/core/DialogActions';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { CopyToClipboard } from 'react-copy-to-clipboard';


import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";

import { CancelButton, OutlinedButton } from "components";



import { forwardRef } from 'react';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';



const Transition = forwardRef((props, ref) => {
    return <Slide direction="down" ref={ref} {...props} />;
});


const DialogContent = withStyles(() => ({
    root: {
        padding: 15,

    },
}))(MuiDialogContent);

const useStyles = makeStyles(theme => ({
    paper: {
        minWidth: 320,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.primary.main,
    },
    svgRoot: {
        height: '.8em',
    },
}))

function CopyPaymentLink({ isOpen, toggleDialog, paymentLink }) {
    const classes = useStyles()

    const { enqueueSnackbar } = useSnackbar();
    const { push } = useHistory();
    return (
        <MuiDialog
            TransitionComponent={Transition}
            onClose={toggleDialog}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
            classes={{ paper: classes.paper }}
            keepMounted

        >
            <MuiDialogTitle style={{ padding: 0 }}>
                <Box display="flex" pt={2} p={2} justifyContent="space-between" bgcolor="#EEEBF0">
                    <Typography style={{
                        fontWeight: 600

                    }}>Payment Link</Typography>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={toggleDialog}>
                        <CloseIcon classes={{ root: classes.svgRoot }} />
                    </IconButton>
                </Box>
            </MuiDialogTitle>


            <DialogContent>
                <Typography style={{ fontWeight: 500, marginBottom: 10, fontSize: 17 }}>
                    Here is your payment link:
                </Typography>
                <Typography style={{ fontSize: 13, fontWeight: 600 }}>
                    {paymentLink}
                </Typography>
            </DialogContent>
            <DialogActions style={{ padding: 0 }}>
                <Box width="100%" display="flex" p={1} pt={1} bgcolor="#EEEBF0" justifyContent="space-around" >
                    <CancelButton
                        handleOnClicked={toggleDialog}
                    />
                    <CopyToClipboard text={paymentLink}
                        onCopy={() => {
                            enqueueSnackbar('Copied to clipboard', { variant: 'success' });
                            push('/sales')
                        }}>
                        <OutlinedButton

                            text="Copy Payment Link"
                            onClick={() => { }}
                        />
                    </CopyToClipboard>

                </Box>
            </DialogActions>


        </MuiDialog>
    )
}

export default CopyPaymentLink
