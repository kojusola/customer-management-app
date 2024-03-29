import { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";
import SearchOutlined from '@material-ui/icons/SearchOutlined';

import QuotePage from './components/create-quote/QuotePage';
import SelectUser from "./components/create-quote/SelectUser";
import EmptyQuoteList from "./components/display-quote/EmptyQuoteList";
import QuoteList from "./components/display-quote/QuoteList";

import { Spinner, CustomHidden } from 'components'

import { useInfiniteData } from 'data';
import { debounce, useErrorHandler, useDisclosures } from 'helpers';
import { useQueryClient } from 'react-query';
import { fetchData } from 'libs/apis';

import { useDispatch, useSelector } from 'react-redux';

import { setCustomer, toggleShowSelectCustomer } from "app/features/quoteSlice";




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
    emptyQuotesLogo: {
        // width: "200px",
        height: "250"
    },
    emptyQuotesTopic: {
        color: theme.custom.secondary.main,
        fontSize: "20px",
        fontWeight: "600"
    },
    emptyQuotesText: {
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

function Quotes() {
    const classes = useStyles();

    const { isOpen: isAddQuote, toggle: toggleAddQuote } = useDisclosures();

    const dispatch = useDispatch()
    const showSelectCustomer = useSelector(state => state.quote.showSelectCustomer);

    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteData('quotes');

    const [quotes, setQuotes] = useState([]);

    const [searchedQuotes, setSearchedQuotes] = useState([]);


    const client = useQueryClient();

    const { handleError } = useErrorHandler();


    useEffect(() => {
        if (query.trim()) {
            setIsSearching(true);
            client
                .fetchQuery(`quotes/search?searchTerm=${query.trim()}`, fetchData)
                .then((res) => {
                    setIsSearching(false);
                    setSearchedQuotes(res.data);
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
            let allQuotes = [];
            pages.forEach((page) => {
                allQuotes = [...allQuotes, ...page.items];
            });
            setQuotes(allQuotes);
        }
    }, [data]);


    const handleOnChanged = debounce((e) => {
        setQuery(e.target.value);
    }, 500);

    const addCustomer = (customer) => {
        dispatch(setCustomer(customer));
        toggleAddQuote()
    }


    if (isLoading) return <Box display="flex" justifyContent="center">
        <Spinner />
    </Box>

    return (
        <Box className={classes.root}>
            <SelectUser addCustomer={addCustomer} isOpen={showSelectCustomer} toggleDialog={() => dispatch(toggleShowSelectCustomer())} />
            <QuotePage isOpen={isAddQuote} toggle={toggleAddQuote} />
            {!quotes.length && !query ? <EmptyQuoteList toggle={() => dispatch(toggleShowSelectCustomer())} classes={classes} /> :

                <Box>
                    <Box mt={3}>
                        <CustomHidden xAndUp={776}>
                            <Box className={classes.searchLg}>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-search-quotes">Search quote by name</InputLabel>
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
                                        labelWidth={185}
                                    />
                                </FormControl>
                                <Button className={classes.button} onClick={() => dispatch(toggleShowSelectCustomer())} variant="contained" color="primary" disableElevation={true}>
                                    Create New Sales Quote
                                </Button>
                            </Box>
                        </CustomHidden>
                        <CustomHidden xAndDown={776}>
                            <Box className={classes.searchSm}>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-search-quotes1">Search quote by name</InputLabel>
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
                                        labelWidth={185}
                                    />
                                </FormControl>
                            </Box>
                        </CustomHidden>
                    </Box>
                    {isSearching && <Spinner />}
                    {query.trim().length && searchedQuotes.length ? <QuoteList quotes={searchedQuotes} /> : query.trim().length && !searchedQuotes.length ?
                        <Box mt={4}>
                            <Typography>No quotes found</Typography>
                        </Box> :
                        <QuoteList isFetchingMore={isFetchingNextPage} loadMore={fetchNextPage} hasMore={hasNextPage} quotes={quotes} />}
                </Box>}
        </Box>
    );
}

export default Quotes;