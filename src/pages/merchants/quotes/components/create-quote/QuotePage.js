import React, { useState } from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";

import StyledSelect from 'components/StyledSelectField/StyledSelectField';
import StyledTextField from 'components/StyledTextField/StyledTextField';
import QuoteProduct from "./QuoteProduct";
import ConfirmQoute from "./ConfirmQoute";



import AddProduct from "./AddProduct";
import Product from "./Product";
import { Dialog } from '../Dialog';
import CancelButton from "../CancelButton";
import CloseDialog from "../CloseDialog";
import OutlinedButton from "../OutlinedButton";
import { useData } from 'data';

import { useEffect } from "react"

//APIs
import { useForm, Controller } from 'react-hook-form';
import { useMutation, mutateFunction } from 'libs/apis';
import { useSnackbar } from 'notistack';
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { getAuthUser } from "libs/auth";
import { v4 } from "uuid";
import { useDispatch, useSelector } from 'react-redux';

import { setAssignedTo, setName, setRemark, addProduct, removeProduct, toggleShowSelectCustomer } from "app/features/quoteSlice";



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
    const [confirm, setConfirm] = useState(false);

    const { isLoading, mutate } = useMutation(mutateFunction);

    const quote = useSelector(state => state.quote);
    const dispatch = useDispatch()


    const { data: products } = useData('products/all');

    const { data: users } = useData('stores/all-users');

    const [enabled, setEnabled] = useState(false);

    const store = getAuthUser().merchant?.stores?.[0];


    const toggleAddProduct = () => setIsAddProduct(open => !open)

    const toggleConfirm = () => setConfirm(open => !open);


    const {
        control,
        watch,
    } = useForm({

    });


    const watchedFields = watch(['quoteName', 'assignedTo', 'remark'])


    const { enqueueSnackbar } = useSnackbar();

    const client = useQueryClient()

    const { replace } = useHistory()


    useEffect(() => {

        if (quote.products.length && quote.assignedTo && quote.quoteName?.trim()) {
            setEnabled(true)
        } else setEnabled(false);

    }, [quote])

    const quoteName = watchedFields[0];
    const assignedTo = watchedFields[1];
    const remark = watchedFields[2];

    useEffect(() => {
        dispatch(setName(quoteName));
        dispatch(setAssignedTo(assignedTo));
        dispatch(setRemark(remark));

        // eslint-disable-next-line
    }, [quoteName, assignedTo, remark])


    const addQuoteProduct = (product) => {
        const selectedProduct = products?.data?.find(prod => prod.id === +product.name.value);
        if (product.quantity > selectedProduct.quantity) {
            return enqueueSnackbar(`You only have ${selectedProduct.quantity} piece(s) of this product in stock`, { variant: 'error' })
        }
        dispatch(addProduct(product))
    }
    const removeQuoteProduct = (product) => {
        dispatch(removeProduct(product))
    }


    const getSubtotal = (products = []) => {
        return products.reduce((accum, curr) => accum = accum + curr.amount, 0);
    }

    const saveQuote = () => {
        const products = quote.products.map(product => ({
            ...product,
            productId: product.name.value,
            discount: product.discount || 0
        }));
        const customerId = quote.customerId?.customerId?.value;
        const assigneeId = quote.assignedTo.value;
        const name = quote.quoteName;
        const remark = quote.remark;
        const subtotal = getSubtotal(quote.products);
        const total = subtotal;
        const quoteObj = { products, customerId, assigneeId, name, remark, subtotal, total }
        mutate({ key: 'quotes', method: 'post', data: quoteObj }, {
            onSuccess(res) {
                enqueueSnackbar(res.message, { variant: 'success' });
                client.invalidateQueries('quotes');
                dispatch(toggleShowSelectCustomer())
                replace(`/quotes/${res.data.id}`);
            }
        })
    }

    return (
        <>
            <ConfirmQoute isLoading={isLoading} saveQuote={saveQuote} isOpen={confirm} toggleDialog={toggleConfirm} />
            <AddProduct branches={[store]} isOpen={isAddProduct} toggle={toggleAddProduct} />
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
                            <Controller
                                name="quoteName"
                                defaultValue={quote?.quoteName || ''}
                                control={control}
                                render={({ field }) => <StyledTextField
                                    margin="normal"
                                    label="Quote Name"
                                    {...field}
                                />}
                            />
                            <hr className={classes.horizontal}></hr>

                            {quote.products?.length ? quote.products.map((product) => <Product removeQuoteProduct={removeQuoteProduct} classes={classes} key={v4()} product={product} toggleAddProduct={toggleAddProduct} />) : null}

                            <QuoteProduct addQuoteProduct={addQuoteProduct} products={products} classes={classes} toggleAddProduct={toggleAddProduct} />

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
                                        fontWeight: "600"
                                    }}>Subtotal:</Typography>
                                    <Typography
                                        style={{

                                            color: "#9783A3"
                                        }}>N{getSubtotal(quote.products) || 0.00}</Typography>
                                </Box>
                                <Box display="flex"
                                    style={{
                                        justifyContent: "space-between",
                                        padding: "5px 0 5px"
                                    }}>
                                    <Typography
                                        style={{

                                            color: "#9783A3"
                                        }}>Tax:</Typography>
                                    <Typography
                                        style={{

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

                                            color: "#9783A3"
                                        }}>Shipping/Handling</Typography>
                                    <Typography
                                        style={{

                                            color: "#9783A3"
                                        }}>N0.00</Typography>
                                </Box>
                                <Box display="flex"
                                    style={{
                                        justifyContent: "space-between",
                                        padding: "5px 0 5px"
                                    }}>
                                    <Typography style={{

                                        fontWeight: "600"
                                    }}>Total:</Typography>
                                    <Typography
                                        style={{

                                            color: "#9783A3"
                                        }}>N{getSubtotal(quote.products) || 0.00}</Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Controller
                                    name="assignedTo"
                                    control={control}
                                    defaultValue={quote?.assignedTo || ''}
                                    render={({ field }) => <StyledSelect
                                        name="state"
                                        placeholder={
                                            <Typography component="span">
                                                Assigned To <sup>*</sup>
                                            </Typography>
                                        }
                                        classNamePrefix="react-select"
                                        menuPlacement="auto"
                                        maxMenuHeight={90}
                                        values={users?.data?.map(person => ({ value: person.user.id, label: `${person.user.first_name} ${person.user.last_name}` }))}
                                        {...field}
                                    />}
                                />
                            </Box>
                            <Controller
                                name="remark"
                                control={control}
                                defaultValue={quote?.remark || ''}
                                render={({ field }) => <StyledTextField
                                    margin="normal"
                                    required={false}
                                    label="Remark"
                                    {...field}
                                />}
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
                                    onClick={toggleConfirm}
                                    text="Save Quote"
                                    disabled={!enabled}
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