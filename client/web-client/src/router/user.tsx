import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Login = lazy(() => import('../pages/login/index'));

const userRoutes: RouteObject = {
    path: '/login',
    element: <Login/>
}

export default userRoutes;