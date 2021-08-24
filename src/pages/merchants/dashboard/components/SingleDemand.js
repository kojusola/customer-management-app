import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import inventoryShoes from "assets/images/inventoryShoe.png";

const useStyles = makeStyles(theme => ({
    stockBody: {
        backgroundColor: theme.palette.secondary.cards,
        boxShadow: '0px 2px 6px #00000080',
        borderRadius: '8px',
        padding: '7px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '300px',
        marginRight: 15,
        marginTop: '15px',
        marginBottom: '20px',
    },
    shoe: {
        fontSize: '18px',
        color: '#000000',
        // letterSpacing: '0.62px',
    },
    figure: {
        fontSize: '20px',
        color: theme.palette.button.progress,
        // letterSpacing: '0.62px',
        fontWeight: '600'
    },
    image: {
        width: '130px',
        height: '130px',
    }
}))

function SingleDemand() {
    const classes = useStyles();

    return (
        <Box className={classes.stockBody}>
            <img className={classes.image} src={inventoryShoes} alt="shoes"></img>
            <Typography className={classes.shoe}>Shoe 4</Typography>
            <Typography className={classes.figure}>N 5,750.00</Typography>
        </Box>
    )
}

export default SingleDemand;