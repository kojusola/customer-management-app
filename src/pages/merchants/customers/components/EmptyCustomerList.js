import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import emptyCustomers from "assets/images/empty-customers.png";
import Button from '@material-ui/core/Button';


function EmptyCustomerList({ classes, createCustomer }) {

    return (
        <Box mt={3} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <img src={emptyCustomers} alt="empty customer list" className={classes.emptyCustomersLogo} />
            <Typography className={classes.emptyCustomersTopic}>No Saved Customer</Typography>
            <Typography className={classes.emptyCustomersText}>You currently do not have any customer record.This is the space where you create and store customer records, spending, etc this will help you make better informed decisions.</Typography>
            <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={createCustomer}
            >
                Create Your First Customer
            </Button>
        </Box>
    )
}

export default EmptyCustomerList
