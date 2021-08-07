import Box from '@material-ui/core/Box';

import { useParams } from 'react-router-dom';

function Quote() {
    const { id } = useParams();

    return (
        <Box>
            Quote id: {id};

        </Box>
    )
}

export default Quote
