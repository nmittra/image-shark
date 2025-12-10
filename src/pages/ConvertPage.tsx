import { Box, Container, Heading, VStack, useColorModeValue } from '@chakra-ui/react'
import { ImageUploader } from '../components/ImageUploader'
import { ImageEditor } from '../components/ImageEditor'
import { Header } from '../components/Header'
import { SEO } from '../components/SEO'
import { ToolInfoSection } from '../components/ToolInfoSection'
import { useState } from 'react'

interface ImageFile {
  file: File
  preview: string
}

export function ConvertPage() {
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null)
  const bg = useColorModeValue('gray.50', 'gray.800')

  return (
    <Box bg={bg} minH="100vh">
      <SEO
        title="Convert Image Format Online Free"
        description="Convert images between JPG, PNG, WebP and other formats. Maintain quality while changing file types. Free online image converter."
        keywords="convert images, image converter, jpg to png, png to jpg, webp converter, change image format"
      />
      <Header />
      <Box py={12}>
        <Container maxW="container.lg">
          <VStack spacing={8} align="center" w="full">
            <Heading as="h1" size="xl" textAlign="center" mb={4}>
              Convert Image Format
            </Heading>
            {!selectedImage ? (
              <>
                <ImageUploader setSelectedImage={setSelectedImage} />
                <ToolInfoSection toolType="convert" />
              </>
            ) : (
              <ImageEditor
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                defaultTab="convert"
              />
            )}
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}

export default ConvertPage