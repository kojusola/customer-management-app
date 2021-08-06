import withStyles from '@material-ui/core/styles/withStyles';
import MuiDialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DialogActions from '@material-ui/core/DialogActions';
import makeStyles from '@material-ui/core/styles/makeStyles';


import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';

import CloseDialog from "./CloseDialog";
import CancelButton from "./CancelButton";
import OutlinedButton from "./OutlinedButton";
import StyledSelect from 'components/StyledSelectField/StyledSelectField';
import AddIcon from '@material-ui/icons/Add';

//Custom components
import { ValidationError } from 'components';


import { forwardRef } from 'react';
import { useData } from "data";


//APIs
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//schemas
import { selectCustomerSchema } from "validators";


const Transition = forwardRef((props, ref) => {
    return <Slide direction="down" ref={ref} {...props} />;
});


const DialogContent = withStyles((theme) => ({
    root: {
        paddingTop: '0px ! important',
        marginTop: '0px ! important',
        padding: 0,
        minHeight: 250,
        overflow: 'hidden'

    },
}))(MuiDialogContent);

const useStyles = makeStyles(theme => ({
    paper: {
        minWidth: 340,
    },
    selectButton: {
        border: '0',
        backgroundColor: theme.palette.secondary.background,
        color: theme.palette.success.background,
        display: "flex",
        fontSize: "12px",
        padding: "10px 20px 10px",
        width: "100%",
        justifyContent: 'flex-start',
        // marginBottom: 5,
        '&:hover': {
            background: 'inherit'
        }

    },
}))


function SelectUser({ isOpen, toggleDialog, toggleAddCustomer, addCustomer }) {

    const classes = useStyles()

    const { data } = useData('customers/all');

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(selectCustomerSchema),
    });

    const action = {
        value: 0, label: <Button startIcon={<AddIcon />}
            style={{ textTransform: 'none' }}
            onClick={e => {
                e.stopPropagation()
                toggleAddCustomer()
            }}
            className={classes.selectButton}
        >
            Add new customer
        </Button>
    }

    return (
        <MuiDialog
            TransitionComponent={Transition}
            onClose={toggleDialog}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
            classes={{ paper: classes.paper }}
            fullWidth
            maxWidth="sm"

        >
            <MuiDialogTitle style={{ padding: 0 }}>
                <Box display="flex" pt={2} p={2} justifyContent="space-between" bgcolor="#EEEBF0">
                    <Typography style={{
                        fontWeight: "600"
                    }}>Select Customer</Typography>
                    <CloseDialog toggle={toggleDialog} />
                </Box>
            </MuiDialogTitle>
            <form noValidate onSubmit={handleSubmit(addCustomer)}>

                <DialogContent>
                    <Controller
                        name="customerId"
                        defaultValue=""
                        control={control}
                        render={({ field }) => <StyledSelect
                            // closeMenuOnScroll={false}
                            maxMenuHeight={160}
                            customStyles={{
                                container: base => ({
                                    ...base,
                                    margin: 30
                                }),
                            }}
                            placeholder={
                                <span>
                                    Choose Customer <sup>*</sup>
                                </span>
                            }
                            values={data?.data?.map(value => ({ value: value.customer.id, label: `${value.customer.user.first_name} ${value.customer.user.last_name}` }))?.concat([action])}
                            {...field}
                        />}
                    />
                    <Box ml='30px'><ValidationError message={errors.customerId?.message} /></Box>
                </DialogContent>
                <DialogActions style={{ padding: 0 }}>
                    <Box width="100%" display="flex" p={1} pt={1} bgcolor="#EEEBF0" justifyContent="flex-end" >
                        <CancelButton
                            handleOnClicked={toggleDialog}
                        />
                        <OutlinedButton

                            text="Continue"
                            type="submit"
                        />
                    </Box>
                </DialogActions>
            </form>

        </MuiDialog>
    )
}

export default SelectUser
