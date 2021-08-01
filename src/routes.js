import React from "react";
import { Route, Switch, Redirect } from "react-router";
import Register from "./pages/auth/signup/register"
import Signin from "./pages/auth/signin/signin";
import Resetpassword from "./pages/auth/resetpassword/resetpassword";
import { ChangePassword, Dashboard } from "pages";

import { completedOnboarding } from "libs/auth";


function Routes() {
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

export default Routes;