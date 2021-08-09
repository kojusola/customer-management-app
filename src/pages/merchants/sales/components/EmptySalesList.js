import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import emptySale from "assets/images/empty-sales.png";
import Button from '@material-ui/core/Button';


function EmptySalesList({ classes, createSales }) {

    return (
        <Box mt={3} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <img src={emptySale} alt="Empty Sales" className={classes.emptyQuotesLogo} />
            <Typography className={classes.emptyQuotesTopic}>No sales yet!</Typography>
            <Typography className={classes.emptyQuotesText}>It appears as though you haven't made a sale yet. Start making sales now.</Typography>
            <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={createSales}
            >
                Make Your First Sale
            </Button>
        </Box>
    )
}

export default EmptySalesList
