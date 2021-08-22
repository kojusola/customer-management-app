import Box from '@material-ui/core/Box'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


import { SimpleTable, Spinner } from "components";

import { useData } from "data";
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main
    },
    textColor: {
        color: theme.palette.primary.main
    },
    caption: {
        color: theme.palette.primary.main,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15
    }

}));


const columns = [
    { key: 'date', label: 'Date' },
    { key: 'oldStock', label: 'Old Stock' },
    { key: 'addedStock', label: 'Added Stock' },
    { key: 'addedBy', label: 'Stocked By' },
]

function StockHistory() {
    const classes = useStyles()
    const { id } = useParams();

    const { data, isLoading } = useData(`products/${id}/stock-history`);

    console.log(data);

    const rows = data?.data?.stock_histories?.map(stock => ({
        id: stock.id,
        date: `${moment(stock.created_at).format('ll')} ${moment(stock.created_at).format('LT')}`,
        oldStock: stock.current_quantity,
        addedStock: stock.added_quantity,
        addedBy: stock.stocker.email
    }))

    if (isLoading) return <Box display="flex" justifyContent="center">
        <Spinner />
    </Box>

    return (
        <Box>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Link color="inherit" to='/inventory' className={classes.link}>
                    Inventory
                </Link>
                <Link color="inherit" to={`/inventory/${id}`} className={classes.link}>
                    {data?.data?.name}
                </Link>
                <Typography color="textPrimary">Stock history</Typography>
            </Breadcrumbs>
            {data?.data?.stock_histories?.length ? <Box mt="40px">
                <Typography className={classes.caption}>Restock History</Typography>
                <SimpleTable rows={rows} columns={columns} />
            </Box> :
                <Box mt={16} textAlign="center">
                    <Typography className={classes.textColor}>No stock history yet</Typography>
                </Box>
            }
        </Box>
    )
}

export default StockHistory
