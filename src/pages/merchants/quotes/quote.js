import Box from '@material-ui/core/Box';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from 'react-router-dom';

import { Spinner } from "components";

import makeStyles from '@material-ui/core/styles/makeStyles';

import { useParams } from 'react-router-dom';
import { useData } from "data";

const useStyles = makeStyles(theme => ({
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main
    }
}))

function Quote() {
    const { id } = useParams();
    const { data, isLoading } = useData(`quotes/${id}`);

    const classes = useStyles();


    if (isLoading) return <Box display="flex" justifyContent="center">
        <Spinner />
    </Box>
    return (
        <Box>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Link color="inherit" to="/quotes" className={classes.link}>
                    Quotes
                </Link>
                <Typography color="textPrimary">{data?.data?.name}</Typography>
            </Breadcrumbs>

        </Box>
    )
}

export default Quote
