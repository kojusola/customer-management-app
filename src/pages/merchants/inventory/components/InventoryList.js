import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import { Spinner, EnhancedTable } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import { moneyFormatter } from 'helpers';

const useStyles = makeStyles(theme => ({
    imagePlaceholder: {
        background: theme.palette.secondary.background,
        textAlign: 'center',
        width: '40%',
        padding: 10,
        borderRadius: '50%'
    }
}))


const columns = [
    { key: 'unique_name', label: 'Name | Variant' },
    { key: 'image', label: 'Image' },
    { key: 'quantity', label: 'In stock' },
    { key: 'unit_price', label: 'Selling Price' },
]

function InventoryList({ isFetchingMore, hasMore, loadMore, products = [] }) {

    const classes = useStyles();

    const rows = products.map(product => ({
        id: product.id,
        unique_name: product.unique_name,
        image: product.images?.[0]?.url ? <img style={{ height: 50 }} src={product.images?.[0]?.url} alt="product display" /> : <Typography className={classes.imagePlaceholder}>{product.unique_name?.[0]?.toUpperCase()}</Typography>,
        quantity: product.quantity,
        unit_price: `₦${moneyFormatter(product.unit_price)}`
    }))


    return (
        <Box marginTop="40px">
            <EnhancedTable selectable={false} columns={columns} rows={rows} sortable={true} />
            {isFetchingMore ? (
                <Box mt={8} display="flex" width="100%" justifyContent="center" alignItems="center">
                    <Spinner size={60} />
                </Box>
            ) : null}
            {hasMore && (
                <Box mt={4} display="flex" justifyContent="flex-end">
                    <Button disabled={isFetchingMore} variant="outlined" color="primary" onClick={() => loadMore()}>
                        Load more...
                    </Button>
                </Box>
            )}
        </Box>
    )
}

export default InventoryList
