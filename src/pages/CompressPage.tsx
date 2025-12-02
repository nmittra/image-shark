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

export function CompressPage() {
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null)
  const bg = useColorModeValue('gray.50', 'gray.800')

  return (
    <Box bg={bg} minH="100vh" display="flex" flexDirection="column">
      <Header />
      <Box py={8} flex="1">
        <Container maxW="container.xl" h="100%" display="flex" flexDirection="column">
          <VStack spacing={8} flex="1" w="100%" visibility="visible" opacity={1}>
            <Heading as="h1" size="xl" textAlign="center" mb={4}>
              Compress Images
            </Heading>
            <AdContainer id="compress-top-ad" type="leaderboard" />
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

export default CompressPage;