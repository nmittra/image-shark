import { Box, Container, Heading, VStack, useColorModeValue } from '@chakra-ui/react'
import { ImageUploader } from '../components/ImageUploader'
import { ImageEditor } from '../components/ImageEditor'
import { useState } from 'react'
import { Header } from '../components/Header'
import { SEO } from '../components/SEO'
import { ToolInfoSection } from '../components/ToolInfoSection'

interface ImageFile {
  file: File
  preview: string
}

export function WatermarkPage() {
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null)

  const bg = useColorModeValue('gray.50', 'gray.800')

  return (
    <Box bg={bg} minH="100vh">
      <SEO
        title="Add Watermark to Images Online Free"
        description="Add text or image watermarks to your photos. Protect your images with custom watermarks. Choose position, transparency, and typography."
        keywords="watermark images, add watermark, image watermark, protect photos, watermark tool"
      />
      <Header />
      <Box py={8}>
        <Container maxW="container.xl">
          <VStack spacing={8}>
            <Heading as="h1" size="xl" textAlign="center" mb={4}>
              Watermark Your Images
            </Heading>
            {!selectedImage ? (
              <>
                <ImageUploader setSelectedImage={setSelectedImage} />
                <ToolInfoSection toolType="watermark" />
              </>
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

export default WatermarkPage
