import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Box from '@material-ui/core/Box';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SendIcon from '@material-ui/icons/EmailOutlined';
import { useTheme } from "@material-ui/core/styles";

import { v4 as uuId } from 'uuid';



function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


function EnhancedTableHead(props) {
    const { selectable, sortable, columns, classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

    const { palette } = useTheme()

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead style={{ background: numSelected ? 'white' : palette.secondary.background }}>
            <TableRow>
                {selectable ? <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell> : null}
                {columns.map((headCell) => (
                    <TableCell
                        key={headCell.key}
                        // align={headCell.numeric ? 'right' : 'left'}
                        // padding={headCell.disablePadding ? 'none' : 'checkbox'}
                        sortDirection={orderBy === headCell.key ? order : false}
                    >
                        {sortable && headCell.key !== 'image' ? <TableSortLabel
                            active={orderBy === headCell.key}
                            direction={orderBy === headCell.key ? order : 'asc'}
                            onClick={createSortHandler(headCell.key)}
                            classes={{
                                icon: classes.sortIcon
                            }}

                        >
                            {headCell.label}
                            {orderBy === headCell.key ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel> : <Typography>
                            {headCell.label}
                        </Typography>}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    sortable: PropTypes.bool.isRequired
};
EnhancedTableHead.defaultProps = {
    sortable: false
}


const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
    tooltip: {
        background: theme.palette.primary.main,
        color: 'white'
    },
    arrow: {
        color: theme.palette.primary.main
    }
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, title, handleOnSendEmailClicked = () => { } } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    {title}
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip arrow classes={{ tooltip: classes.tooltip, arrow: classes.arrow }} title="Send email">
                    <IconButton onClick={handleOnSendEmailClicked} color="primary" aria-label="send email">
                        <SendIcon />
                    </IconButton>
                </Tooltip>
            ) : null}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    title: PropTypes.string,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 650,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    dataRow: {
        cursor: 'pointer'
    },
    sortIcon: {
        color: 'black !important'
    }
}));

export default function EnhancedTable({ selectable = true, sortable, onRowSelected, columns, rows, setData, handleOnSendEmailClicked }) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            setSelected(newSelecteds);
            setData && setData(newSelecteds)
            return;
        }
        setSelected([]);
        setData && setData([])
    };

    const handleClick = (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
        setData && setData(newSelected)
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const handleOnRowSelected = (row) => {
        onRowSelected && onRowSelected(row);
    }

    return (
        <Box className={classes.root}>
            <Paper className={classes.paper}>
                {selected?.length ? <EnhancedTableToolbar handleOnSendEmailClicked={handleOnSendEmailClicked} title="Customers" numSelected={selected.length} /> : null}
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size='medium'
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            columns={columns}
                            sortable={sortable}
                            selectable={selectable}
                        />
                        <TableBody>
                            {sortable ? stableSort(rows, getComparator(order, orderBy))
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow tabIndex={-1} selected={isItemSelected} onClick={() => handleOnRowSelected(row)} className={classes.dataRow} key={uuId()}>
                                            {selectable ? <TableCell padding="checkbox">
                                                <Checkbox
                                                    onChange={e => {
                                                        e.stopPropagation();

                                                        handleClick(row.id);
                                                    }}
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell> : null}
                                            {columns.map((col, i) => {
                                                return i === 0 ? <TableCell component="th" scope="row" key={i}>{row[col.key]}</TableCell> : <TableCell align="left" key={i}>{row[col.key]}</TableCell>
                                            })}
                                        </TableRow>
                                    );
                                }) : rows.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow tabIndex={-1} selected={isItemSelected} onClick={() => handleOnRowSelected(row)} className={classes.dataRow} key={uuId()}>
                                            {selectable ? <TableCell onClick={e => e.stopPropagation()} padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    onChange={e => {
                                                        e.stopPropagation();
                                                        handleClick(row.id);
                                                    }}

                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell> : null}
                                            {columns.map((col, i) => {
                                                return i === 0 ? <TableCell component="th" scope="row" key={i}>{row[col.key]}</TableCell> : <TableCell align="left" key={i}>{row[col.key]}</TableCell>
                                            })}
                                        </TableRow>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Paper>
        </Box>
    );
}
