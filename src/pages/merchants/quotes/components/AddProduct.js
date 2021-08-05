import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import MuiDialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import { DialogTitled } from './Dialog'
import CancelButton from './CancelButton';
import OutlinedButton from './OutlinedButton';


import { ValidationError } from "components";

import StyledSelect from 'components/StyledSelectField/StyledSelectField';
import StyledTextField from 'components/StyledTextField/StyledTextField';


//APIs
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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



    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createProductSchema),
    });
    const saveProduct = (product) => {
        console.log({ product });
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
                            name="productName"
                            defaultValue=""
                            control={control}
                            render={({ field }) => <StyledTextField
                                margin="normal"

                                label="Product Name"

                                {...field}
                            />}
                        />
                        <ValidationError message={errors.productName?.message} />
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
                                            height: 200
                                        })
                                    }}
                                    {...field}
                                />}
                            />

                        </Box>
                        <ValidationError message={errors.branch?.message} />
                    </Box>
                </DialogContent>
                <DialogActions style={{ padding: 0 }}>
                    <Box width="100%" display="flex" p={1} pt={1} bgcolor="#EEEBF0" justifyContent="flex-end" >
                        <CancelButton
                            handleOnClicked={toggle}
                        />
                        <OutlinedButton
                            type="submit"
                            text="Add Product"
                        />

                    </Box>
                </DialogActions>
            </form>


        </DialogTitled>

    )
}

export default AddProduct
