import { Box, Container, Heading, VStack, useColorModeValue } from '@chakra-ui/react'
import { ImageUploader } from '../components/ImageUploader'
import { ImageEditor } from '../components/ImageEditor'
import { Header } from '../components/Header'

interface ImageFile {
  file: File
  preview: string
}

interface CompressPageProps {
  selectedImage: ImageFile | null
  setSelectedImage: (image: ImageFile | null) => void
}

export function CompressPage({ selectedImage, setSelectedImage }: CompressPageProps) {
  const bg = useColorModeValue('gray.50', 'gray.800')

  return (
    <Box bg={bg} minH="100vh">
      <Header />
      <Box py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8}>
          <Heading as="h1" size="xl" textAlign="center" mb={4}>
            Compress Images
          </Heading>
          {!selectedImage ? (
            <ImageUploader setSelectedImage={setSelectedImage} />
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
