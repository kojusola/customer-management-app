import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import StyledSelect from 'components/StyledSelectField/StyledSelectField';
import StyledTextField from 'components/StyledTextField/StyledTextField';

import { ValidationError } from 'components';

//APIs
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


//schemas
import { createBusinessBranchSchema } from "validators";

import { STATES } from 'helpers/constants';


const CreateBranch = ({ classes, addBranch }) => {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createBusinessBranchSchema),
    });



    return <form onSubmit={handleSubmit(addBranch)} noValidate>
        <Controller
            name="name"
            defaultValue=""
            control={control}
            render={({ field }) => <StyledTextField
                margin="normal"

                label="Branch Name"

                className={classes.branchFieldText}
                {...field}
            />}
        />
        <ValidationError message={errors.name?.message} />
        <Controller
            name="address"
            defaultValue=""
            control={control}
            render={({ field }) => <StyledTextField
                margin="normal"

                label="Sub Branch Address"

                className={classes.branchFieldText}
                {...field}
            />}
        />
        <ValidationError message={errors.address?.message} />
        <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
                <Controller
                    name="lga"
                    defaultValue=""
                    control={control}
                    render={({ field }) => <StyledTextField
                        margin="normal"

                        label="LGA"

                        className={classes.sideFieldsText}
                        {...field}
                    />}
                />
                <ValidationError message={errors.lga?.message} />
            </Grid>
            <Grid item xs={12} sm={6} >

                <Box mt="10px">
                    <Controller
                        name="state"
                        control={control}
                        render={({ field }) => (
                            <StyledSelect
                                placeholder={
                                    <span>
                                        State <sup>*</sup>
                                    </span>
                                }
                                isClearable
                                values={STATES.map((state) => ({
                                    value: state,
                                    label: state,
                                }))}
                                {...field}
                            />
                        )}
                    />
                    <ValidationError message={errors.state?.value?.message} />
                </Box>


            </Grid>
        </Grid>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.branchSubmit}
            elevation={0}
        >
            Add Branch Details
        </Button>
    </form>
}

export default CreateBranch;
