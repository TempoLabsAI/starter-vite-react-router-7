import { type RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default new Promise((resolve) => {
  flatRoutes().then((routes) => {
    console.log(routes)
    resolve(routes);
  });

  
});
