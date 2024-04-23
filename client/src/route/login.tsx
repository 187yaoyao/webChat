import { RouteObject } from "react-router-dom";
import { lazy } from "react";

const Login = lazy(() => import("../pages/login"));
const loginRouter: RouteObject = {
    path: "/login",
    element: <Login />,
}

export default loginRouter;