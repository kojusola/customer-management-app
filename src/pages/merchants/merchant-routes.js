import { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom'
import Dashboard from './dashboard/dashboard';
import Sales from './sales/sales';
import Quotes from './quotes/quotes';
import Settings from './settings/settings';
import Inventory from './inventory/inventory';
import { completedOnboarding } from "libs/auth";
import Box from '@material-ui/core/Box';
import { Spinner } from 'components';


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
        path: () => '/quotes',
        exact: () => true,
        component: Quotes
    },
    {
        path: () => '/inventory',
        exact: () => true,
        component: Inventory
    },
    {
        path: () => '/settings',
        exact: () => true,
        component: Settings
    },

]

function MerchantRoutes() {

    return (
        <Switch>
            {merchantRoutes.map(({ path, exact, component: Component }) => <Route
                key={path()}
                exact={exact()}
                path={path()}
                render={() => {
                    if (completedOnboarding()) return <MerchantLayout>
                        <Component />
                    </MerchantLayout>
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