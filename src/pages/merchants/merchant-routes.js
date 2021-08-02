import { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom'
import Dashboard from './dashboard/dashboard'
import { completedOnboarding } from "libs/auth";
import Box from '@material-ui/core/Box';
import { Spinner } from 'components';


const AuthRoutes = lazy(() => import('pages/auth/auth-routes'));


const merchantRoutes = [
    {
        path: '/dashboard',
        exact: () => true,
        component: Dashboard
    }

]

function MerchantRoutes() {

    return (
        <Switch>
            {merchantRoutes.map(({ path, exact, component: Component }) => <Route
                key={path}
                exact={exact()}
                path={path}
                render={() => {
                    if (completedOnboarding()) return <Component />
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
