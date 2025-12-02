import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { lazyImport } from '../utils/lazyImport';
import App from '../App';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { RouteErrorBoundary } from '../components/RouteErrorBoundary';

// Import components with default exports using React.lazy
const { default: LandingPage } = lazyImport(() => import('../components/LandingPage'), 'default');

// Import components with default exports using React.lazy
const { default: CompressPage } = lazyImport(() => import('../pages/CompressPage'), 'default');
const { ResizePage } = lazyImport(() => import('../pages/ResizePage'), 'ResizePage');
const { WatermarkPage } = lazyImport(() => import('../pages/WatermarkPage'), 'WatermarkPage');
const { default: EditorPage } = lazyImport(() => import('../pages/EditorPage'), 'default');
const { default: CropPage } = lazyImport(() => import('../pages/CropPage'), 'default');
const { default: ConvertPage } = lazyImport(() => import('../pages/ConvertPage'), 'default');
const { default: MemePage } = lazyImport(() => import('../pages/MemePage'), 'default');
const { default: PrivacyPolicy } = lazyImport(() => import('../pages/PrivacyPolicy'), 'default');
const { default: TermsOfService } = lazyImport(() => import('../pages/TermsOfService'), 'default');
const { default: CookiePolicy } = lazyImport(() => import('../pages/CookiePolicy'), 'default');
const { default: Copyright } = lazyImport(() => import('../pages/Copyright'), 'default');
const { default: Contact } = lazyImport(() => import('../pages/Contact'), 'default');
const { default: Sitemap } = lazyImport(() => import('../pages/Sitemap'), 'default');
const { default: NotFound } = lazyImport(() => import('../pages/NotFound'), 'default');
const { default: DownloadPage } = lazyImport(() => import('../pages/DownloadPage'), 'default');

// Create and export the router configuration
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { 
        index: true,
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
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);