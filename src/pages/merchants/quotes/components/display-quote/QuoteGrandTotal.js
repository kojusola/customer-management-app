import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { moneyFormatter } from 'helpers';



function QuoteGrandTotal({ quote }) {

    return (
        <Box width="100%" display="flex" justifyContent="flex-end">
            <Box px={4} py={3} my={3} border={1} borderColor="#cbc2d1"
                style={{
                    borderRadius: "8px",
                    fontSize: "12px",
                    border: "1px solid #CBC2D1"
                }}>
                <Box display="flex"
                    style={{
                        justifyContent: "space-between",
                        padding: "5px 0 5px"
                    }}>
                    <Typography style={{
                        fontWeight: "600"
                    }}>Subtotal:</Typography>
                    <Typography
                        style={{

                            color: "#9783A3"
                        }}>N{`${moneyFormatter(quote?.subtotal)}` || 0.00}</Typography>
                </Box>
                <Box display="flex"
                    style={{
                        justifyContent: "space-between",
                        padding: "5px 0 5px"
                    }}>
                    <Typography
                        style={{

                            color: "#9783A3"
                        }}>Tax:</Typography>
                    <Typography
                        style={{

                            color: "#9783A3"
                        }}>N{`${moneyFormatter(quote?.tax)}` || 0.00}</Typography>
                </Box>
                <Box display="flex"
                    style={{
                        justifyContent: "space-between",
                        padding: "5px 0 5px"
                    }}>
                    <Typography
                        style={{
                            marginRight: 10,
                            color: "#9783A3"
                        }}>Shipping/Handling</Typography>
                    <Typography
                        style={{

                            color: "#9783A3"
                        }}>N{`${moneyFormatter(quote?.shipping)}` || 0.00}</Typography>
                </Box>
                <Box display="flex"
                    style={{
                        justifyContent: "space-between",
                        padding: "5px 0 5px"
                    }}>
                    <Typography style={{

                        fontWeight: "600"
                    }}>Total:</Typography>
                    <Typography
                        style={{

                            color: "#9783A3"
                        }}>N{`${moneyFormatter(quote?.total)}` || 0.00}</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default QuoteGrandTotal;
