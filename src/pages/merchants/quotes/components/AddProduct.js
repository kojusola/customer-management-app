import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Dialog from './Dialog'
import CancelButton from './CancelButton';
import OutlinedButton from './OutlinedButton';
import CloseDialog from './CloseDialog';

import StyledSelect from 'components/StyledSelectField/StyledSelectField';
import StyledTextField from 'components/StyledTextField/StyledTextField';

function AddProduct({ isOpen, toggle }) {
    return (
        <Dialog
            isOpen={isOpen}
            toggleDialog={toggle}
        >

            <Box
                style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",

                }}>
                <Box display="flex" pt={2} p={2} style={{
                    justifyContent: "space-between",
                    backgroundColor: "#EEEBF0"
                }}>
                    <Typography style={{
                        fontWeight: "600"
                    }}>Add New Product </Typography>
                    <CloseDialog toggle={toggle} />
                </Box>
                <Box style={{
                    padding: "35px 20px 35px"
                }}>
                    <StyledTextField
                        margin="normal"
                        id="product-name"
                        label="Product Name"
                        name="product-name"
                    />

                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <StyledTextField
                                margin="normal"
                                id="quantity"
                                label="Quantity"
                                type="text"
                                name="quantity"
                                autoComplete="quantity"


                            />
                        </Grid>
                        <Grid item xs={6} >
                            <StyledTextField
                                margin="normal"
                                id="unit-price"
                                label="Unit price"
                                type="text"
                                name="unit-price"
                                autoComplete="unit-price"
                            />
                        </Grid>
                    </Grid>
                    <Box>
                        <StyledSelect
                            name="state"
                            placeholder={
                                <Typography component="span">
                                    Branch <sup>*</sup>
                                </Typography>
                            }

                            classNamePrefix="react-select"
                            menuPlacement="auto"
                            maxMenuHeight={90}
                        />
                    </Box>
                </Box>
                <Box display="flex" pt={1} p={1} style={{
                    justifyContent: "flex-end",
                    backgroundColor: "#EEEBF0"
                }}>
                    <CancelButton
                        handleOnClicked={toggle}
                    />
                    <OutlinedButton
                        onClick={toggle}
                        text="Add Product"
                    />
                </Box>
            </Box>

        </Dialog>

    )
}

export default AddProduct
