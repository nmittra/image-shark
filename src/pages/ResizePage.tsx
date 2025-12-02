import { Box, Container, Heading, VStack, useColorModeValue } from '@chakra-ui/react'
import { ImageUploader } from '../components/ImageUploader'
import { ImageEditor } from '../components/ImageEditor'
import { AdContainer } from '../components/AdContainer'
import { Header } from '../components/Header'
import { useState, useEffect } from 'react'

interface ImageFile {
  file: File
  preview: string
}

export function ResizePage() {
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null)
  const bg = useColorModeValue('gray.50', 'gray.800')
  const textColor = useColorModeValue('gray.800', 'white')

  useEffect(() => {
    console.log('Selected image state changed:', selectedImage)
  }, [selectedImage])

  const handleImageSelect = (image: ImageFile | null) => {
    console.log('Handling image selection:', image)
    setSelectedImage(image)
  }

  return (
    <Box bg={bg} minH="100vh">
      <Header />
      <Box py={8}>
        <Container maxW="container.xl">
          <VStack spacing={8}>
            <Heading as="h1" size="xl" textAlign="center" mb={4} color={textColor}>
              Resize Your Images
            </Heading>
            <AdContainer id="resize-top-ad" type="leaderboard" />
            {!selectedImage ? (
              <ImageUploader setSelectedImage={handleImageSelect} />
            ) : (
              <ImageEditor
                selectedImage={selectedImage}
                setSelectedImage={handleImageSelect}
                defaultTab="resize"
              />
            )}
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}

export default ResizePage;