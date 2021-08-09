import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import StyledSelect from 'components/StyledSelectField/StyledSelectField';
import StyledTextField from 'components/StyledTextField/StyledTextField';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import { getAuthUser } from "libs/auth";
import { useData } from 'data';
import { Link } from "react-router-dom";
import { moneyFormatter, useDisclosures } from "helpers";
import AddNewCustomer from '../quotes/components/create-quote/AddNewCustomer';
import AddProduct from '../quotes/components/create-quote/AddProduct';
import { ValidationError, SimpleTable } from "components";

//APIs
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//schemas
import { createSaleSchema } from "validators";
import { useState } from 'react';



const columns = [
    { key: 'name', label: 'Item' },
    { key: 'quantity', label: 'Quantity' },
    { key: 'price', label: 'Price' },
    { key: 'subtotal', label: 'Subtotal' },
    { key: 'action', label: null },
]



const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'inherit',
        margin: 0,
        padding: 0,
    },
    continueButton: {
        border: '0',
        backgroundColor: theme.palette.button.main,
        color: "#FFFFFF",
        fontSize: "11px",
        fontWeight: "600",
        borderRadius: "4px",
        paddingTop: "9px",
        paddingBottom: "9px",
        width: '55px',
        height: '39px',
    },
    label: {
        fontSize: 15,
        color: theme.palette.button.progress,
        marginTop: 30,
        textAlign: 'center',
        marginBottom: 5,
    },
    FieldsText: {
        marginTop: "5px",
        marginBottom: "5px",
        "& .MuiInputBase-root": {
            height: 30,
            "& input": {
                textAlign: "center"
            }
        }
    },
    sideFieldsText: {
        marginTop: "0"
    },
    resize: {
        fontSize: "10px"
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main
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

}))

function CreateSale() {

    const classes = useStyles();

    // const { push } = useHistory();

    const { data } = useData('customers/all');
    const { data: products } = useData('products/all');

    const [allSales, setAllSales] = useState([]);

    const store = getAuthUser().merchant?.stores?.[0];

    const { isOpen, toggle: toggleCustomer } = useDisclosures();
    const { isOpen: isAddProductOpen, toggle: toggleProduct } = useDisclosures();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createSaleSchema),
    });

    const action = {
        value: 0, label: <Button startIcon={<AddIcon />}
            style={{ textTransform: 'none' }}
            onClick={e => {
                e.stopPropagation()
                toggleCustomer()
            }}
            className={classes.selectButton}
        >
            Add new customer
        </Button>
    }

    const addProductAction = {
        value: 0, label: <Button startIcon={<AddIcon />}
            style={{ textTransform: 'none' }}
            onClick={e => {
                e.stopPropagation()
                toggleProduct()
            }}
            className={classes.selectButton}
        >
            Add new product
        </Button>
    }

    const addSale = (sale) => {
        const selectedProduct = products?.data?.find(product => product.id === +sale.product.value);
        setAllSales(sales => {
            const newSales = [{
                ...sale,
                price: selectedProduct?.unit_price,
                subtotal: selectedProduct?.unit_price * sale.quantity,
                name: sale.product.label,
                id: selectedProduct.id,
                action: <IconButton style={{ color: 'red' }} onClick={() => removeSale(selectedProduct.id)}>
                    <DeleteOutlinedIcon />
                </IconButton>
            },
            ...sales
            ]
            return [...new Map(newSales.map(newSale => [newSale.id, newSale])).values()]
        })
    }
    const removeSale = (saleId) => {
        setAllSales(sales => sales.filter(sale => sale.id !== saleId))
    }
    const getTotal = () => {
        return allSales.reduce((accum, curr) => accum = accum + curr.subtotal, 0)
    }
    console.log({ allSales });

    return (
        <Box className={classes.background}>
            <AddNewCustomer isOpen={isOpen} toggle={toggleCustomer} />
            <AddProduct branches={[store]} isOpen={isAddProductOpen} toggle={toggleProduct} />
            <Box mb={3}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link color="inherit" to="/sales" className={classes.link}>
                        Sales
                    </Link>
                    <Typography color="textPrimary">Make a sale</Typography>
                </Breadcrumbs>
            </Box>
            <Grid container spacing={2}>
                <Grid item sm={12} md={9} style={{ width: '100%' }}>
                    <form noValidate onSubmit={handleSubmit(addSale)}>
                        <Grid container spacing={1}>
                            <Grid item sm={12} xs={12} md={4}>
                                <Box mb={2}>
                                    <Controller
                                        name="customer"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => <StyledSelect
                                            placeholder={

                                                <span>
                                                    Choose Customer <sup>*</sup>

                                                </span>
                                            }
                                            values={data?.data?.map(value => ({ value: value.customer.id, label: `${value.customer.user.first_name} ${value.customer.user.last_name}` }))?.concat([action])}
                                            {...field}
                                        />}
                                    />
                                    <ValidationError message={errors.customer?.message} />
                                </Box>
                            </Grid>
                            <Grid item sm={12} xs={12} md={4}>
                                <Box mb={2}>
                                    <Controller
                                        name="product"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => <StyledSelect
                                            placeholder={
                                                <Typography component="span">
                                                    New Entry <sup>*</sup>
                                                </Typography>
                                            }
                                            values={products?.data?.map(product => ({ value: product.id, label: product.name }))?.concat([addProductAction])}

                                            {...field}
                                        />}
                                    />
                                    <ValidationError message={errors.product?.message} />

                                </Box>
                            </Grid>
                            <Grid item sm={9} xs={8} md={3}>
                                <Controller
                                    name="quantity"
                                    defaultValue=""
                                    control={control}
                                    render={({ field }) => <StyledTextField
                                        className={classes.sideFieldsText}

                                        margin="normal"
                                        label="Qty"
                                        {...field}
                                    />}
                                />
                                <ValidationError message={errors.quantity?.message} />
                            </Grid>
                            <Grid item sm={3} xs={4} md={1} style={{ textAlign: 'right' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ height: 40 }}
                                    type="submit"
                                >
                                    ADD
                                </Button>
                            </Grid>
                        </Grid>

                    </form>
                    <Box mt={7}>
                        {allSales.length ? <SimpleTable columns={columns} rows={allSales} /> : null}
                    </Box>
                </Grid>
                <Grid item sm={12} xs={12} md={3}>
                    <Box mt={8}>
                        <Typography style={{
                            textAlign: "center",
                            fontSize: "30px",
                            letterSpacing: "2px"
                        }}>Total</Typography>
                        <Box color="#FFFFFF" mb={2} style={{
                            backgroundColor: "#513166",
                            boxShadow: "0px 3px 6px #00000029",
                            border: "1px solid #707070",
                            borderRadius: 16,
                            color: "FFFFFF",
                            fontSize: 25,
                            padding: 10,

                        }}>
                            <Typography style={{ textAlign: 'center' }}>N {moneyFormatter(getTotal())}</Typography>
                        </Box>
                        <Box>
                            <Typography className={classes.label} >PAYMENT OPTIONS</Typography>
                            <Box display="flex" style={{
                                border: "1px solid #707070",
                                flexDirection: "column",
                                padding: "15px",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        width: "100px",
                                        padding: "10px",
                                        marginBottom: "10px"
                                    }}>
                                    Cash
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        width: "100px",
                                        padding: "10px",
                                        marginBottom: "10px"
                                    }}>
                                    Transfer
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        width: "100px",
                                        padding: "10px",
                                        marginBottom: "10px"
                                    }}>
                                    USSD
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        width: "100px",
                                        padding: "10px",
                                        marginBottom: "10px",
                                        fontSize: "10px"
                                    }}>
                                    <span>Copy Pay Link</span>
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Grid>

            </Grid>
        </Box>
    )
}

export default CreateSale
