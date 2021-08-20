import Box from '@material-ui/core/Box'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


import { Spinner } from "components";

import { useData } from "data";

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main
    },


}));

function StockHistory() {
    const classes = useStyles()
    const { id } = useParams();

    const { data, isLoading } = useData(`products/${id}`);

    if (isLoading) return <Box display="flex" justifyContent="center">
        <Spinner />
    </Box>

    return (
        <Box>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Link color="inherit" to='/inventory' className={classes.link}>
                    Inventory
                </Link>
                <Link color="inherit" to={`/inventory/${id}`} className={classes.link}>
                    {data?.data?.name}
                </Link>
                <Typography color="textPrimary">Stock history</Typography>
            </Breadcrumbs>
        </Box>
    )
}

export default StockHistory
