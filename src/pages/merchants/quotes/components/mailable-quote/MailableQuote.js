import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import StyledTextField from 'components/StyledTextField/StyledTextField';

import ProductList from "./components/ProductList"
import QuoteGrandTotal from "../display-quote/QuoteGrandTotal"
import CustomerDetails from "./components/CustomerDetails"

import { makeStyles } from '@material-ui/core/styles';

import moment from "moment";
import { useMediaQueries } from "helpers";


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
        marginBottom: 10,
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

function MailableQuote({ data }) {

    const classes = useStyles();

    const { xsAndDown } = useMediaQueries();

    const padValue = (value) => {
        return String(value).padStart(4, '0')
    }
    return (
        <Box pl={2} pr={4}>

            <Box className={classes.quoteDetailsTopic} width="100%">
                <Box className={classes.topicContainers}>
                    <Grid container spacing={1}>
                        <Grid item xs={7}>
                            <Typography className={classes.topicText} color="textPrimary" >{`${data?.data?.name} - ${padValue(data?.data?.id)}`}</Typography>
                        </Grid>
                        <Grid item xs={5} >
                            <Box display="flex" className={classes.createdText} justifyContent={xsAndDown ? 'flex-start' : 'flex-end'}>
                                <span style={{ color: "#513166", marginRight: 5 }}>Created:</span>
                                <span style={{ color: "#9783A3" }}>{` ${moment(data?.data?.created_at).format('L')} ${moment(data?.data?.created_at).format('LT')}`}</span>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box>
                <Box width="100%" mt={7}>
                    <CustomerDetails customer={data?.data?.customer} />
                </Box>
                <Box mt={7}>
                    <Typography className={classes.subtopicText} color="textPrimary">Product Details</Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <StyledTextField
                                margin="normal"
                                id="quotename"
                                label="Quote Name"
                                type="text"
                                name="quotename"
                                contentEditable={false}
                                required={false}
                                value={data?.data?.name}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <StyledTextField
                                margin="normal"
                                id="assigned"
                                label="Assigned To"
                                type="text"
                                name="assigned"
                                required={false}
                                contentEditable={false}
                                value={`${data?.data?.assignedTo?.first_name} ${data?.data?.assignedTo?.last_name}`}
                            />
                        </Grid>
                    </Grid>

                </Box>
                <Box width="100%" >
                    <ProductList products={data?.data?.products} isXS={xsAndDown} />
                    <Box mt={60} width="100%" display="flex" style={{ justifyContent: "flex-end" }}>
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
                            id="remark"
                            label="Remark"
                            type="text"
                            name="remark"
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

export default MailableQuote;