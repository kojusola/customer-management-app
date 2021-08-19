import React, { useRef, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import StyledTextField from 'components/StyledTextField/StyledTextField';
import ImageUpload from 'assets/icons/imageBackground.svg';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from "react-router-dom";

import { ValidationError, Spinner, OutlinedButton } from "components";

//APIs
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, mutateFunction } from 'libs/apis';
import { useSnackbar } from 'notistack';
import { useQueryClient } from "react-query";
import { getAuthUser } from "libs/auth";
import { validateFileSize } from 'helpers';
import { useHistory } from "react-router-dom";

//schemas
import { createProductSchema } from "validators";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.secondary.background,
        margin: "10px",
        padding: "0",
        fontFamily: theme.custom.typography,
    },

    cancelButton: {
        border: "1px solid #513166",
        borderRadius: "12px",
        backgroundColor: "#FFFFFF",
        color: theme.palette.button.main,
        fontSize: "13px",
        padding: "10px",
        textAlign: "center",
        marginTop: 10
    },

    label: {
        fontSize: "12px",
        color: theme.palette.button.progress,
        marginTop: "4px"
    },
    sideFieldsText: {
        marginTop: "5px"
    },
    longSideFieldsText: {
        marginTop: "5px",

    },

    uploadImage: {
        backgroundImage: `url(${ImageUpload})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        height: "150px",
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main
    },

}))

function CreateInventory() {
    const classes = useStyles()
    const inputRef = useRef(null);

    const store = getAuthUser().merchant?.stores?.[0];

    const [file, setFile] = useState(null);

    const [dataUrl, setDataUrl] = useState(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createProductSchema),
    });

    const { mutate, isLoading } = useMutation(mutateFunction);

    const { enqueueSnackbar } = useSnackbar();

    const client = useQueryClient()

    const { push } = useHistory()


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!validateFileSize(file, enqueueSnackbar, 10)) return;
        setFile(file);
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            setDataUrl(reader.result);
        });
        reader.readAsDataURL(file);
    };

    const saveProduct = (product) => {
        const { color, size, length, height, width, } = product;
        let prod = new FormData();
        if (!file) {
            prod = {
                ...product,
                storeId: store.id,
                dimensions: { length, height, width },
                variant: { color, size }
            }
        } else {
            prod.append('picture', file);
            prod.append('dimensions.length', length);
            prod.append('dimensions.height', height);
            prod.append('dimensions.width', width);
            prod.append('variant.color', color);
            prod.append('variant.size', size);
            prod.append('name', product.name);
            prod.append('description', product.description);
            prod.append('unitPrice', product.unitPrice);
            prod.append('quantity', product.quantity);
            prod.append('storeId', store.id);
            prod.append('weight', product.weight);
        }
        mutate({ key: 'products', method: 'post', data: prod }, {
            onSuccess(res) {
                enqueueSnackbar(res.message, { variant: 'success' });
                client.invalidateQueries('products/all');
                push('/inventory')
            }
        })
    }

    return (
        <Box className={classes.background}>
            <Box mb={3}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    <Link color="inherit" to="/inventory" className={classes.link}>
                        Inventory
                    </Link>
                    <Typography color="textPrimary">Create a product</Typography>
                </Breadcrumbs>
            </Box>
            {/* <Box w="100%" mt="40px" display="flex" justifyContent="flex-end">
                <Button
                    className={classes.continueButton}>
                    Save Product
                </Button>
            </Box> */}
            <form noValidate onSubmit={handleSubmit(saveProduct)}>
                <Box mt={8}>
                    <Grid container spacing={1}>
                        <Grid item md={4} xs={12}>
                            <Box pb={2}>
                                <Controller
                                    name="name"
                                    defaultValue=""
                                    control={control}
                                    render={({ field }) => <StyledTextField
                                        margin="normal"
                                        label="Product Name"
                                        className={classes.sideFieldsText}
                                        {...field}
                                    />}
                                />
                                <ValidationError message={errors.name?.message} />

                            </Box>
                            <Box pb={2}>
                                <Controller
                                    defaultValue=""
                                    name="description"
                                    control={control}
                                    render={({ field }) => <StyledTextField
                                        label="Description"
                                        margin="normal"
                                        className={classes.longSideFieldsText}
                                        InputLabelProps={{ required: false }}
                                        multiline
                                        rows={5}
                                        {...field}
                                    />}
                                />

                            </Box>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Box pb={2}>
                                <Controller
                                    name="unitPrice"
                                    defaultValue=""
                                    control={control}
                                    render={({ field }) => <StyledTextField
                                        className={classes.sideFieldsText}
                                        margin="normal"
                                        label="Enter Price"
                                        {...field}
                                    />}
                                />
                                <ValidationError message={errors.unitPrice?.message} />
                            </Box>
                            <Box pb={1}>
                                <Controller
                                    name="quantity"
                                    defaultValue=""
                                    control={control}
                                    render={({ field }) => <StyledTextField
                                        margin="normal"
                                        label="Enter Quantity"
                                        className={classes.sideFieldsText}
                                        style={{
                                            height: "50px"
                                        }}
                                        {...field}

                                    />}
                                />
                                <ValidationError message={errors.quantity?.message} />
                            </Box>
                            <Box pb={2}>
                                <Controller
                                    defaultValue=""
                                    name="weight"
                                    control={control}
                                    render={({ field }) => <StyledTextField
                                        label="Enter Weight (kg)"
                                        margin="normal"
                                        className={classes.sideFieldsText}
                                        InputLabelProps={{ required: false }}
                                        {...field}
                                    />}
                                />
                            </Box>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Box mb="20px" display="flex" flexDirection="column" alignItems="center" justifyContent="center" >

                                <img height="150px" width="90%" src={dataUrl || ImageUpload} alt="upload" />

                                <Button onClick={() => inputRef.current.click()} className={classes.cancelButton}>{dataUrl ? 'CLICK TO CHANGE IMAGE' : 'CLICK TO UPLOAD IMAGE'}</Button>
                                <input ref={inputRef} onChange={handleFileChange} type="file" accept="image/*" hidden />

                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item md={5} xs={12}>
                            <Typography>Dimenstions</Typography>
                            <Grid container spacing={1}>
                                <Grid item md={4} xs={12}>
                                    <Controller
                                        defaultValue=""
                                        name="length"
                                        control={control}
                                        render={({ field }) => <StyledTextField
                                            label="Length (cm)"
                                            margin="normal"
                                            className={classes.sideFieldsText}
                                            InputLabelProps={{ required: false, style: { fontSize: 11 } }}
                                            {...field}
                                        />}
                                    />

                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <Controller
                                        defaultValue=""
                                        name="height"
                                        control={control}
                                        render={({ field }) => <StyledTextField
                                            label="Height (cm)"
                                            margin="normal"
                                            className={classes.sideFieldsText}
                                            InputLabelProps={{ required: false, style: { fontSize: 11 } }}
                                            {...field}
                                        />}
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <Controller
                                        defaultValue=""
                                        name="width"
                                        control={control}
                                        render={({ field }) => <StyledTextField
                                            label="Width (cm)"
                                            margin="normal"
                                            className={classes.sideFieldsText}
                                            InputLabelProps={{ required: false, style: { fontSize: 11 } }}
                                            {...field}
                                        />}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <Typography>Variants</Typography>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <Controller
                                        defaultValue=""
                                        name="color"
                                        control={control}
                                        render={({ field }) => <StyledTextField
                                            label="Color"
                                            margin="normal"
                                            className={classes.sideFieldsText}
                                            InputLabelProps={{ required: false, style: { fontSize: 11 } }}
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
                                            className={classes.sideFieldsText}
                                            InputLabelProps={{ required: false, style: { fontSize: 11 } }}
                                            {...field}
                                        />}
                                    />

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>

                <Box w="100%" mt="10px" p="15px" display="flex" justifyContent="center">
                    <OutlinedButton
                        text={isLoading ? <Spinner text="Saving..." /> : 'Save Product'}
                        type="submit"
                        disabled={isLoading}
                    />
                </Box>
            </form>
        </Box>
    );
}

export default CreateInventory;