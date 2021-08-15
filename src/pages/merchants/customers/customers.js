import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles, Typography } from '@material-ui/core';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SearchOutlined from '@material-ui/icons/SearchOutlined';

import { Spinner, CustomHidden } from "components";

// import { useHistory } from "react-router-dom";
import { useInfiniteData } from 'data';
import { debounce, useErrorHandler } from 'helpers';
import { useQueryClient } from 'react-query';
import { fetchData } from 'libs/apis';
import { useState, useEffect } from "react";
import EmptyCustomerList from './components/EmptyCustomerList';
import AddNewCustomer from './components/AddNewCustomer';
import CustomerList from './components/CustomerList';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'inherit',
        margin: "0",
        padding: "0",
    },

    topicText: {
        fontSize: "13px",
        color: "000000"
    },
    emptyCustomersLogo: {
        // width: "200px",
        height: 250
    },
    emptyCustomersTopic: {
        color: theme.custom.secondary.main,
        fontSize: "20px",
        fontWeight: "600"
    },
    emptyCustomersText: {
        color: theme.palette.button.progress,
        fontSize: 14,
        maxWidth: 450,
        textAlign: "center",
        marginTop: 10,
    },
    submit: {
        maxWidth: 360,
        height: '48px',
        margin: theme.spacing(3, 0, 1),
        textTransform: 'none',
        overflowY: 'hidden',
    },
    searchLg: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 15,
        background: theme.palette.secondary.background,
        borderRadius: 5,
        alignItems: 'center'
        // marginTop: -10
    },
    searchSm: {
        display: 'flex',
        flexDirection: 'column',
        // background: theme.palette.secondary.background,
        // borderRadius: 5,
        // padding: 15,
        // marginTop: -10
    },
    button: {
        height: 50,
        textTransform: 'none'
    },
    inputSearch: {
        height: 50,
        minWidth: 250,
        background: 'white'
    }

}))

function Customers({ isAddCustomer, toggleAddCustomer }) {

    const classes = useStyles();

    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteData('customers', 10);

    const [customers, setCustomers] = useState([]);

    const [searchedCustomers, setSearchedCustomers] = useState([])


    const client = useQueryClient();

    // const { push } = useHistory();

    const { handleError } = useErrorHandler();


    useEffect(() => {
        if (query.trim()) {
            setIsSearching(true);
            client
                .fetchQuery(`customers/search?searchTerm=${query.trim()}`, fetchData)
                .then((res) => {
                    setIsSearching(false);
                    setSearchedCustomers(res.data);
                })
                .catch((e) => {
                    setIsSearching(false);
                    handleError(e);
                });
        }

        // eslint-disable-next-line
    }, [query]);

    useEffect(() => {
        if (data && data.pages) {
            const pages = data.pages;
            let allCustomers = [];
            pages.forEach((page) => {
                allCustomers = [...allCustomers, ...page.items];
            });
            setCustomers(allCustomers);
        }
    }, [data]);


    const handleOnChanged = debounce((e) => {
        setQuery(e.target.value);
    }, 500);



    if (isLoading) return <Box display="flex" justifyContent="center">
        <Spinner />
    </Box>

    return (
        <Box className={classes.root}>
            <AddNewCustomer isOpen={isAddCustomer} toggle={toggleAddCustomer} />
            {!customers.length && !query ? <EmptyCustomerList createCustomer={toggleAddCustomer} classes={classes} /> :
                <Box>
                    <Box mt={3}>
                        <CustomHidden xAndUp={763}>
                            <Box className={classes.searchLg}>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-search-quotes">Search by names</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-search-quotes"
                                        type='text'
                                        onChange={handleOnChanged}
                                        className={classes.inputSearch}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <SearchOutlined />
                                            </InputAdornment>
                                        }
                                        labelWidth={145}
                                    />
                                </FormControl>
                                <Button className={classes.button} onClick={toggleAddCustomer} variant="contained" color="primary" disableElevation={true}>
                                    Create New Customer
                                </Button>
                            </Box>
                        </CustomHidden>
                        <CustomHidden xAndDown={763}>
                            <Box className={classes.searchSm}>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-search-quotes1">Search by names</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-search-quotes1"
                                        type='text'
                                        onChange={handleOnChanged}
                                        className={classes.inputSearch}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <SearchOutlined />
                                            </InputAdornment>
                                        }
                                        labelWidth={145}
                                    />
                                </FormControl>

                            </Box>
                        </CustomHidden>
                    </Box>
                    {isSearching && <Spinner />}
                    {query.trim().length && searchedCustomers.length ? <CustomerList customerRows={searchedCustomers} /> : query.trim().length && !searchedCustomers.length ?
                        <Box mt={4}>
                            <Typography>No customers found</Typography>
                        </Box> :
                        <CustomerList isFetchingMore={isFetchingNextPage} loadMore={fetchNextPage} hasMore={hasNextPage} customerRows={customers} />}
                </Box>}

        </Box>
    )
}

export default Customers
