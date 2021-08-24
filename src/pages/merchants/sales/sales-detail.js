import Box from '@material-ui/core/Box';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from 'react-router-dom';


import { Spinner } from "components";
import CustomerDetails from 'pages/merchants/quotes/components/display-quote/CustomerDetails';
import ProductList from "./components/ProductList";

import { makeStyles } from '@material-ui/core/styles';

import { useParams } from 'react-router-dom';
import { useData } from "data";
import { moneyFormatter } from "helpers";



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

function SalesDetail() {

    const { id } = useParams();
    const { data, isLoading } = useData(`sales/${id}`);

    const classes = useStyles();


    if (isLoading) return <Box display="flex" justifyContent="center">
        <Spinner />
    </Box>
    return (
        <Box>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Link color="inherit" to="/sales" className={classes.link}>
                    Sales
                </Link>
                <Typography color="textPrimary">Sales detail</Typography>
            </Breadcrumbs>

            <Box>
                <Box width="100%" mt={7}>
                    <CustomerDetails customer={data?.data?.customer} />
                </Box>
                <Box mt={7}>
                    <Typography className={classes.subtopicText} color="textPrimary">Product Details</Typography>

                    <ProductList products={data?.data?.products_ordered} />

                    <Box display="flex" justifyContent="flex-end">
                        <Box px={4} py={3} my={3} border={1} borderColor="#cbc2d1"
                            style={{
                                borderRadius: "8px",
                                fontSize: "12px",
                                border: "1px solid #CBC2D1",

                            }}>
                            <Box display="flex"
                                style={{
                                    justifyContent: "space-between",
                                    padding: "5px 0 5px"
                                }}>
                                <Typography >Total:</Typography>
                                <Typography
                                    style={{

                                        color: "#9783A3"
                                    }}>N{`${moneyFormatter(data?.data?.amount)}` || 0.00}</Typography>
                            </Box>
                            <Box display="flex"
                                style={{
                                    justifyContent: "space-between",
                                    padding: "5px 0 5px",

                                }}>
                                <Typography >Payment Option:</Typography>
                                <Typography style={{ marginLeft: 10, color: "#9783A3" }}>{data?.data?.payment?.payment_type === 'payment_via_link' ? 'payment_link' : data?.data?.payment?.payment_type}</Typography>
                            </Box>
                            <Box display="flex"
                                style={{
                                    justifyContent: "space-between",
                                    padding: "5px 0 5px"
                                }}>
                                <Typography >Transaction status</Typography>
                                <Typography
                                    style={{
                                        marginLeft: 10,
                                        color: "#9783A3"
                                    }}>{data?.data?.payment?.status}</Typography>
                            </Box>

                        </Box>
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}

export default SalesDetail;