import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
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

function CloseDialog({ toggle }) {
    const classes = useStyles();

    return (
        <IconButton aria-label="close" className={classes.closeButton} onClick={toggle}>
            <CloseIcon classes={{ root: classes.svgRoot }} />
        </IconButton>
    )
}

export default CloseDialog
