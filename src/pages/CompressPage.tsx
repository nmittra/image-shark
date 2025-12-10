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

export function CompressPage() {
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null)
  const bg = useColorModeValue('gray.50', 'gray.800')

  return (
    <Box bg={bg} minH="100vh">
      <SEO
        title="Compress Images Online Free"
        description="Compress JPG, PNG and GIF images while maintaining quality. Reduce file size for faster loading and save storage space. Free online image compression tool."
        keywords="compress images, image compression, reduce file size, optimize images, compress jpg, compress png"
      />
      <Header />
      <Box py={8}>
        <Container maxW="container.xl">
          <VStack spacing={8}>
            <Heading as="h1" size="xl" textAlign="center" mb={4}>
              Compress Images
            </Heading>
            {!selectedImage ? (
              <>
                <ImageUploader setSelectedImage={setSelectedImage} />
                <ToolInfoSection toolType="compress" />
              </>
            ) : (
              <ImageEditor
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                defaultTab="compress"
              />
            )}
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}

export default CompressPage
