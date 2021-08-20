import { Suspense, lazy } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Redirect, Route, Switch } from 'react-router-dom'
import Dashboard from './dashboard/dashboard';
import Sales from './sales/sales';
import Quotes from './quotes/quotes';
import Settings from './settings/settings';
import Inventories from './inventory/inventories';
import CreateInventory from './inventory/create-inventory';
import Inventory from './inventory/inventory';
import EditInventory from './inventory/edit-inventory';
import StockHistory from './inventory/stock-history';
import Quote from './quotes/quote';
import Customers from './customers/customers';
import Customer from './customers/customer'
import CreateSale from './sales/create-sale';
import { completedOnboarding } from "libs/auth";
import Box from '@material-ui/core/Box';
import { Spinner } from 'components';
import { useDisclosures } from 'helpers';

import MerchantLayout from './merchant-layout';


const AuthRoutes = lazy(() => import('pages/auth/auth-routes'));


const merchantRoutes = [
    {
        path: () => '/dashboard',
        exact: () => true,
        component: Dashboard
    },
    {
        path: () => '/sales',
        exact: () => true,
        component: Sales
    },
    {
        path: () => '/sales/create',
        exact: () => true,
        component: CreateSale
    },
    {
        path: () => '/quotes',
        exact: () => true,
        component: Quotes
    },
    {
        path: () => '/quotes/:id',
        exact: () => true,
        component: Quote
    },
    {
        path: () => '/inventory',
        exact: () => true,
        component: Inventories
    },
    {
        path: () => '/inventory/create',
        exact: () => true,
        component: CreateInventory
    },
    {
        path: () => '/inventory/:id',
        exact: () => true,
        component: Inventory
    },
    {
        path: () => '/inventory/:id/edit',
        exact: () => true,
        component: EditInventory
    },
    {
        path: () => '/inventory/:id/stock-history',
        exact: () => true,
        component: StockHistory
    },
    {
        path: () => '/customers',
        exact: () => true,
        component: Customers
    },
    {
        path: () => '/customers/:id',
        exact: () => true,
        component: Customer
    },
    {
        path: () => '/settings',
        exact: () => true,
        component: Settings
    },

]

function MerchantRoutes() {
    const { isOpen, toggle } = useDisclosures();
    const { isOpen: isAddCustomer, toggle: toggleAddCustomer } = useDisclosures();
    return (
        <Switch>
            {merchantRoutes.map(({ path, exact, component: Component }) => <Route
                key={path()}
                exact={exact()}
                path={path()}
                render={() => {
                    if (completedOnboarding()) {
                        if (path() === '/quotes') {
                            return <MerchantLayout toggleSelectUser={toggle}>
                                <Component isSelectUser={isOpen} toggleSelectUser={toggle} />
                            </MerchantLayout>
                        }
                        if (path() === '/customers') {
                            return <MerchantLayout toggleAddCustomer={toggleAddCustomer}>
                                <Component isAddCustomer={isAddCustomer} toggleAddCustomer={toggleAddCustomer} />
                            </MerchantLayout>
                        }
                        return <MerchantLayout >
                            <Component />
                        </MerchantLayout>
                    }
                    return <Redirect to="/" />
                }}
            />)}
            <Suspense
                fallback={<Box display="flex" justifyContent="center" mt={4}>
                    <Spinner />
                </Box>}
            >
                <AuthRoutes />
            </Suspense>
        </Switch>
    )
}

export default MerchantRoutes
