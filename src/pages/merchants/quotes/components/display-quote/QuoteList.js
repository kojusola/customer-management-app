import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import moment from 'moment';
import { useHistory } from "react-router-dom";

import { Spinner, SimpleTable } from 'components';
import { moneyFormatter } from 'helpers';

const columns = [
    { key: 'name', label: 'Order name' },
    { key: 'customer', label: 'Customer' },
    { key: 'date', label: 'Date of order' },
    { key: 'amount', label: 'Amount' },
]

function QuoteList({ isFetchingMore, hasMore, loadMore, quotes = [] }) {

    const { push } = useHistory();

    const rows = quotes.map(quote => ({
        id: quote.id,
        name: quote.name,
        date: `${moment(quote.created_at).format('L')} ${moment(quote.created_at).format('LT')}`,
        customer: `${quote.customer.user?.first_name} ${quote.customer.user?.last_name}`,
        amount: `₦${moneyFormatter(quote.total)}`
    }));


    return (
        <Box>
            <Box marginTop="40px">
                <SimpleTable columns={columns} rows={rows} onRowSelected={row => push(`/quotes/${row.id}`)} />
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

export default QuoteList
