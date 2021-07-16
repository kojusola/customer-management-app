import React from "react";
import { Route, Switch } from "react-router";
import Register from "./pages/auth/signup/register"
import Signin from "./pages/auth/signin/signin";
import Resetpassword from "./pages/auth/resetpassword/resetpassword";
import quotes from "./pages/quotes/quotes";

function Routes() {
    return (
      <Switch>
       <Route path="/" exact component={Register} />
       <Route path="/signin" exact component={Signin} />
       <Route path="/password-reset" exact component={Resetpassword } />
       <Route path="/quotes" exact component={quotes} />
      </Switch>
    );
}

export default Routes;