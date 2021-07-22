import React from "react";
import { Route, Switch } from "react-router";
import Register from "./pages/auth/signup/register"
import Signin from "./pages/auth/signin/signin";
import Resetpassword from "./pages/auth/resetpassword/resetpassword";
import Quotes from "./pages/quotes/quotes";
import Inventory from "./pages/inventory/inventory";
import Sales from "./pages/sales/sales";

function Routes() {
    return (
      <Switch>
       <Route path="/" exact component={Register} />
       <Route path="/signin" exact component={Signin} />
       <Route path="/password-reset" exact component={Resetpassword } />
       <Route path="/quotes" exact component={Quotes} />
       <Route path="/inventory" exact component={Inventory} />
       <Route path="/sales" exact component={Sales} />
      </Switch>
    );
}

export default Routes;