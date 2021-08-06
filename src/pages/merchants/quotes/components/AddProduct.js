import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import MuiDialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import { DialogTitled } from './Dialog'
import CancelButton from './CancelButton';
import OutlinedButton from './OutlinedButton';


import { ValidationError, Spinner } from "components";

import StyledSelect from 'components/StyledSelectField/StyledSelectField';
import StyledTextField from 'components/StyledTextField/StyledTextField';


//APIs
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, mutateFunction } from 'libs/apis';
import { useSnackbar } from 'notistack';
import { useQueryClient } from "react-query";

//schemas
import { createProductSchema } from "validators";


const DialogContent = withStyles((theme) => ({
    root: {
        paddingTop: '0px ! important',
        marginTop: '0px ! important',
        padding: 0,
        minHeight: 340,
        overflow: 'hidden'

    },
}))(MuiDialogContent);

function AddProduct({ isOpen, toggle, branches }) {

    const { mutate, isLoading } = useMutation(mutateFunction);


    const { enqueueSnackbar } = useSnackbar();

    const client = useQueryClient()


    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(createProductSchema),
    });
    const saveProduct = (product) => {
        const { branch, color, size, length, height, width } = product;
        const prod = {
            ...product,
            storeId: branch.value,
            dimensions: { length, height, width },
            variant: { color, size }
        }
        mutate({ key: 'products', method: 'post', data: prod }, {
            onSuccess(res) {
                enqueueSnackbar(res.message, { variant: 'success' });
                client.invalidateQueries('products/all')
                reset({});
                toggle();
            }
        })
    }

    return (
        <DialogTitled
            isOpen={isOpen}
            toggleDialog={toggle}
            title="Add New Product"
        >

            <form noValidate onSubmit={handleSubmit(saveProduct)}>

                <DialogContent>
                    <Box
                        style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "8px",
                            padding: "35px 20px 35px"
                        }}>
                        <Controller
                            name="name"
                            defaultValue=""
                            control={control}
                            render={({ field }) => <StyledTextField
                                margin="normal"

                                label="Product Name"

                                {...field}
                            />}
                        />
                        <ValidationError message={errors.name?.message} />
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Controller
                                    name="quantity"
                                    defaultValue=""
                                    control={control}
                                    render={({ field }) => <StyledTextField
                                        margin="normal"
                                        label="Quantity"
                                        {...field}

                                    />}
                                />
                                <ValidationError message={errors.quantity?.message} />
                            </Grid>
                            <Grid item xs={6} >
                                <Controller
                                    name="unitPrice"
                                    defaultValue=""
                                    control={control}
                                    render={({ field }) => <StyledTextField
                                        margin="normal"
                                        label="Unit price"
                                        {...field}
                                    />}
                                />
                                <ValidationError message={errors.unitPrice?.message} />
                            </Grid>
                        </Grid>
                        <Box mt={2} mb="5px">
                            <Controller
                                control={control}
                                name="branch"
                                defaultValue=""
                                render={({ field }) => <StyledSelect
                                    placeholder={
                                        <Typography component="span">
                                            Branch <sup>*</sup>
                                        </Typography>
                                    }
                                    values={branches?.map(store => ({ value: store.id, label: store.name }))}
                                    maxMenuHeight={90}
                                    customStyles={{
                                        menu: base => ({
                                            ...base,
                                            height: 200,
                                            zIndex: 2
                                        })
                                    }}
                                    {...field}
                                />}
                            />

                        </Box>
                        <ValidationError message={errors.branch?.message} />
                        <Box mt={3}>
                            <Typography>Variant</Typography>
                            <Grid container spacing={1} style={{ marginTop: -10 }}>
                                <Grid item xs={6}>
                                    <Controller
                                        defaultValue=""
                                        name="color"
                                        control={control}
                                        render={({ field }) => <StyledTextField
                                            label="Color"
                                            margin="normal"
                                            required={false}
                                            {...field}
                                        />}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        defaultValue=""
                                        name="size"
                                        control={control}
                                        render={({ field }) => <StyledTextField
                                            label="Size"
                                            margin="normal"
                                            required={false}
                                            {...field}
                                        />}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Controller
                            defaultValue=""
                            name="description"
                            control={control}
                            render={({ field }) => <StyledTextField
                                label="Description"
                                margin="normal"
                                required={false}
                                {...field}
                            />}
                        />
                        <Box mt={3}>
                            <Typography>Dimensions</Typography>
                            <Grid container spacing={1} style={{ marginTop: -10 }}>
                                <Grid item xs={6}>
                                    <Controller
                                        defaultValue=""
                                        name="height"
                                        control={control}
                                        render={({ field }) => <StyledTextField
                                            label="Height"
                                            margin="normal"
                                            required={false}
                                            {...field}
                                        />}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        defaultValue=""
                                        name="length"
                                        control={control}
                                        render={({ field }) => <StyledTextField
                                            label="Length"
                                            margin="normal"
                                            required={false}
                                            {...field}
                                        />}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <Controller
                                        defaultValue=""
                                        name="width"
                                        control={control}
                                        render={({ field }) => <StyledTextField
                                            label="Width"
                                            margin="normal"
                                            required={false}
                                            {...field}
                                        />}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        defaultValue=""
                                        name="weight"
                                        control={control}
                                        render={({ field }) => <StyledTextField
                                            label="Weight"
                                            margin="normal"
                                            required={false}
                                            {...field}
                                        />}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions style={{ padding: 0 }}>
                    <Box width="100%" display="flex" p={1} pt={1} bgcolor="#EEEBF0" justifyContent="flex-end" >
                        <CancelButton
                            handleOnClicked={toggle}
                        />
                        <OutlinedButton
                            text={isLoading ? <Spinner text="Adding..." /> : 'Add Product'}
                            type="submit"
                            disabled={isLoading}
                        />

                    </Box>
                </DialogActions>
            </form>


        </DialogTitled>

    )
}

export default AddProduct
