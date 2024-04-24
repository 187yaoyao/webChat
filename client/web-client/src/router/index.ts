import {createBrowserRouter} from 'react-router-dom';
import userRoutes from './user';

const router = createBrowserRouter([
    userRoutes
],{
    basename: '/web-chat'
})

export default router;