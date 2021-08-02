import React from "react";
import { Route, Switch, Redirect } from "react-router";
import Register from "./pages/auth/signup/register"
import Signin from "./pages/auth/signin/signin";
import Resetpassword from "./pages/auth/resetpassword/resetpassword";
import Quotes from "./pages/quotes/quotes";
import Inventory from "./pages/inventory/inventory";
import Sales from "./pages/sales/sales";

import { ChangePassword, Dashboard } from "pages";

import { completedOnboarding, getAuthUser } from "libs/auth";


export const PrivateRoute = ({ children, ...rest }) => {
  if (getAuthUser()) return <Route component={children} {...rest} />
  return <Redirect to="signin" />

}

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact render={({ history: { replace } }) => {
        if (completedOnboarding()) return replace('/dashboard')
        return <Register />
      }} />
      <Route path="/signin" exact component={Signin} />
      <Route path="/password-reset" exact component={Resetpassword} />
      <Route path="/change-password" exact component={ChangePassword} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Redirect to="/" />
    </Switch>
  );
}
