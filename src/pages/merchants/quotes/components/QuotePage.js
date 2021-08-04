import React, { useState, Fragment } from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import StyledSelect from 'components/StyledSelectField/StyledSelectField';
import Grid from '@material-ui/core/Grid';
import StyledTextField from 'components/StyledTextField/StyledTextField';
import { components } from "react-select";
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";
import DeleteOutline from "@material-ui/icons/DeleteOutline";



import AddProduct from "./AddProduct";
import Dialog from './Dialog';
import CancelButton from "./CancelButton";
import CloseDialog from "./CloseDialog";
import OutlinedButton from "./OutlinedButton";




const Menu = (props) => {
    const classes = useStyles();
    return (
        <Fragment>
            <components.Menu {...props}>
                <Box p={1} style={{
                    textAlign: "left",
                }}>
                    <Button
                        startIcon={<AddIcon />}
                        onClick={props.selectProps.toggleAddProduct}
                        className={classes.selectButton}
                    >
                        Add new Product
                    </Button>
                </Box>
            </components.Menu>
        </Fragment>
    );
};

const useStyles = makeStyles((theme) => ({
    selectGrid: {
        marginTop: '4px',
        marginLeft: '5px'
    },
    sideFieldsTextState: {
        marginTop: '5px',
        height: '25px',
        fontFamily: theme.custom.typography,
        "& .MuiInputBase-root": {
            height: 36,
            "& input": {
                textAlign: "center"
            }
        },
        "& .MuiFormLabel-root": {
            fontSize: '15px',
        }
    },
    fieldsText: {
        fontFamily: theme.custom.typography,
        height: "30px",
    },
    selectButton: {
        border: '0',
        backgroundColor: theme.palette.secondary.background,
        color: theme.palette.success.background,
        display: "flex",
        fontSize: "10px",
        padding: "8px 20px 8px",
        width: "100%",
        height: "100%",
        textAlign: "left",
        borderRadius: "2px",
        justifyContent: 'flex-start',
        textTransform: 'none'
    },
    sideFieldsText: {
        fontFamily: theme.custom.typography,
    },
    sideGrid: {
        paddingLeft: "5px"

    },
    infoText: {
        backgroundColor: theme.palette.secondary.info,
        TextColor: theme.palette.secondary.info,
        fontSize: '8px',
        fontFamily: theme.custom.typography,
    },
    detailsText: {
        border: "0",
        width: "100%",
        backgroundColor: theme.palette.secondary.background,
        margin: "0",
        marginTop: "10px",
        padding: "7px",
        borderRadius: "4px",
        fontSize: "12px",
        color: "#281833",
        textTransform: 'none',
        '&:hover': {
            background: theme.palette.secondary.background
        }
    },
    detailsText2: {
        border: "0",
        width: "100%",
        backgroundColor: theme.palette.secondary.danger,
        margin: "0",
        marginTop: "10px",
        padding: "4px",
        display: 'flex',
        marginBottom: "10px",
        borderRadius: "4px",

    },
    horizontal: {
        width: "80px",
        margin: " auto ",
    },
    selectGridProduct: {
        marginTop: '17px',
    },
    sideGridProduct: {
        paddingLeft: '5px'
    },
    sideGridProductDelete: {
        marginTop: "15px",
        marginBottom: "15px",
        display: "flex",
        justifyContent: "flex-end",
    },
    boldText: {
        fontWeight: "600",
        fontSize: "20px"
    },
}))

function QuotePage({ isOpen, toggle }) {
    const classes = useStyles();

    const [isAddProduct, setIsAddProduct] = useState(false);

    const toggleAddProduct = () => setIsAddProduct(open => !open)


    const Product = () => {
        return <>
            <Grid container spacing={1}>
                <Grid item md={6} sm={12} xs={12} >
                    <Box mt={2}>
                        <StyledSelect
                            name="customers"
                            placeholder={
                                <span>
                                    Product name<sup>*</sup>
                                </span>
                            }
                            classNamePrefix="react-select"
                            menuPlacement="auto"
                            components={{ Menu }}
                            toggleAddProduct={toggleAddProduct}
                        />
                    </Box>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <StyledTextField
                                margin="normal"
                                id="quantity"
                                label="Qty"
                                type="numeric"
                                name="quantity"
                                autoComplete="quantity"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <StyledTextField
                                margin="normal"
                                id="unit-price"
                                label="Unit Price"
                                type="text"
                                name="unit-price"
                                autoComplete="unit-price"


                            />
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={5}>
                    <StyledTextField
                        margin="normal"
                        id="discount"
                        label="Discount"
                        type="text"
                        name="discount"
                        autoComplete="discount"


                    />
                </Grid>
                <Grid item xs={5}>
                    <StyledTextField
                        margin="normal"
                        id="amount"
                        label="Amount"
                        type="text"
                        name="ageRange"
                        autoComplete="ageRange"

                    />
                </Grid>
                <Grid item xs={2}>
                    <Box mt={2} display="flex" justifyContent="flex-end">

                        <IconButton style={{
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
    }

    return (
        <>
            <AddProduct isOpen={isAddProduct} toggle={toggleAddProduct} />
            <Dialog isOpen={isOpen} toggleDialog={toggle}>
                <Box>
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
                            }}>Add New Quote</Typography>
                            <CloseDialog toggle={toggle} />
                        </Box>
                        <Box style={{
                            padding: "30px"
                        }}>
                            <StyledTextField
                                margin="normal"
                                id="quote-name"
                                label="Quote Name"
                                name="quote-name"
                            />
                            <hr className={classes.horizontal}></hr>
                            <Product />

                            <Button
                                startIcon={<AddIcon />}
                                onClick={() => { }}
                                className={classes.detailsText}>

                                Add another product

                            </Button>
                            <Box px={4} py={3} my={3} border={1} borderColor="#cbc2d1"
                                style={{
                                    borderRadius: "8px",
                                    fontSize: "12px",
                                    border: "1px solid #CBC2D1"
                                }}>
                                <Box display="flex"
                                    style={{
                                        justifyContent: "space-between",
                                        padding: "5px 0 5px"
                                    }}>
                                    <Typography style={{
                                        fontSize: "10px",
                                        fontWeight: "600"
                                    }}>Subtotal:</Typography>
                                    <Typography
                                        style={{
                                            fontSize: "10px",
                                            color: "#9783A3"
                                        }}>N0.00</Typography>
                                </Box>
                                <Box display="flex"
                                    style={{
                                        justifyContent: "space-between",
                                        padding: "5px 0 5px"
                                    }}>
                                    <Typography
                                        style={{
                                            fontSize: "10px",
                                            color: "#9783A3"
                                        }}>Tax:</Typography>
                                    <Typography
                                        style={{
                                            fontSize: "10px",
                                            color: "#9783A3"
                                        }}>N0.00</Typography>
                                </Box>
                                <Box display="flex"
                                    style={{
                                        justifyContent: "space-between",
                                        padding: "5px 0 5px"
                                    }}>
                                    <Typography
                                        style={{
                                            fontSize: "10px",
                                            color: "#9783A3"
                                        }}>Shipping/Handling</Typography>
                                    <Typography
                                        style={{
                                            fontSize: "10px",
                                            color: "#9783A3"
                                        }}>N0.00</Typography>
                                </Box>
                                <Box display="flex"
                                    style={{
                                        justifyContent: "space-between",
                                        padding: "5px 0 5px"
                                    }}>
                                    <Typography style={{
                                        fontSize: "10px",
                                        fontWeight: "600"
                                    }}>Total:</Typography>
                                    <Typography
                                        style={{
                                            fontSize: "10px",
                                            color: "#9783A3"
                                        }}>N0.00</Typography>
                                </Box>
                            </Box>
                            <Box>
                                <StyledSelect
                                    name="state"
                                    placeholder={
                                        <Typography component="span">
                                            Assigned To <sup>*</sup>
                                        </Typography>
                                    }

                                    classNamePrefix="react-select"
                                    menuPlacement="auto"
                                    maxMenuHeight={90}
                                />
                            </Box>
                            <StyledTextField
                                margin="normal"
                                id="remark"
                                label="Remark"
                                name="remark"
                            />
                        </Box>
                        <Box display="flex" pt={1} p={1} style={{
                            justifyContent: "space-between",
                            backgroundColor: "#EEEBF0"
                        }}>
                            <CancelButton
                                handleOnClicked={toggle} />
                            <Box>
                                <CancelButton
                                    handleOnClicked={toggle}
                                    text="Back"
                                />
                                <OutlinedButton
                                    onClick={toggle}
                                    text="Add Quote"
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Dialog>
        </>
    );
}

export default QuotePage;