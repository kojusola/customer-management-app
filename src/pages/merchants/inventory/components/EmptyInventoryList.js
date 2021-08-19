import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import emptySale from "assets/images/empty-sales.png";
import Button from '@material-ui/core/Button';


function EmptyInventoryList({ classes, createInventory }) {

    return (
        <Box mt={3} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <img src={emptySale} alt="Empty products" className={classes.emptyQuotesLogo} />
            <Typography className={classes.emptyQuotesTopic}>No products yet!</Typography>
            <Typography className={classes.emptyQuotesText}>It appears as though you haven't added any product yet. Fill your Inventory now.</Typography>
            <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={createInventory}
            >
                Add Your First Product
            </Button>
        </Box>
    )
}

export default EmptyInventoryList
