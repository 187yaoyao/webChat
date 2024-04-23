import {createBrowserRouter} from 'react-router-dom';
import loginRouter from './login';

const router = createBrowserRouter([
    loginRouter
],{
    basename: "/web-chat",
})

export default router