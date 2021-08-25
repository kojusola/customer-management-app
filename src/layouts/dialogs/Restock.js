import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import MuiDialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { CancelButton, OutlinedButton, Spinner, ValidationError, StyledTextField } from 'components'
import { CloseDialog } from 'components/Dialogs/Dialogs'
import { useMutation, mutateFunction } from 'libs/apis';
import { useSnackbar } from 'notistack';
import Slide from '@material-ui/core/Slide';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { forwardRef } from 'react';

//APIs
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from "react-query";


//schemas
import { restockSchema } from "validators";


const Transition = forwardRef((props, ref) => {
    return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    paper: {
        minWidth: 340,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.primary.main,
    },
    svgRoot: {
        height: '.8em',
    },
}))

function Restock({ isOpen, toggle, id }) {

    const { isLoading, mutate } = useMutation(mutateFunction);

    const classes = useStyles()

    const { enqueueSnackbar } = useSnackbar();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(restockSchema),
    });

    const client = useQueryClient()

    const restock = (data) => {
        mutate({ key: `products/${id}/restock`, method: 'put', data }, {
            onSuccess(res) {
                enqueueSnackbar(res.message, { variant: 'success' });
                client.invalidateQueries(`products/${id}`);
                toggle()
            }
        })
    }
    return (
        <Box>
            <MuiDialog
                TransitionComponent={Transition}
                onClose={toggle}
                aria-labelledby="customized-dialog-title"
                open={isOpen}
                classes={{ paper: classes.paper }}
                maxWidth="sm"
            >
                <MuiDialogTitle style={{ padding: 0 }}>
                    <Box display="flex" pt={2} p={2} justifyContent="space-between" bgcolor="#EEEBF0">
                        <Typography style={{
                            fontWeight: "600"
                        }}>Restock</Typography>
                        <CloseDialog toggle={toggle} />
                    </Box>
                </MuiDialogTitle>
                <form onSubmit={handleSubmit(restock)} noValidate>
                    <Box p="30px 20px">
                        <Typography>Restock</Typography>
                        <Controller
                            control={control}
                            name="quantity"
                            defaultValue=""
                            render={({ field }) => <StyledTextField
                                label="Enter stock quantity"
                                {...field}
                            />}
                        />
                        <ValidationError message={errors.quantity?.message} />
                    </Box>
                    <Box width="100%" display="flex" p={1} pt={1} bgcolor="#EEEBF0" justifyContent="space-around">
                        <CancelButton handleOnClicked={toggle} />
                        <OutlinedButton
                            disabled={isLoading}
                            text={isLoading ? <Spinner text="Restocking..." /> : 'Restock'}
                            type="submit" />
                    </Box>
                </form>
            </MuiDialog>

        </Box>
    )
}

export default Restock
