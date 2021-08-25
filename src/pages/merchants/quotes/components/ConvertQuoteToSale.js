import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import withStyles from '@material-ui/core/styles/withStyles';
import MuiDialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { CancelButton, OutlinedButton, Spinner, ValidationError } from 'components'
import StyledSelect from 'components/StyledSelectField/StyledSelectField';
import { CloseDialog } from 'components/Dialogs/Dialogs'
import { useMutation, mutateFunction } from 'libs/apis';
import { useSnackbar } from 'notistack';
import Slide from '@material-ui/core/Slide';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import { forwardRef } from 'react';

//APIs
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


//schemas
import { convertOrderToSale } from "validators";
import { useHistory } from 'react-router-dom';
import { useState } from 'react';


const Transition = forwardRef((props, ref) => {
    return <Slide direction="down" ref={ref} {...props} />;
});

const DialogContent = withStyles((theme) => ({
    root: {

        minHeight: 270,
        overflow: 'hidden'

    },
}))(MuiDialogContent);

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

const paymentOptions = [
    { value: 'cash', label: 'CASH' },
    { value: 'ussd', label: 'USSD' },
    { value: 'transfer', label: 'TRANSFER' },
    { value: 'payment_via_link', label: 'GENERATE LINK' },
]

function ConvertQuoteToSale({ isOpen, toggle, quote }) {

    const { isLoading, mutate } = useMutation(mutateFunction);

    const classes = useStyles()

    const [paymentLink, setPaymentLink] = useState('')
    const [orderId, setOrderId] = useState()

    const { enqueueSnackbar } = useSnackbar();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(convertOrderToSale),
    });

    const { push } = useHistory();

    const convertQuote = ({ paymentOption }) => {

        const order = {
            paymentType: paymentOption.value,
            customerId: quote.customer.id,
            amount: quote.total,
            items: quote.products.map(product => ({
                id: product.id,
                name: product.unique_name,
                quantity: product.product_quantity_quoted,
                subtotal: product.product_amount_quoted,
                discount: product.product_discount_quoted
            }))
        }
        mutate({ key: `sales`, method: 'post', data: order }, {
            onSuccess(res) {
                enqueueSnackbar(res.message, { variant: 'success' });
                if (paymentOption.value === 'payment_via_link') {
                    setOrderId(res.data.id);
                    return setPaymentLink(res.data.url);
                }
                push(`/sales/${res.data.id}`)
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
                        }}>Convert quote to order</Typography>
                        <CloseDialog toggle={toggle} />
                    </Box>
                </MuiDialogTitle>
                <form onSubmit={handleSubmit(convertQuote)} noValidate>
                    <DialogContent>
                        <Typography style={{ marginBottom: 10 }}>PAYMENT OPTIONS</Typography>
                        <Controller
                            control={control}
                            name="paymentOption"
                            defaultValue=""
                            render={({ field }) => <StyledSelect
                                placeholder="Select payment option *"
                                values={paymentOptions}
                                maxMenuHeight={160}
                                {...field}
                            />}
                        />
                        <Box mt='10px'><ValidationError message={errors.paymentOption?.message} /></Box>

                        {
                            paymentLink ? <Box display="flex" justifyContent="center" flexDirection="column" mt={4}>
                                <Typography style={{ fontSize: 13, fontWeight: 600, marginBottom: 20 }}>
                                    {paymentLink}
                                </Typography>
                                <CopyToClipboard text={paymentLink}
                                    onCopy={() => {
                                        enqueueSnackbar('Copied to clipboard', { variant: 'success' });
                                        push(`/sales/${orderId}`)
                                    }}>
                                    <OutlinedButton
                                        text="Copy Payment Link"
                                        onClick={() => { }}
                                    />
                                </CopyToClipboard>
                            </Box> : null
                        }
                    </DialogContent>
                    <Box width="100%" display="flex" p={1} pt={1} bgcolor="#EEEBF0" justifyContent="space-around">
                        <CancelButton handleOnClicked={toggle} />
                        <OutlinedButton
                            disabled={isLoading}
                            text={isLoading ? <Spinner text="Converting..." /> : 'Convert'}
                            type="submit" />
                    </Box>
                </form>
            </MuiDialog>

        </Box>
    )
}

export default ConvertQuoteToSale
