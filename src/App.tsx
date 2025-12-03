import { Box, useColorModeValue } from '@chakra-ui/react'
import { CookieConsent } from './components/CookieConsent'
import { Footer } from './components/Footer'
import { LoadingIndicator } from './components/LoadingIndicator'
import { ErrorBoundary } from './components/ErrorBoundary'
import { SkipToContent } from './components/SkipToContent'
import { AdContainer } from './components/AdContainer'
import { useState, useEffect, useMemo } from 'react'
import { useLocation, Outlet, useNavigation } from 'react-router-dom'

interface ImageFile {
  file: File
  preview: string
}

type ImageContext = [
  ImageFile | null,
  React.Dispatch<React.SetStateAction<ImageFile | null>>
]

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null)
  const bg = useColorModeValue('gray.50', 'gray.800')
  const navigation = useNavigation()
  const isLoading = navigation.state === "loading"

  const imageContext = useMemo(
    () => [selectedImage, setSelectedImage] as const,
    [selectedImage]
  )

  useEffect(() => {
    return () => {
      // Cleanup any selected image data and revoke object URLs
      if (selectedImage?.preview) {
        URL.revokeObjectURL(selectedImage.preview)
      }
    }
  }, [selectedImage])

  return (
    <Box bg={bg} minH="100vh" display="flex" flexDirection="column">
      <SkipToContent />
      <Box as="main" id="main-content" flex="1" role="main">
        <ScrollToTop />
        <Box flex="1">
          {isLoading && <LoadingIndicator />}
          <ErrorBoundary>
            <Outlet context={imageContext} />
          </ErrorBoundary>
          <Footer />
          <CookieConsent />
          <AdContainer id="mobile-anchor-ad" type="anchor" />
        </Box>
      </Box>
    </Box>
  )
}

export default App
