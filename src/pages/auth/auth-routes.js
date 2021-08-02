import Signin from "./signin/signin";
import ResetPassword from "./resetpassword/resetpassword";
import ChangePassword from "./change-password/change-password";
import Register from "./signup/register";
import { Switch, Redirect, Route } from "react-router-dom";
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
        <Route >
            Not found
        </Route>
    </Switch>
}