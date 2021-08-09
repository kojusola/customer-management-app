import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import PropTypes from 'prop-types';
import { v4 as uuId } from 'uuid';


const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
    },
    tableHead: {
        background: theme.palette.secondary.background
    },
    dataRow: {
        cursor: 'pointer'
    }
}));

/**
 * columns ={key:'',label:''}
 */

function SimpleTable({ rows = [], columns = [], onRowSelected }) {

    const classes = useStyles();

    const handleOnRowSelected = (row) => {
        onRowSelected && onRowSelected(row);
    }

    return (
        <TableContainer component={Paper} elevation={1}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        {columns.map((col) => <TableCell align='left' key={uuId()}>{col.label}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow onClick={() => handleOnRowSelected(row)} className={classes.dataRow} key={uuId()}>
                            {columns.map((col, i) => {
                                return i === 0 ? <TableCell component="th" scope="row" key={i}>{row[col.key]}</TableCell> : <TableCell align="left" key={i}>{row[col.key]}</TableCell>
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

SimpleTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            label: PropTypes.string
        })
    ),
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
        })
    ),
    trStyle: PropTypes.object,
};

export default SimpleTable
