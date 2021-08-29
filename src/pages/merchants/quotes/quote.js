import { useState } from "react";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from 'react-router-dom';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

import { Spinner } from "components";
import StyledTextField from 'components/StyledTextField/StyledTextField';
import ConvertQuote from "assets/icons/convert-quote.svg";
import DuplicateQuote from "assets/icons/duplicate.svg";
import DownArrow from "assets/icons/down-arrow.svg";
import Share from "assets/icons/share.svg";
import ProductList from "./components/display-quote/ProductList"
import QuoteGrandTotal from "./components/display-quote/QuoteGrandTotal"
import CustomerDetails from "./components/display-quote/CustomerDetails"

import { makeStyles } from '@material-ui/core/styles';


import { useParams } from 'react-router-dom';
import { useData } from "data";
import moment from "moment";
import { exportAsPDF, useDisclosures, useMediaQueries } from "helpers";
import ConvertQuoteToSale from "./components/ConvertQuoteToSale";
import SelectUser from "./components/create-quote/SelectUser";
import QuotePage from './components/create-quote/QuotePage';
import EmailQuote from "./components/EmailQuote";

import { useDispatch, useSelector } from 'react-redux';

import { setCustomer, toggleShowSelectCustomer, setQuote } from "app/features/quoteSlice";
import { togglePrintingDocument } from "app/features/appSlice";



const useStyles = makeStyles(theme => ({
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
    },
    quoteDetailsTopic: {
        backgroundColor: theme.custom.sidenav.background,
        borderColor: 'black',
        padding: 10,
        marginTop: 20,
        borderRadius: '4px',
    },
    topicText: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.palette.button.progress,
    },
    subtopicText: {
        fontSize: 16,
        color: theme.palette.secondary.subtopic,
    },
    subSubtopicText: {
        fontSize: '16px',
        color: theme.palette.secondary.subtopic,
    },
    buttonDisplay: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px',
        height: 30,
        textTransform: 'none'

    },
    buttonText: {
        marginLeft: "8px",
        // fontSize: "16px",
        color: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main
    },
    shareButton: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        alignItems: 'center',
        borderRadius: '4px',
        backgroundColor: theme.palette.secondary.main,
        color: '#FFFFFF',
        fontSize: '16px',
        height: 30,
        textTransform: 'none',
        width: 150,
        '&:hover': {
            background: theme.palette.primary.main,
            opacity: .8
        }
    },
    createdText: {
        fontSize: 15

    },
    topicContainers: {
        marginTop: 20,
        marginBottom: 10
    },
    shareSpan: {
        paddingRight: "8px",
        display: "flex",
        alignItems: "center"
    },
    poperPaper: {
        // backgroundColor: "#FFFFFF",
        padding: 5,
        // position: "absolute",
        // top: 35,
        // zIndex: 1,
        // left: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: 150,
        marginTop: 10
    },
    optionButton: {
        textTransform: 'none',
        '&.MuiButton-text': {
            padding: '4px 16px'
        }


    },
    subContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    horizontal: {
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid #CBC2D1',
        paddingBottom: "4px"
    }
}))

function Quote() {

    const { id } = useParams();
    const { data, isLoading } = useData(`quotes/${id}`);

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [isPrinting, setIsPrinting] = useState(false);



    const { xsAndDown, smAndDown: isSmDown, lgAndUp: isLgUp } = useMediaQueries();

    const { isOpen, toggle: toggleConverter } = useDisclosures();

    const { isOpen: isAddQuote, toggle: toggleAddQuote } = useDisclosures();
    const { isOpen: isEmailQuote, toggle: toggleEmailQuote } = useDisclosures();

    const dispatch = useDispatch()
    const showSelectCustomer = useSelector(state => state.quote.showSelectCustomer);
    const isPrintingDocument = useSelector(state => state.app.isPrintingDocument);

    const toggle = (event) => {
        setAnchorEl(open => {
            if (open) return null;
            return event.currentTarget
        });
    }


    const addCustomer = (customer) => {
        dispatch(setCustomer(customer));
        toggleAddQuote()
    }

    const padValue = (value) => {
        return String(value).padStart(4, '0')
    }

    const duplicateQuote = () => {
        const quote = {
            customerId: { value: data?.data?.customer?.id, label: `${data?.data?.customer?.user?.first_name} ${data?.data?.customer?.user?.last_name}` },
            products: data?.data?.products?.map(product => ({
                amount: product.product_amount_quoted,
                discount: product.product_discount_quoted,
                unitPrice: product.product_unit_price_quoted,
                quantity: product.product_quantity_quoted,
                name: { value: String(product.id), label: product.unique_name }
            })),
            quoteName: `${data?.data?.name} -- Copy`,
            assignedTo: { value: data?.data?.assignedTo?.id, label: `${data?.data?.assignedTo?.first_name} ${data?.data?.assignedTo?.last_name}` },
            remark: data?.data?.remark || '',
            showSelectCustomer: true
        }
        dispatch(setQuote(quote))
    }

    if (isLoading) return <Box display="flex" justifyContent="center">
        <Spinner />
    </Box>
    return (
        <Box>
            <EmailQuote data={data} isOpen={isEmailQuote} toggle={toggleEmailQuote} toEmails={data?.data?.customer?.user?.email} />
            <SelectUser addCustomer={addCustomer} isOpen={showSelectCustomer} toggleDialog={() => dispatch(toggleShowSelectCustomer())} />
            <QuotePage isOpen={isAddQuote} toggle={toggleAddQuote} />
            <ConvertQuoteToSale quote={data?.data} isOpen={isOpen} toggle={toggleConverter} />
            {!isPrintingDocument && <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Link color="inherit" to="/quotes" className={classes.link}>
                    Quotes
                </Link>
                <Typography color="textPrimary">{data?.data?.name}</Typography>
            </Breadcrumbs>}
            <Box className={classes.quoteDetailsTopic} width="100%">
                <Box className={classes.topicContainers}>
                    <Grid container spacing={1}>
                        <Grid item md={7} xs={12}>
                            <Typography className={classes.topicText} color="textPrimary" >{`${data?.data?.name} - ${padValue(data?.data?.id)}`}</Typography>
                        </Grid>
                        <Grid item md={5} xs={12}>
                            <Box display="flex" className={classes.createdText} justifyContent={xsAndDown ? 'flex-start' : 'flex-end'}>
                                <span style={{ color: "#513166", marginRight: 5 }}>Created:</span>
                                <span style={{ color: "#9783A3" }}>{` ${moment(data?.data?.created_at).format('L')} ${moment(data?.data?.created_at).format('LT')}`}</span>
                            </Box>
                        </Grid>
                    </Grid>
                    {!isPrintingDocument && <Box className={classes.topicContainers}>
                        <Grid container spacing={1}>

                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <Button onClick={duplicateQuote} className={classes.buttonDisplay} style={{ width: isSmDown ? '100%' : 'initial', justifyContent: 'flex-start', marginBottom: isSmDown ? 10 : 0 }} variant="outlined" color="primary" >
                                    <img src={ConvertQuote} alt="convert quote"></img>
                                    <span className={classes.buttonText} >Duplicate quote</span>
                                </Button>
                            </Grid>
                            <Grid item lg={3} md={5} sm={6} xs={12}>
                                <Button onClick={toggleConverter} style={{ width: isSmDown ? '100%' : 'initial', justifyContent: 'flex-start', marginBottom: isSmDown ? 10 : 0, marginLeft: isLgUp ? -100 : 0 }} variant="outlined" color="primary" className={classes.buttonDisplay}>
                                    <img src={DuplicateQuote} alt="duplicate quote"></img>
                                    <span className={classes.buttonText}>Convert to order</span>
                                </Button>
                            </Grid>

                            <Grid item lg={6} md={4} sm={6} xs={12}>
                                <Box display="flex" justifyContent={xsAndDown ? 'flex-start' : 'flex-end'}>
                                    <Button
                                        fullWidth
                                        onClick={toggle}
                                        className={classes.shareButton}
                                        style={{ width: isSmDown ? '100%' : 150 }}
                                    >
                                        <span className={classes.shareSpan}>
                                            <img src={Share} alt="share quote" style={{ paddingRight: "6px", height: 20 }}></img>
                                            Share
                                        </span>
                                        <img src={DownArrow} alt="options quote"></img>
                                    </Button>
                                    <Popper open={!!anchorEl} anchorEl={anchorEl} placement='bottom' transition>
                                        {({ TransitionProps }) => (
                                            <Fade {...TransitionProps} timeout={400}>
                                                <Paper className={classes.poperPaper}>
                                                    <Button variant="text" color="primary" className={classes.optionButton} onClick={toggleEmailQuote}>Email</Button>
                                                    <Button variant="text" color="primary" className={classes.optionButton} onClick={() => {
                                                        dispatch(togglePrintingDocument())
                                                        setTimeout(() => {
                                                            window.print();
                                                            dispatch(togglePrintingDocument())
                                                        }, 100)
                                                    }}>Print</Button>
                                                    <Button variant="text" color="primary" className={classes.optionButton} onClick={() => {
                                                        setIsPrinting(true)
                                                        exportAsPDF(data, () => {
                                                            setIsPrinting(false)
                                                        })
                                                    }}>Export as PDF</Button>
                                                </Paper>
                                            </Fade>
                                        )}
                                    </Popper>

                                </Box>
                            </Grid>
                        </Grid>
                    </Box>}
                </Box>
            </Box>
            <Box ml={isPrinting ? 32 : 0} id="c-quote">
                <Box width="100%" mt={7}>
                    <CustomerDetails customer={data?.data?.customer} />
                </Box>
                <Box mt={7}>
                    <Typography className={classes.subtopicText} color="textPrimary">Product Details</Typography>
                    <Grid container spacing={1}>
                        <Grid item sm={6} xs={12}>
                            <StyledTextField
                                margin="normal"
                                label="Quote Name"
                                contentEditable={false}
                                required={false}
                                value={data?.data?.name}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <StyledTextField
                                margin="normal"
                                label="Assigned To"
                                required={false}
                                contentEditable={false}
                                value={`${data?.data?.assignedTo?.first_name} ${data?.data?.assignedTo?.last_name}`}
                            />
                        </Grid>
                    </Grid>

                </Box>
                <Box width="100%" >

                    <ProductList isPrinting={isPrinting} products={data?.data?.products} isXS={xsAndDown} />

                    <Box width="100%" display="flex" style={{ justifyContent: "flex-end" }}>
                        <QuoteGrandTotal quote={data?.data} />
                    </Box>
                </Box>
                <Box mt={4}>
                    <Typography className={classes.subtopicText} color="textPrimary">Extra Details</Typography>
                    <Box width="100%">
                        <StyledTextField
                            multiline
                            rows={5}
                            margin="normal"
                            label="Remark"
                            required={false}
                            contentEditable={false}
                            value={data?.data?.remark}
                        />
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}

export default Quote;