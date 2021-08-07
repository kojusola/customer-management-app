
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import EmptyQuotes from "assets/icons/EmptyQuotes.svg";


function EmptyQuoteList({ toggle, classes }) {
    return (
        <Box mt={3} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <img src={EmptyQuotes} alt="Empty Quotes" className={classes.emptyQuotesLogo}></img>
            <Typography className={classes.emptyQuotesTopic}>No Quote Yet!</Typography>
            <Typography className={classes.emptyQuotesText}>It appears as though you haven't created a quote yet. With a quote, you can send out pricing estimates to your customers.</Typography>
            <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={toggle}
            >
                Create Your First Sales Quote
            </Button>
        </Box>
    )
}

export default EmptyQuoteList
