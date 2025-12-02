import { Box, Container, Heading, VStack, useColorModeValue } from '@chakra-ui/react'
import { ImageUploader } from '../components/ImageUploader'
import { ImageEditor } from '../components/ImageEditor'
import { AdContainer } from '../components/AdContainer'
import { Header } from '../components/Header'
import { SEO } from '../components/SEO'
import { useState, useEffect } from 'react'

interface ImageFile {
  file: File
  preview: string
}

export default function EditorPage() {
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null)
  const bg = useColorModeValue('gray.50', 'gray.800')

  useEffect(() => {
    return () => {
      if (selectedImage?.preview) {
        URL.revokeObjectURL(selectedImage.preview)
      }
    }
  }, [selectedImage])

  return (
    <Box bg={bg} minH="100vh">
      <SEO
        title="Image Shark - Online Photo Editor"
        description="Edit your images online with our free image editor. Compress, resize, crop, add watermarks, and more."
      />
      <Header />
      <Box py={12}>
        <Container maxW="container.lg">
          <VStack spacing={8} align="center" w="full">
            <Heading as="h1" size="xl" textAlign="center" mb={4}>
              Online Image Editor
            </Heading>
            <AdContainer id="editor-top-ad" type="leaderboard" />
            {!selectedImage ? (
              <ImageUploader setSelectedImage={setSelectedImage} />
            ) : (
              <Box w="full">
                <ImageEditor
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                />
              </Box>
            )}
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}