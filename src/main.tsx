import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App'
import { LoadingIndicator } from './components/LoadingIndicator'
import { ErrorBoundary } from './components/ErrorBoundary'
import { RouteErrorBoundary } from './components/RouteErrorBoundary'

const routes = {
  landing: lazy(() => import('./components/LandingPage')),
  compress: lazy(() => import('./pages/CompressPage')),
  resize: lazy(() => import('./pages/ResizePage')),
  watermark: lazy(() => import('./pages/WatermarkPage')),
  editor: lazy(() => import('./pages/EditorPage')),
  crop: lazy(() => import('./pages/CropPage')),
  convert: lazy(() => import('./pages/ConvertPage')),
  meme: lazy(() => import('./pages/MemePage')),
  privacy: lazy(() => import('./pages/PrivacyPolicy')),
  terms: lazy(() => import('./pages/TermsOfService')),
  cookie: lazy(() => import('./pages/CookiePolicy')),
  copyright: lazy(() => import('./pages/Copyright')),
  contact: lazy(() => import('./pages/Contact')),
  sitemap: lazy(() => import('./pages/Sitemap')),
  notFound: lazy(() => import('./pages/NotFound')),
  download: lazy(() => import('./pages/DownloadPage'))
};

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <routes.landing />
          </Suspense>
        ),
      },
      {
        path: 'compress',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <routes.compress />
          </Suspense>
        ),
      },
      {
        path: 'resize',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <routes.resize />
          </Suspense>
        ),
      },
      {
        path: 'watermark',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <routes.watermark />
          </Suspense>
        ),
      },
      {
        path: 'crop',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <routes.crop />
          </Suspense>
        ),
      },
      {
        path: 'convert',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <routes.convert />
          </Suspense>
        ),
      },
      {
        path: 'meme',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <routes.meme />
          </Suspense>
        ),
      },
      {
        path: 'editor',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <routes.editor />
          </Suspense>
        ),
      },
      {
        path: 'privacy-policy',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <routes.privacy />
          </Suspense>
        ),
      },
      {
        path: 'terms-of-service',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <routes.terms />
          </Suspense>
        ),
      },
      {
        path: 'cookie-policy',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <routes.cookie />
          </Suspense>
        ),
      },
      {
        path: 'copyright',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <routes.copyright />
          </Suspense>
        ),
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <routes.contact />
          </Suspense>
        ),
      },
      {
        path: 'sitemap',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <routes.sitemap />
          </Suspense>
        ),
      },
      {
        path: 'download',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <routes.download />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <routes.notFound />
          </Suspense>
        ),
      },
    ],
  },
])

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <HelmetProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </HelmetProvider>
    </ChakraProvider>
  </StrictMode>
)
