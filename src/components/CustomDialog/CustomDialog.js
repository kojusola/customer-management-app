import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
// import PerfectScrollbar from 'react-perfect-scrollbar';

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="down" ref={ref} {...props} />;
});

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    svgRoot: {
        height: '.8em',
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography style={{ fontWeight: 600 }} variant="h6">
                {children}
            </Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon classes={{ root: classes.svgRoot }} />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        paddingTop: '0px ! important',
        marginTop: '0px ! important',
    },
}))(MuiDialogContent);

export default function CustomDialog({ showTitle = true, toggleDialog, isOpen, title, children, ...rest }) {
    return (
        <div>
            <Dialog
                TransitionComponent={Transition}
                onClose={toggleDialog}
                aria-labelledby="customized-dialog-title"
                open={isOpen}
                {...rest}
            >
                {showTitle && (
                    <DialogTitle id="customized-dialog-title" onClose={toggleDialog}>
                        {title}
                    </DialogTitle>
                )}

                <DialogContent>{children}</DialogContent>

            </Dialog>
        </div>
    );
}
