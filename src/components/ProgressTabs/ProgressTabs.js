import { Box } from "@material-ui/core";
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) =>({
	root: {
        height: '3px',
        width: '83px',
        backgroundColor: '#EEEBF0',
        border: 0,
        borderRadius: '4px',
        marginLeft: '5px',
    },
    backgroundColor:{
        backgroundColor: '#9783A3',
        height: '3px',
        width: '83px',
        border: 0,
        borderRadius: '4px',
        marginLeft: '5px',
    }
}));

export default function ProgressTabs(props) {
    const classes = useStyles();
    const progress = (progressNumber) => {
        switch(progressNumber){
            case 1 :
                return(
                    <Box display='flex'>
                    <button className={classes.backgroundColor}></button>
                    <button className={classes.root}></button>
                    <button className={classes.root}></button>
                    <button className={classes.root}></button>
                    </Box>
                )
            case 2 :
                return(
                    <Box display='flex' mt={1}>
                    <button className={classes.backgroundColor}></button>
                    <button className={classes.backgroundColor}></button>
                    <button className={classes.root}></button>
                    <button className={classes.root}></button>
                    </Box>
                )
            case 3 :
                return(
                    <Box display='flex' mt={1}>
                    <button className={classes.backgroundColor}></button>
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
            {progress(props.progressNumber)}
        </div>
	);
}