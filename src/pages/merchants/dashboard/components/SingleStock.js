import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { moneyFormatter, useMediaQueries } from 'helpers';
import ImageUpload from 'assets/icons/imageBackground.svg';
import { useHistory } from 'react-router-dom';

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
        marginBottom: 10,
        cursor: 'pointer'
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
        // width: '130px',
        height: 80,
        borderRadius: 10,
        marginRight: 10
    },
    imagePlaceholder: {
        height: 80,
        backgroundImage: `url(${ImageUpload})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",

    }
}))

function SingleStock({ url, uniqueName, price, id }) {
    const classes = useStyles();

    const { smAndDown } = useMediaQueries()

    const { push } = useHistory();

    return (
        <Box onClick={() => push(`/inventory/${id}`, { from: '/dashboard' })} minWidth={smAndDown ? 300 : '100%'} className={classes.stockBody} mr={smAndDown ? '15px' : 0}>
            {url ? <img className={classes.image} src={url} alt={uniqueName}></img> : <Box className={classes.imagePlaceholder}>
            </Box>}
            <Box >
                <Typography className={classes.shoe}>{uniqueName}</Typography>
                <Typography className={classes.figure}>N {moneyFormatter(price)}</Typography>
            </Box>
        </Box>
    )
}

export default SingleStock;