import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    summaryTopic: {
        fontSize: 16,
        color: theme.palette.secondary.dashboard,
        paddingLeft: '8px',
        textTransform: 'uppercase'
    },
    summaryContainer: {
        boxShadow: '0px 2px 12px #0000001F',
        borderRadius: '8px',
        padding: '15px',
        textAlign: 'center',
        height: 120
    },
    figure: {
        textAlign: "center",
        fontSize: 20,
        marginTop: 10
    }
}))

function SingleSummary({ logo, symbol, topic, figure }) {
    const classes = useStyles();

    return (

        <Box py={7} className={classes.summaryContainer}>
            <Box display="flex" alignItems="center">
                <img src={logo} alt="total purchase"></img>
                <Typography className={classes.summaryTopic}>{topic}</Typography>
            </Box>
            <Typography className={classes.figure}>{symbol} {figure}</Typography>
        </Box>

    )
}

export default SingleSummary;