import { Box, Container, Heading, VStack, useColorModeValue } from '@chakra-ui/react'
import { ImageUploader } from '../components/ImageUploader'
import { ImageEditor } from '../components/ImageEditor'
import { AdContainer } from '../components/AdContainer'
import { useState } from 'react'
import { Header } from '../components/Header'

interface ImageFile {
  file: File
  preview: string
}

export function WatermarkPage() {
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null)

  const bg = useColorModeValue('gray.50', 'gray.800')

  return (
    <Box bg={bg} minH="100vh">
      <Header />
      <Box py={8}>
        <Container maxW="container.xl">
          <VStack spacing={8} align="center" w="full">
            <Heading as="h1" size="xl" textAlign="center" mb={4}>
              Image Watermark
            </Heading>
            <AdContainer id="watermark-top-ad" type="leaderboard" />
            {!selectedImage ? (
              <ImageUploader setSelectedImage={setSelectedImage} />
            ) : (
              <ImageEditor
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                defaultTab="watermark"
              />
            )}
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}

export default WatermarkPage;