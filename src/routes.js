import React from "react";
import { Route, Switch } from "react-router";
import Register from "./pages/auth/signup/register"
import Signin from "./pages/auth/signin/signin";

function Routes() {
    return (
      <Switch>
       <Route path="/" exact component={Register} />
       <Route path="/signin" exact component={Signin} />
      </Switch>
    );
}

export default Routes;