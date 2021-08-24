import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import lowStock from "assets/icons/lowStock.svg";
import { useMediaQueries } from 'helpers';
import SingleStock from "./SingleStock";

const useStyles = makeStyles(theme => ({
    stockBody: {
        // height: '700px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 2px 12px #0000001F',
        borderRadius: '5px',
        overflow: 'hidden'
    },
    containerTopic: {
        display: 'flex',
        alignItems: 'center'
    },
    topic: {
        fontSize: '18px',
        color: theme.palette.secondary.dashboard,
        paddingLeft: '10px'
    },

}))

function LowInStock() {
    const classes = useStyles();
    const { smAndDown } = useMediaQueries()

    return (
        <Box className={classes.stockBody}>
            <Box className={classes.containerTopic} mt="10px" p="10px">
                <img src={lowStock} alt="low stock"></img>
                <Typography className={classes.topic}>LOW IN STOCK</Typography>
            </Box>
            <Box display="flex" padding="10px" flexDirection={smAndDown ? 'row' : "column"} height={smAndDown ? 'fit-content' : "550px"} overflow="auto">
                <SingleStock />
                <SingleStock />
                <SingleStock />
                <SingleStock />
                <SingleStock />
                <SingleStock />
                <SingleStock />
                <SingleStock />
                <SingleStock />
            </Box>
        </Box>
    )
}

export default LowInStock;