import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import inventoryShoes from "assets/images/inventoryShoe.png";
import { useMediaQueries } from 'helpers';

const useStyles = makeStyles(theme => ({
    stockBody: {
        backgroundColor: theme.palette.secondary.cards,
        boxShadow: '0px 2px 6px #00000080',
        borderRadius: '8px',
        // padding: '7px',
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'space-between',
        padding: '8px',
        // minWidth: 350,
        // maxWidth: 350,
        marginBottom: 10
    },
    containerTopic: {
        display: 'flex',
        alignItems: 'center'
    },
    shoe: {
        fontSize: '18px',
        color: '#000000',
        // letterSpacing: '0.62px',
    },
    figure: {
        fontSize: '20px',
        color: theme.palette.button.progress,
        letterSpacing: '0.62px',
        fontWeight: '600'
    },
    image: {
        width: '130px',
        height: '130px',
    }
}))

function SingleStock() {
    const classes = useStyles();

    const { smAndDown } = useMediaQueries()

    return (
        <Box minWidth={smAndDown ? 300 : '100%'} className={classes.stockBody} mr={smAndDown ? '15px' : 0}>
            <img className={classes.image} src={inventoryShoes} alt="shoes"></img>
            <Box >
                <Typography className={classes.shoe}>Shoe 4</Typography>
                <Typography className={classes.figure}>N 5,750.00</Typography>
            </Box>
        </Box>
    )
}

export default SingleStock;