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

// Lazy load components
const LandingPage = lazy(() => import('./components/LandingPage'))
const CompressPage = lazy(() => import('./pages/CompressPage'))
const ResizePage = lazy(() => import('./pages/ResizePage'))
const WatermarkPage = lazy(() => import('./pages/WatermarkPage'))
const EditorPage = lazy(() => import('./pages/EditorPage'))
const CropPage = lazy(() => import('./pages/CropPage'))
const ConvertPage = lazy(() => import('./pages/ConvertPage'))
const MemePage = lazy(() => import('./pages/MemePage'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'))
const Copyright = lazy(() => import('./pages/Copyright'))
const Contact = lazy(() => import('./pages/Contact'))
const Sitemap = lazy(() => import('./pages/Sitemap'))
const NotFound = lazy(() => import('./pages/NotFound'))
const DownloadPage = lazy(() => import('./pages/DownloadPage'))
const PassportPage = lazy(() => import('./pages/PassportPage'))

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
        path: '/',
        element: <Suspense fallback={<LoadingIndicator />}><LandingPage /></Suspense>
      },
      {
        path: 'compress',
        element: <Suspense fallback={<LoadingIndicator />}><CompressPage /></Suspense>
      },
      {
        path: 'resize',
        element: <Suspense fallback={<LoadingIndicator />}><ResizePage /></Suspense>
      },
      {
        path: 'watermark',
        element: <Suspense fallback={<LoadingIndicator />}><WatermarkPage /></Suspense>
      },
      {
        path: 'crop',
        element: <Suspense fallback={<LoadingIndicator />}><CropPage /></Suspense>
      },
      {
        path: 'convert',
        element: <Suspense fallback={<LoadingIndicator />}><ConvertPage /></Suspense>
      },
      {
        path: 'meme',
        element: <Suspense fallback={<LoadingIndicator />}><MemePage /></Suspense>
      },
      {
        path: 'editor',
        element: <Suspense fallback={<LoadingIndicator />}><EditorPage /></Suspense>
      },
      {
        path: 'privacy-policy',
        element: <Suspense fallback={<LoadingIndicator />}><PrivacyPolicy /></Suspense>
      },
      {
        path: 'terms-of-service',
        element: <Suspense fallback={<LoadingIndicator />}><TermsOfService /></Suspense>
      },
      {
        path: 'cookie-policy',
        element: <Suspense fallback={<LoadingIndicator />}><CookiePolicy /></Suspense>
      },
      {
        path: 'copyright',
        element: <Suspense fallback={<LoadingIndicator />}><Copyright /></Suspense>
      },
      {
        path: 'contact',
        element: <Suspense fallback={<LoadingIndicator />}><Contact /></Suspense>
      },
      {
        path: 'sitemap',
        element: <Suspense fallback={<LoadingIndicator />}><Sitemap /></Suspense>
      },
      {
        path: 'download',
        element: <Suspense fallback={<LoadingIndicator />}><DownloadPage /></Suspense>
      },
      {
        path: 'passport',
        element: <Suspense fallback={<LoadingIndicator />}><PassportPage /></Suspense>
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <StrictMode>
    <HelmetProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ErrorBoundary>
          <Suspense fallback={<LoadingIndicator />}>
            <RouterProvider router={router} />
          </Suspense>
        </ErrorBoundary>
      </ChakraProvider>
    </HelmetProvider>
  </StrictMode>
)
