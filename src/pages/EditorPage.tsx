import { Box, Container, Heading, VStack, useColorModeValue } from '@chakra-ui/react'
import { ImageUploader } from '../components/ImageUploader'
import { ImageEditor } from '../components/ImageEditor'
import { useState } from 'react'
import { Header } from '../components/Header'
import { useSearchParams } from 'react-router-dom'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { SEO } from '../components/SEO'
import { ToolInfoSection } from '../components/ToolInfoSection'

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
      <SEO
        title="Photo Editor - Edit Images Online Free"
        description="Professional online photo editor with filters, effects, frames, and stickers. Edit your images with simple and powerful tools."
        keywords="photo editor, image editor, edit photos online, photo effects, image filters"
      />
      <Header />
      <Box py={12}>
        <Container maxW="container.lg">
          <ErrorBoundary>
            <VStack spacing={8} align="center" w="full">
              <Heading as="h1" size="xl" textAlign="center" mb={4}>
                Photo Editor
              </Heading>
              {!selectedImage ? (
                <>
                  <ImageUploader setSelectedImage={setSelectedImage} />
                  <ToolInfoSection toolType="editor" />
                </>
              ) : (
                <Box w="full">
                  <ImageEditor
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    defaultTab="editor"
                  />
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