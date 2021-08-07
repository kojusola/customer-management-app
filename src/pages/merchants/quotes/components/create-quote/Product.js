import Box from "@material-ui/core/Box";

import StyledSelect from 'components/StyledSelectField/StyledSelectField';
import Grid from '@material-ui/core/Grid';
import StyledTextField from 'components/StyledTextField/StyledTextField';

import IconButton from "@material-ui/core/IconButton";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

function Product({ classes, product, removeQuoteProduct, toggleAddProduct }) {
    return (
        <><Grid container spacing={1}>
            <Grid item md={6} sm={12} xs={12} >
                <Box mt={2}>
                    <StyledSelect
                        isDisabled={true}
                        name="name"
                        placeholder={
                            <span>
                                Product name<sup>*</sup>
                            </span>
                        }
                        selected={0}
                        toggleAddProduct={toggleAddProduct}
                        values={[product.name]}

                    />
                </Box>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <StyledTextField
                            margin="normal"
                            label="Qty"
                            type="numeric"
                            value={product.quantity}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <StyledTextField
                            margin="normal"
                            label="Unit Price"
                            value={product.unitPrice}
                            disabled
                        />
                    </Grid>
                </Grid>

            </Grid>
        </Grid>
            <Grid container spacing={1}>
                <Grid item xs={5}>
                    <StyledTextField
                        margin="normal"
                        label="Discount"
                        value={product.discount}
                        disabled
                    />
                </Grid>
                <Grid item xs={5}>
                    <StyledTextField
                        margin="normal"
                        label="Amount"
                        value={product.amount}
                        disabled
                    />
                </Grid>
                <Grid item xs={2}>
                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <IconButton onClick={() => removeQuoteProduct(product)} style={{
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "4px",
                            width: 25,
                            height: 40,
                            background: '#EEEBF0'

                        }}>
                            <DeleteOutline />
                        </IconButton>
                    </Box>

                </Grid>
            </Grid>
            <hr className={classes.horizontal}></hr>
        </>
    )
}

export default Product
