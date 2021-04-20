import React from "react";
import { Route, Switch } from "react-router-dom";
import Timeline from "../pages/timeline/timeline";
import Login from "../pages/login/login";
import Signup from "../pages/signup/signup";
import Feed from "../pages/feed/feed";

//apoio para rotas
export const routes = [
  { path: "/", name: "Login", component: Login },
  { path: "/timeline", name: "Timeline", component: Timeline },
  { path: "/cadastro", name: "Cadastro", component: Signup },
  { path: "/feed", name: "Feed", component: Feed },
];

const Routes = () => {
  return (
    <Switch>
      {routes.map((route, key) => (
        <Route key={key} exact path={route.path}>
          <route.component />
        </Route>
      ))}
    </Switch>
  );
};

export default Routes;
