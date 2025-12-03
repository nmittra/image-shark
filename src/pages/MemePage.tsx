import { Box, Container, Heading, VStack, useColorModeValue } from '@chakra-ui/react'
import { ImageUploader } from '../components/ImageUploader'
import { ImageEditor } from '../components/ImageEditor'
import { useState } from 'react'
import { Header } from '../components/Header'
import { SEO } from '../components/SEO'

interface ImageFile {
  file: File
  preview: string
}

export function MemePage() {
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null)

  const bg = useColorModeValue('gray.50', 'gray.800')

  return (
    <Box bg={bg} minH="100vh">
      <SEO
        title="Meme Generator - Create Memes Online Free"
        description="Create funny memes by adding custom text to your images. Perfect for social media sharing. Free online meme generator."
        keywords="meme generator, create memes, meme maker, funny memes, meme creator online"
      />
      <Header />
      <Box py={12}>
        <Container maxW="container.lg">
          <VStack spacing={8} align="center" w="full">
            <Heading as="h1" size="xl" textAlign="center" mb={4}>
              Create Your Memes
            </Heading>
            {!selectedImage ? (
              <ImageUploader setSelectedImage={setSelectedImage} />
            ) : (
              <ImageEditor
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                defaultTab="meme"
              />
            )}
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}

export default MemePage
