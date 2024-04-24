import ReactDOM from 'react-dom/client'
import {RecoilRoot} from 'recoil'
import {RouterProvider} from 'react-router-dom'
import './index.css'
import router from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
   <RouterProvider router={router}/>
  </RecoilRoot>,
)
