import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/core/styles/makeStyles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import { useState, useEffect } from 'react'

import { Spinner, CustomHidden } from 'components'
import EmptyInventoryList from './components/EmptyInventoryList';
import InventoryList from './components/InventoryList';

import { useHistory } from "react-router-dom";
import { useInfiniteData } from 'data';
import { debounce, useErrorHandler } from 'helpers';
import { useQueryClient } from 'react-query';
import { fetchData } from 'libs/apis';


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
        height: 250
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
        minWidth: 300,
        background: 'white'
    }

}))

function Inventories() {
    const classes = useStyles();

    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteData('products');

    const [products, setProducts] = useState([]);

    const [searchedProducts, setSearchedProducts] = useState([]);


    const client = useQueryClient();

    const { push } = useHistory();

    const { handleError } = useErrorHandler();

    useEffect(() => {
        if (query.trim()) {
            setIsSearching(true);
            client
                .fetchQuery(`products/search?searchTerm=${query.trim()}`, fetchData)
                .then((res) => {
                    setIsSearching(false);
                    setSearchedProducts(res.data);
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
            let allProducts = [];
            pages.forEach((page) => {
                allProducts = [...allProducts, ...page.items];
            });
            setProducts(allProducts);
        }
    }, [data]);


    const handleOnChanged = debounce((e) => {
        setQuery(e.target.value);
    }, 500);


    const createInventory = () => push('/inventory/create')

    if (isLoading) return <Box display="flex" justifyContent="center">
        <Spinner />
    </Box>
    return (
        <Box className={classes.root}>
            {!products.length && !query ? <EmptyInventoryList createInventory={createInventory} classes={classes} /> :
                <Box>
                    <Box mt={3}>
                        <CustomHidden xAndUp={779}>
                            <Box className={classes.searchLg}>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-search-quotes">Search product by name </InputLabel>
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
                                        labelWidth={205}
                                    />
                                </FormControl>
                                <Button className={classes.button} onClick={createInventory} variant="contained" color="primary" disableElevation={true}>
                                    Add Your First Product
                                </Button>
                            </Box>
                        </CustomHidden>
                    </Box>
                    <CustomHidden xAndDown={779}>
                        <Box className={classes.searchSm}>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-search-quotes1">Search product by name</InputLabel>
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
                                    labelWidth={205}
                                />
                            </FormControl>
                        </Box>
                    </CustomHidden>

                    {isSearching && <Spinner />}
                    {query.trim().length && searchedProducts.length ? <InventoryList products={searchedProducts} /> : query.trim().length && !searchedProducts.length ?
                        <Box mt={4}>
                            <Typography>No product found</Typography>
                        </Box> :
                        <InventoryList isFetchingMore={isFetchingNextPage} loadMore={fetchNextPage} hasMore={hasNextPage} products={products} />}
                </Box>}
        </Box>
    )
}

export default Inventories
