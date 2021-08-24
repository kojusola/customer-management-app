import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import StyledTextField from 'components/StyledTextField/StyledTextField';
import Percentage from "assets/icons/percentage.svg";
import makeStyles from '@material-ui/core/styles/makeStyles';
import { moneyFormatter, useMediaQueries } from 'helpers';



const useStyles = makeStyles(theme => ({
    horizontal: {
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid #CBC2D1',
        paddingBottom: "4px",
        marginBottom: 10
    }
}))

function ProductList({ products }) {
    const classes = useStyles();

    const { xsAndDown } = useMediaQueries();

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
                            value={product?.quantity_ordered || ''}
                        />
                    </Grid>
                    <Grid item md={2} sm={4} xs={6}>
                        <StyledTextField
                            margin="normal"

                            label="Unit price"
                            type="text"

                            required={false}
                            contentEditable={false}
                            value={product?.unit_price || ''}
                        />
                    </Grid>
                    <Grid item md={2} sm={3} xs={6}>
                        <StyledTextField
                            margin="normal"

                            type="text"
                            required={false}
                            contentEditable={false}
                            value={0.00}
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><img src={Percentage} alt="percentage"></img></InputAdornment>
                            }}

                        />
                    </Grid>
                    <Grid item md={3} sm={5} xs={12}>
                        <StyledTextField
                            margin="normal"
                            inputProps={{
                                style: { textAlign: xsAndDown ? 'left' : 'right' }
                            }}
                            type="text"
                            required={false}
                            contentEditable={false}
                            value={`N${moneyFormatter(product?.subtotal_per_product_ordered)}` || ''}
                        />
                    </Grid>
                </Grid>
            </Box>)}

        </>
    )
}

export default ProductList
