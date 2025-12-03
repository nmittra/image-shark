import { Box, Container, Heading, VStack, useColorModeValue } from '@chakra-ui/react'
import { ImageUploader } from '../components/ImageUploader'
import { ImageEditor } from '../components/ImageEditor'
import { useState } from 'react'
import { Header } from '../components/Header'
import { useSearchParams, Outlet } from 'react-router-dom'
import { ErrorBoundary } from '../components/ErrorBoundary'

interface ImageFile {
  file: File
  preview: string
}

export function EditorPage() {
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null)
  const [searchParams] = useSearchParams()
  const tab = searchParams.get('tab') || 'editor'

  const bg = useColorModeValue('gray.50', 'gray.800')

  return (
    <Box bg={bg} minH="100vh">
      <Header />
      <Box py={12}>
        <Container maxW="container.lg">
          <ErrorBoundary>
            <VStack spacing={8} align="center" w="full">
              <Heading as="h1" size="xl" textAlign="center" mb={4}>
                Photo Editor
              </Heading>
              {!selectedImage ? (
                <ImageUploader setSelectedImage={setSelectedImage} />
              ) : (
                <Box w="full">
                  <Outlet context={[selectedImage, setSelectedImage]} />
                </Box>
              )}
            </VStack>
          </ErrorBoundary>
        </Container>
      </Box>
    </Box>
  )
}

export default EditorPage