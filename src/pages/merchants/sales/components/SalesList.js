import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import moment from 'moment';
import { useHistory } from "react-router-dom";

import { Spinner, SimpleTable } from 'components';
import { moneyFormatter } from 'helpers';

const columns = [
    { key: 'reference', label: 'Order reference' },
    { key: 'customer', label: 'Customer' },
    { key: 'date', label: 'Date of order' },
    { key: 'amount', label: 'Amount' },
]

function SalesList({ isFetchingMore, hasMore, loadMore, sales = [] }) {

    const { push } = useHistory();

    const padValue = (value) => {
        return String(value).padStart(6, '0')
    }
    const rows = sales.map(sale => ({
        id: sale.id,
        reference: padValue(sale.id),
        name: sale.name,
        date: `${moment(sale.created_at).format('L')} ${moment(sale.created_at).format('LT')}`,
        customer: `${sale.customer.user?.first_name} ${sale.customer.user?.last_name}`,
        amount: `₦${moneyFormatter(sale.amount)}`
    }));


    return (
        <Box>
            <Box marginTop="40px">
                <SimpleTable onRowSelected={(row) => push(`/sales/${row.id}`)} columns={columns} rows={rows} />
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
        </Box>
    )
}

export default SalesList
