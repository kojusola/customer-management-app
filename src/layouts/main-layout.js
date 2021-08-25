import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add'
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { NavLink, useHistory, useParams } from "react-router-dom";
import { Spinner, CustomHidden } from 'components';

//Logos
import BnLogo from 'assets/images/signup.png'
import ConfirmProductDeletion from "./dialogs/ConfirmProductDeletion";
import ConfirmProductArchive from "./dialogs/ConfirmProductArchive";
import Restock from "./dialogs/Restock";

import { useMutation, mutateFunction } from 'libs/apis';
import { useSnackbar } from 'notistack';
import { removeAuthUser } from "libs/auth";
import { useAppContext } from "store/AppContext";
import { SET_AUTH_USER } from "store/actionTypes";


import "./main-layout.css";
import { useDisclosures } from "helpers";





const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            background: "white",
            color: "#000",
            boxShadow: "none !important",
        },

    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: theme.palette.primary.main,
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        background: theme.custom.sidenav.background,
        color: "#000",
        borderRight: "none",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        overflowX: "hidden",
    },
    toolbarContent: {
        background: theme.custom.sidenav.background,
        color: theme.palette.primary.main,
        boxShadow: 'none',
    },
    drawerContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    signoutButton: {
        marginBottom: 30,
        fontWeight: 600
    },
    dropdownButton: {
        textTransform: 'capitalize',
        '&.MuiButton-text': {
            padding: '4px 16px'
        }
    }
}));

function MainLayout({ children, sidenavLinks = [], toggleSelectUser, toggleAddCustomer }) {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const [openOptions, setOpenOptions] = useState(false)

    const { location, replace, push } = useHistory();

    const { isOpen, toggle } = useDisclosures();
    const { isOpen: isArchive, toggle: toggleArchive } = useDisclosures();
    const { isOpen: isRestock, toggle: toggleRestock } = useDisclosures();

    const { id: productId } = useParams();

    const [titleBar] = useState(location?.pathname?.split("/")[1]);

    const { mutate, isLoading } = useMutation(mutateFunction);

    const { dispatch } = useAppContext();

    const { enqueueSnackbar } = useSnackbar();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const logout = () => {
        mutate({ key: 'auth/logout', method: 'delete' }, {
            onSuccess(res) {
                enqueueSnackbar(res.message, { variant: 'success' });
                removeAuthUser();
                dispatch({ type: SET_AUTH_USER, payload: { data: null } });
                replace('/signin');
            }
        })
    }

    const ListItemLink = ({ icon, primary, to }) => {
        const renderLink = React.forwardRef((itemProps, ref) => (
            <NavLink to={to} ref={ref} {...itemProps} />
        ));

        return (
            <li>
                <ListItem button component={renderLink}>
                    {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                    <ListItemText primary={primary} />
                </ListItem>
            </li>
        );
    };
    const drawer = (
        <div>
            <div
                className={classes.toolbar}
                style={{
                    marginBottom: 15,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box height="45px">
                    <img style={{ height: '100%' }} src={BnLogo} alt="Beyond next logo" />
                </Box>
            </div>

            <Hidden xsDown implementation="css">
                <List style={{ width: '85%', margin: 'auto', marginTop: 70 }}>
                    {sidenavLinks
                        .filter((route) => route.icon())
                        .map((route) => (
                            <ListItemLink
                                key={route.path()}
                                icon={route.icon()}
                                primary={route.title()}
                                to={route.path()}
                            />
                        ))}
                </List>
            </Hidden>
            <Hidden smUp implementation="css">
                <List style={{ width: '85%', margin: 'auto', marginTop: 20 }}>
                    {sidenavLinks
                        .filter((route) => route.icon())
                        .map((route) => (
                            <ListItemLink
                                key={route.path()}
                                icon={route.icon()}
                                primary={route.title()}
                                to={route.path()}
                            />
                        ))}
                </List>
            </Hidden>
        </div>
    );

    const container =
        window !== undefined ? () => window.document.body : undefined;

    const isInventory = (path) => {
        const match = /\/inventory\/\d*$/gi;
        return match.test(path)
    }

    return (
        <div className={classes.root}>
            <ConfirmProductDeletion toggle={toggle} isOpen={isOpen} id={productId} />
            <ConfirmProductArchive toggle={toggleArchive} isOpen={isArchive} id={productId} />
            <Restock toggle={toggleRestock} isOpen={isRestock} id={productId} />
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar
                    className={classes.toolbarContent}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box
                        width="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography
                            style={{ textTransform: "capitalize", marginLeft: -60 }}
                            variant="h6"
                            noWrap
                        >
                            {titleBar}
                        </Typography>

                    </Box>
                    <CustomHidden xAndDown={779}>
                        {location.pathname === '/sales' ? <IconButton onClick={() => push('/sales/create')}>
                            <AddIcon />
                        </IconButton> : null}
                    </CustomHidden>
                    <CustomHidden xAndDown={779}>
                        {location.pathname === '/inventory' ? <IconButton onClick={() => push('/inventory/create')}>
                            <AddIcon />
                        </IconButton> : null}
                    </CustomHidden>
                    <CustomHidden xAndDown={775}>
                        {location.pathname === '/quotes' ? <IconButton onClick={toggleSelectUser}>
                            <AddIcon />
                        </IconButton> : null}
                    </CustomHidden>
                    <CustomHidden xAndDown={762}>
                        {location.pathname === '/customers' ? <IconButton onClick={toggleAddCustomer}>
                            <AddIcon />
                        </IconButton> : null}
                    </CustomHidden>
                    {
                        isInventory(location.pathname) ? <Box position="relative">
                            <Button
                                variant="text"
                                color="primary"
                                onClick={() => setOpenOptions(open => !open)}
                            >
                                <MoreVertIcon />
                            </Button>
                            {openOptions && <Box style={{
                                backgroundColor: "#FFFFFF",
                                padding: 2,
                                color: "#513166",
                                display: "block",
                                position: "absolute",
                                right: 40,
                                top: 0,
                                zIndex: 1,
                                width: 130
                            }}>
                                <Button variant="text" onClick={() => push(`/inventory/${productId}/edit`)} color="primary" className={classes.dropdownButton}>Edit</Button>
                                <Button variant="text" color="primary" onClick={toggleArchive} className={classes.dropdownButton}>Archive</Button>
                                <Button variant="text" color="primary" onClick={toggle} className={classes.dropdownButton}>Delete</Button>
                                <Button variant="text" onClick={toggleRestock} color="primary" className={classes.dropdownButton}>Restock</Button>
                                <Button variant="text" onClick={() => push(`/inventory/${productId}/stock-history`)} color="primary" className={classes.dropdownButton}>Stock History</Button>
                            </Box>}
                        </Box> : null
                    }

                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        <Box className={classes.drawerContainer}>
                            {drawer}
                            <Button onClick={logout} startIcon={<ExitToAppIcon />} className={classes.signoutButton}>
                                {isLoading ? <Spinner /> : 'Sign out'}
                            </Button>
                        </Box>
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        <Box className={classes.drawerContainer}>
                            {drawer}
                            <Button onClick={logout} disabled={isLoading} startIcon={<ExitToAppIcon />} className={classes.signoutButton}>
                                {isLoading ? <Spinner /> : 'Sign out'}
                            </Button>
                        </Box>
                    </Drawer>
                </Hidden>

            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    );
}

export default MainLayout;
