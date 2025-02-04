import { ConfigProvider } from 'antd'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { persistore, store } from './app/store.jsx'
import './index.css'
import router from './router/router.jsx'
import themeConfig from './theme/themeConfig.js'
import {Toaster} from 'sonner'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistore}>
        <ConfigProvider theme={themeConfig}>
          <RouterProvider router={router}>
          <Toaster richColors position="bottom-right" />
          </RouterProvider>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
