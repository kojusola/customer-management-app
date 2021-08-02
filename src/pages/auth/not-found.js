import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowBackOutlined from '@material-ui/icons/ArrowBackOutlined';
import { makeStyles } from '@material-ui/core/styles';
import BnLogo from 'assets/images/signup.png';


const useStyles = makeStyles(theme => ({
    root: {
        background: theme.palette.primary.main,
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        height: '100vh',
        justifyContent: 'center',
        color: 'white'
    }
}))



function NotFound({ handleOnClicked }) {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Box mt="-200px" mb="45px" height="55px" textAlign="center">
                <img style={{ height: '100%' }} src={BnLogo} alt="Beyond next logo" />
            </Box>
            <Typography style={{ textAlign: 'center', marginBottom: 20 }}>Page not found</Typography>
            <Box textAlign="center">
                <Button onClick={handleOnClicked} style={{ color: 'white', textTransform: 'none', width: 'fit-content' }} startIcon={<ArrowBackOutlined />}>Please go back</Button>
            </Box>
        </Box>
    )
}

export default NotFound
