import Signin from "./signin/signin";
import ResetPassword from "./reset-password/reset-password";
import ChangePassword from "./change-password/change-password";
import Register from "./signup/register";
import CompletePayment from "./complete-payment/complete-payment";
import { Switch, Redirect, Route, useHistory } from "react-router-dom";
import Notfound from './not-found';

import { getAuthUser, completedOnboarding } from "libs/auth";


const authRoutes = [
    {
        path: '/signin',
        exact: () => true,
        component: Signin
    },
    {
        path: '/change-password',
        exact: () => true,
        component: ChangePassword
    },
    {
        path: '/password-reset',
        exact: () => true,
        component: ResetPassword
    },

]

export default function AuthRoutes() {

    const { goBack } = useHistory();

    return <Switch>
        <Route path="/" exact render={() => {
            if (completedOnboarding()) return <Redirect to="/dashboard" />
            return <Register />
        }} />
        {authRoutes.map(({ path, exact, component: Component }) => <Route
            key={path}
            path={path}
            exact={exact()}
            render={() => {
                if (getAuthUser()) return <Redirect to="/dashboard" />
                return <Component />
            }}
        />)}
        <Route path="/complete-payment/:urlId" exact component={CompletePayment} />
        <Route >
            <Notfound handleOnClicked={goBack} />
        </Route>
    </Switch>
}