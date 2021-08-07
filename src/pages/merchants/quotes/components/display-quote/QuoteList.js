import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import Quote from './Quote'
import { Spinner } from 'components';


function QuoteList({ isFetchingMore, hasMore, loadMore, quotes = [] }) {
    return (
        <Box>
            <Box marginTop="40px">
                {quotes?.map(quote => <Quote key={quote.id}  {...quote} />)}
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
