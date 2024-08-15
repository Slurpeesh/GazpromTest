import { store } from '@/app/store'
import '@/index.css'
import ErrorPage from '@/pages/ErrorPage/ErrorPage'
import PreloadPage from '@/pages/PreloadPage/PreloadPage'
import TablePage, { tableLoader } from '@/pages/TablePage/TablePage'
import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { initLoader } from './App'
import LazyApp from './App.lazy'

const root = document.getElementById('root')

if (!root) {
  throw new Error('root not found')
}

const container = createRoot(root)

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<PreloadPage />}>
        <LazyApp />
      </Suspense>
    ),
    loader: initLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ':pageId',
        loader: tableLoader,
        element: <TablePage />,
      },
    ],
  },
])

container.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
