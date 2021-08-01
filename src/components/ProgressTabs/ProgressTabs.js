import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '3px',
        width: '25%',
        backgroundColor: theme.palette.secondary.background,
        border: 0,
        borderRadius: '4px',
        marginLeft: '5px',
    },
    backgroundColor: {
        backgroundColor: theme.palette.button.progress,
        height: '3px',
        width: '25%',
        border: 0,
        borderRadius: '4px',
        marginLeft: '5px',
    }
}));

export default function ProgressTabs({ progressNumber }) {

    const classes = useStyles();
    const progress = (progressNumber) => {
        switch (progressNumber) {
            case 0:
                return (
                    <Box display='flex' justifyContent="space-between">
                        <button className={classes.root} style={{ marginLeft: 0 }}></button>
                        <button className={classes.root}></button>
                        <button className={classes.root}></button>
                        <button className={classes.root}></button>
                    </Box>
                )
            case 1:
                return (
                    <Box display='flex'>
                        <button className={classes.backgroundColor} style={{ marginLeft: 0 }}></button>
                        <button className={classes.root}></button>
                        <button className={classes.root}></button>
                        <button className={classes.root}></button>
                    </Box>
                )
            case 2:
                return (
                    <Box display='flex' mt={1}>
                        <button className={classes.backgroundColor} style={{ marginLeft: 0 }}></button>
                        <button className={classes.backgroundColor}></button>
                        <button className={classes.root}></button>
                        <button className={classes.root}></button>
                    </Box>
                )
            case 3:
                return (
                    <Box display='flex' mt={1}>
                        <button className={classes.backgroundColor} style={{ marginLeft: 0 }}></button>
                        <button className={classes.backgroundColor}></button>
                        <button className={classes.backgroundColor}></button>
                        <button className={classes.root}></button>
                    </Box>
                )
            default:
                return

        }
    }
    return (
        <div>
            {progress(progressNumber)}
        </div>
    );
}