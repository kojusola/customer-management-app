import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner = ({ text, textStyle, spinnerStyle }) => {
    return <Box display="flex" alignItems="center">
        <CircularProgress size={32} style={{ marginRight: 10, ...spinnerStyle }} />{text && <Typography variant="h6" color="primary" style={{ ...textStyle }}>{text}</Typography>}
    </Box>
}

export default Spinner;