import { store } from '@/app/store'
import '@/index.css'
import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import LazyApp from './App.lazy'

const root = document.getElementById('root')

if (!root) {
  throw new Error('root not found')
}

const container = createRoot(root)

container.render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
      <LazyApp />
    </Suspense>
  </Provider>
)
