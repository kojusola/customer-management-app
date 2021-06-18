import React from "react";
import { Route, Switch } from "react-router";
import Register from "./pages/auth/signup/register"
import Signin from "./pages/auth/signin/signin";
import Resetpassword from "./pages/auth/resetpassword/resetpassword";

function Routes() {
    return (
      <Switch>
       <Route path="/" exact component={Register} />
       <Route path="/signin" exact component={Signin} />
       <Route path="/password-reset" exact component={Resetpassword } />
      </Switch>
    );
}

export default Routes;