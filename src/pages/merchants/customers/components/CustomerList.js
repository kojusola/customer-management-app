import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { useHistory } from "react-router-dom";

import { Spinner, EnhancedTable } from 'components';


const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phoneNumber', label: 'Phone Number' },
]

function CustomerList({ isFetchingMore, hasMore, loadMore, customerRows = [] }) {

    const { push } = useHistory();

    const rows = customerRows.map(customerRow => ({
        id: customerRow.customer.id,
        name: `${customerRow.customer.user.first_name} ${customerRow.customer.user.last_name}`,
        email: customerRow.customer.user.email,
        phoneNumber: customerRow.customer.user.phone_number || 'N/A',
    }));

    const handleOnRowClicked = (row) => {
        push(`/customers/${row.id}`)
    }

    return (
        <Box>
            <Box marginTop="40px">
                <EnhancedTable onRowSelected={handleOnRowClicked} columns={columns} rows={rows} sortable={false} />
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

export default CustomerList
