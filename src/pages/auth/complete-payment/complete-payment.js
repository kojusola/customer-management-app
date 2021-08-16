import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useData } from 'data';
import { Spinner, SimpleTable } from "components";
import { useParams } from 'react-router-dom';
import { moneyFormatter } from 'helpers';
import { makeStyles } from '@material-ui/core/styles';


const columns = [
    { key: 'name', label: 'Item' },
    { key: 'quantity', label: 'Quantity' },
    { key: 'price', label: 'Price' },
    { key: 'subtotal', label: 'Subtotal' },
]

const useStyles = makeStyles(theme => ({
    color: {
        color: theme.palette.primary.main
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: `solid 2px ${theme.palette.primary.main}`,
        padding: '0px 10px'
    }
}))

function CompletePayment() {

    const { urlId } = useParams();

    const { isLoading, data } = useData(`complete-payment/${urlId}`);

    const classes = useStyles();

    // console.log(data);

    const rows = data?.data?.products_ordered?.map(product => ({
        id: product.id,
        name: product.unique_name,
        quantity: product.quantity_ordered,
        subtotal: `₦${moneyFormatter(product.subtotal_per_product_ordered)}`,
        price: product.subtotal_per_product_ordered / product.quantity_ordered
    }));

    const getTotal = () => {
        return data?.data?.products_ordered?.reduce((accum, curr) => accum = accum + curr.subtotal_per_product_ordered, 0)
    }

    if (isLoading) return <Box display="flex" justifyContent="center">
        <Spinner />
    </Box>
    return (
        <Box px={4} style={{ background: 'gainsboro', border: 'solid 1px gainsboro', height: '100vh' }}>
            <Box mt={4} alignItems="center">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Box>
                            <Typography className={classes.color}>
                                {`${data?.data?.customer?.user?.first_name} ${data?.data?.customer?.user?.last_name}`}
                            </Typography>
                            <Typography className={classes.color}>
                                {data?.data?.customer?.user?.email}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box>
                            <Typography className={classes.color}>{data?.data?.store?.name}</Typography>
                            <Typography className={classes.color}>{data?.data?.store?.address}</Typography>

                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={2}>
                <Grid item sm={12} md={9} style={{ width: '100%' }}>
                    <Box mt={7}>
                        {rows?.length ? <SimpleTable columns={columns} rows={rows} /> : null}
                    </Box>
                </Grid>
                <Grid item sm={12} xs={12} md={3}>
                    <Box mt={7} className={classes.box}>
                        <Typography style={{
                            textAlign: "center",
                            fontSize: "30px",
                            letterSpacing: "2px"
                        }}>Total</Typography>
                        <Box width="100%" color="#FFFFFF" mb={4} style={{
                            backgroundColor: "#513166",
                            borderRadius: 5,
                            color: "FFFFFF",
                            fontSize: 25,
                            padding: '6px 0px',

                        }}>
                            <Typography style={{ textAlign: 'center', width: '100%' }}>₦ {moneyFormatter(getTotal())}</Typography>
                        </Box>
                        <Box width="100%" mb={4}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => { }}
                                className={classes.paymentBtn}>

                                Complete Payment
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CompletePayment
