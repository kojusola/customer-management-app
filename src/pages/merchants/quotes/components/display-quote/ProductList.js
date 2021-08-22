import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import StyledTextField from 'components/StyledTextField/StyledTextField';
import Percentage from "assets/icons/percentage.svg";
import makeStyles from '@material-ui/core/styles/makeStyles';
import { moneyFormatter } from 'helpers';



const useStyles = makeStyles(theme => ({
    horizontal: {
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid #CBC2D1',
        paddingBottom: "4px",
        marginBottom: 10
    }
}))

function ProductList({ products, isXS }) {
    const classes = useStyles();

    const calcDiscount = (sellingPrice = 1, quantity = 1, discount = 0) => {
        return ((discount / (sellingPrice * quantity)) * 100).toFixed(2)
    }
    return (
        <>
            {products?.map(product => <Box key={product.id} width="100%" className={classes.horizontal}>
                <Grid container spacing={1}>
                    <Grid item md={4} xs={9}>
                        <StyledTextField
                            margin="normal"
                            label="Product name"
                            type="text"
                            required={false}
                            contentEditable={false}
                            value={product?.unique_name || ''}
                        />
                    </Grid>
                    <Grid item md={1} xs={3}>
                        <StyledTextField
                            margin="normal"

                            label="Qty"
                            type="text"

                            required={false}
                            contentEditable={false}
                            value={product?.product_quantity_quoted || ''}
                        />
                    </Grid>
                    <Grid item md={2} sm={4} xs={6}>
                        <StyledTextField
                            margin="normal"

                            label="Unit price"
                            type="text"

                            required={false}
                            contentEditable={false}
                            value={product?.product_unit_price_quoted || ''}
                        />
                    </Grid>
                    <Grid item md={2} sm={3} xs={6}>
                        <StyledTextField
                            margin="normal"

                            type="text"
                            required={false}
                            contentEditable={false}
                            value={calcDiscount(product?.unit_price, product?.product_quantity_quoted, product?.product_discount_quoted)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><img src={Percentage} alt="percentage"></img></InputAdornment>
                            }}

                        />
                    </Grid>
                    <Grid item md={3} sm={5} xs={12}>
                        <StyledTextField
                            margin="normal"
                            inputProps={{
                                style: { textAlign: isXS ? 'left' : 'right' }
                            }}
                            type="text"
                            required={false}
                            contentEditable={false}
                            value={`N${moneyFormatter(product?.product_amount_quoted)}` || ''}
                        />
                    </Grid>
                </Grid>
            </Box>)}

        </>
    )
}

export default ProductList
