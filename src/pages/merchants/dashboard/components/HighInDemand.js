import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SingleDemand from "./SingleDemand";

const useStyles = makeStyles(theme => ({
    stockBody: {
        height: 300,
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 2px 12px #0000001F',
        borderRadius: '5px',
        padding: '20px',
        paddingBottom: '0',
        overflowY: 'auto',
        paddingLeft: 10,
        paddingRight: 10,
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
    demands: {
        display: 'flex',
        overflowX: 'auto',
        padding: '0px 10px'
    },
    lowInStock: {
        display: "flex",
        alignItems: "center",
    },
    img: {
        height: 20,
        marginRight: 5,
    },
    container: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 25
    },
    root: {
        color: theme.palette.primary.main,
        "&:focus": {
            background: "inherit",
        },
    },
    select: {
        paddingLeft: 0,
    },
    menuItem: {
        color: theme.palette.primary.main,
    },
    stock: {
        display: 'flex',
        border: `solid 2px ${theme.palette.primary.main}`,
        borderRadius: '5px',
        height: '190px',
        padding: '8px',
        marginRight: 10,
        minWidth: 350,
        maxWidth: 350,
    },
    stockImage: {
        width: 160,
        height: '100 %',
        borderRadius: 5,
    },
    title: {
        color: theme.palette.primary.main
    }
}))

function LowInStock({ topic, demand, stocks = [] }) {
    const classes = useStyles();

    return (
        <Box width='100%'>
            <Box width="100%" className={classes.stockBody}>
                <Box className={classes.containerTopic}>
                    <img src={demand} alt="demand"></img>
                    <Typography className={classes.topic}>{topic}</Typography>
                </Box>
                <Box className={classes.demands}>
                    {stocks && stocks.length ? stocks.map(stock => <SingleDemand id={stock.id} uniqueName={stock.unique_name} price={stock.unit_price} url={stock.images?.[0]?.url} key={stock.id} />) : <Box mt="20px">
                        <Typography>No stocks available</Typography>
                    </Box>}

                </Box>
            </Box>
        </Box>
    )
}

export default LowInStock;