import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import { moneyFormatter } from "helpers";
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

import { CancelButton, OutlinedButton, Spinner } from "components";

import { useMutation, mutateFunction } from 'libs/apis';


const useStyles = makeStyles((theme) => ({
    label: {
        fontSize: 15,
        color: theme.palette.button.progress,
        marginTop: 30,
        textAlign: 'center',
        marginBottom: 5,
    },
    paymentBtn: {
        width: 150,
        padding: 10,
        marginBottom: 10
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
    // paper: {
    //     minWidth: 300
    // },
    confirmText: {
        fontWeight: 600,
        color: theme.palette.primary.main
    },
    primaryText: {
        color: theme.palette.primary.main,
        fontWeight: 600,
        fontSize: 18,
        marginBottom: 5
    },
    secondaryText: {
        color: theme.palette.primary.main,
        fontSize: 13,
        fontStyle: 'italic'
    },
}))

function Payment({ sales = [] }) {

    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();

    const [texts, setTexts] = useState({ primary: '', secondary: '' });

    const [paymentType, setPaymentType] = useState('');

    const { isLoading, mutate } = useMutation(mutateFunction);

    const { enqueueSnackbar } = useSnackbar();

    const { push } = useHistory()

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }


    const getTotal = () => {
        return sales.reduce((accum, curr) => accum = accum + curr.subtotal, 0)
    }

    const makePayment = () => {
        const order = {
            paymentType,
            amount: getTotal(),
            customerId: +sales[0].customer.value,
            items: sales.map(item => ({
                id: item.id,
                quantity: item.quantity,
                subtotal: item.subtotal,
                name: item.name
            }))
        }
        if (paymentType !== 'payment_via_link') {
            mutate({ key: 'sales', method: 'post', data: order }, {
                onSuccess(res) {
                    enqueueSnackbar(res.message, { variant: 'success' });
                    push('/sales')
                }
            })
        }
        console.log(order)
    }

    return (
        <>
            <Popper open={!!anchorEl} anchorEl={anchorEl} placement="left-start" transition >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper className={classes.paper}>
                            <Box display="flex" pt={2} p={2} justifyContent="center" bgcolor="#EEEBF0">
                                <Typography className={classes.confirmText}>Confirm</Typography>
                                <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                                    <CloseIcon classes={{ root: classes.svgRoot }} />
                                </IconButton>
                            </Box>
                            <Box p={2} textAlign="center" >
                                <Typography className={classes.primaryText}>
                                    {texts.primary}
                                </Typography>
                                <Typography className={classes.secondaryText}>
                                    {texts.secondary}
                                </Typography>
                            </Box>
                            <Box width="100%" display="flex" p={1} pt={1} bgcolor="#EEEBF0" justifyContent="space-around" >
                                <CancelButton
                                    handleOnClicked={handleClose}
                                />
                                <OutlinedButton
                                    disabled={isLoading}
                                    text={isLoading ? <Spinner text="Saving..." /> : 'Received'}
                                    onClick={makePayment}
                                />
                            </Box>
                        </Paper>
                    </Fade>
                )}
            </Popper>
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
                    <Box display="flex" flexDirection="column" alignItems="center" style={{
                        border: "1px solid #707070",
                        padding: '0px 10px'
                    }}>

                        <Box onClick={handleOpen}
                            style={{
                                display: 'flex',
                                flexDirection: "column",
                                padding: "15px",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={sales.length === 0 || isLoading}
                                onClick={() => {
                                    setTexts({ primary: 'Please, collect cash.', secondary: 'Receive cash before proceeding.' });
                                    setPaymentType('cash')
                                }}
                                className={classes.paymentBtn}>

                                Cash
                            </Button>

                            <Button
                                variant="contained"
                                color="primary"
                                disabled={sales.length === 0 || isLoading}
                                onClick={() => {
                                    setTexts({ primary: 'Please, confirm transfer.', secondary: 'Confirm alert before proceeding.' });
                                    setPaymentType('transfer')
                                }}
                                className={classes.paymentBtn}>

                                Transfer
                            </Button>

                            <Button
                                variant="contained"
                                color="primary"
                                disabled={sales.length === 0 || isLoading}
                                onClick={() => {
                                    setTexts({ primary: 'Please, confirm transfer.', secondary: 'Confirm alert before proceeding.' });
                                    setPaymentType('ussd')
                                }}
                                className={classes.paymentBtn}>
                                USSD
                            </Button>


                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={sales.length === 0 || isLoading}
                            onClick={() => {
                                setPaymentType('payment_via_link');
                                handleClose()
                            }}
                            className={classes.paymentBtn}
                            style={{ marginTop: -10 }}
                        >
                            Generate Link
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Payment
