import React from "react";
import { Route, Switch } from "react-router-dom";
import Timeline from "../pages/timeline/timeline";
//apoio para rotas
export const routes = [{ path: "/", name: "Timeline", component: Timeline }];

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
