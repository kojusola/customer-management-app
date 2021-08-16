import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';

import StyledTextField from 'components/StyledTextField/StyledTextField';
import StyledSelect from 'components/StyledSelectField/StyledSelectField';
import { ValidationError } from "components";


//APIs
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//schemas
import { createQuoteProductSchema } from "validators";
import { useEffect } from 'react';

const defaultVals = {
    discount: '',
    unitPrice: '',
    quantity: '',
    amount: '',
    name: ''
}

function QuoteProduct({ classes, products = [], toggleAddProduct, addQuoteProduct }) {

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        getValues,
        reset
    } = useForm({
        resolver: yupResolver(createQuoteProductSchema),
    });

    const watchedFields = watch(['quantity', 'unitPrice', 'discount']);

    useEffect(() => {
        let { discount, quantity, unitPrice } = getValues()
        quantity = +quantity || 1;
        unitPrice = +unitPrice || 0;
        discount = +discount || 0;
        const amount = ((quantity * unitPrice) - discount) || '';
        setValue('amount', amount)

        // eslint-disable-next-line
    }, [watchedFields])


    const addProductAction = {
        value: 0, label: <Button startIcon={<AddIcon />}
            style={{ textTransform: 'none' }}
            onClick={e => {
                e.stopPropagation()
                toggleAddProduct()
            }}
            className={classes.selectButton}
        >
            Add new product
        </Button>
    }


    return (
        <form noValidate onSubmit={handleSubmit(addQuoteProduct)}>
            <Grid container spacing={1}>
                <Grid item md={6} sm={12} xs={12} >
                    <Box mt={2}>
                        <Controller
                            control={control}
                            name="name"
                            defaultValue=""
                            render={({ field }) => <StyledSelect
                                placeholder={
                                    <span>
                                        Product name<sup>*</sup>
                                    </span>
                                }
                                toggleAddProduct={toggleAddProduct}
                                values={products?.data?.map(product => ({ value: product.id, label: product.unique_name }))?.concat([addProductAction])}
                                {...field}
                            />}
                        />
                        <ValidationError message={errors.name?.message} />
                    </Box>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Controller
                                name="quantity"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <StyledTextField
                                    margin="normal"
                                    label="Qty"
                                    type="numeric"
                                    {...field}
                                />}
                            />
                            <ValidationError message={errors.quantity?.message} />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="unitPrice"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <StyledTextField
                                    margin="normal"
                                    label="Unit Price"
                                    type="numeric"
                                    {...field}
                                />}
                            />
                            <ValidationError message={errors.unitPrice?.message} />
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item sm={5} xs={6}>
                    <Controller
                        name="discount"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <StyledTextField
                            margin="normal"
                            label="Discount"
                            type="numeric"
                            required={false}
                            {...field}
                        />}
                    />
                </Grid>
                <Grid item sm={5} xs={6} >
                    <Controller
                        name="amount"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <StyledTextField
                            margin="normal"
                            label="Amount"
                            type="numeric"
                            required={false}
                            {...field}
                        />}
                    />
                </Grid>
                <Grid item sm={2} xs={12}>
                    <Box mb={2} mt={2} display="flex" justifyContent="flex-end">
                        <Button fullWidth color="primary" variant="outlined" style={{ textTransform: 'none', height: 39 }} onClick={() => reset(defaultVals)}>Reset</Button>
                    </Box>
                </Grid>

            </Grid>
            <hr className={classes.horizontal}></hr>

            <Button
                type="submit"
                startIcon={<AddIcon />}
                className={classes.detailsText}>

                Add product

            </Button>
        </form>
    )
}

export default QuoteProduct
