import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ImageUpload from 'assets/icons/imageBackground.svg';
import { moneyFormatter } from 'helpers';
import { useHistory } from 'react-router-dom';

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
        cursor: 'pointer'
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
        width: 240,
        height: 130,
        borderRadius: 10,
        marginBottom: 10
    },
    imagePlaceholder: {
        width: 240,
        height: 130,
        backgroundImage: `url(${ImageUpload})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",

    }
}))

function SingleDemand({ url, uniqueName, price, id }) {
    const classes = useStyles();
    const { push } = useHistory();
    return (
        <Box onClick={() => push(`/inventory/${id}`, { from: '/dashboard' })} className={classes.stockBody}>
            {url ? <img className={classes.image} src={url} alt={uniqueName}></img> : <Box className={classes.imagePlaceholder}>
            </Box>}
            <Typography className={classes.shoe}>{uniqueName}</Typography>
            <Typography className={classes.figure}>N  {moneyFormatter(price)}</Typography>
        </Box>
    )
}

export default SingleDemand;