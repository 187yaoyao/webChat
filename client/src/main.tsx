
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from "recoil"
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './route'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <RouterProvider router={router}/>
  </RecoilRoot>,
)
