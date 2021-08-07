import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

function Quote({ name }) {
    return (
        <Box>
            Quote name: <Typography component="span" style={{ fontWeight: 600 }}>{name}</Typography>
        </Box>
    )
}

export default Quote
