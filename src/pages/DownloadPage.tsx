import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  SimpleGrid,
  HStack
} from '@chakra-ui/react'
import { FiDownload, FiEdit, FiRefreshCw } from 'react-icons/fi'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Header } from '../components/Header'

export default function DownloadPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editedImage = searchParams.get('image')
  const originalFileName = searchParams.get('fileName') || 'image'
  
  const bg = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const handleDownload = () => {
    if (!editedImage) return
    const link = document.createElement('a')
    link.href = editedImage
    link.download = `edited-${originalFileName}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleStartOver = () => {
    navigate('/')
  }

  const handleCompressAnother = () => {
    navigate('/compress')
  }

  const handleContinueEditing = () => {
    const currentTab = searchParams.get('tab') || 'editor'
    navigate(`/editor?tab=${currentTab}`, { 
      state: { 
        image: editedImage,
        fileName: originalFileName
      }
    })
  }

  const editingOptions = [
    { title: 'Resize', path: '/editor?tab=resize', description: 'Adjust image dimensions' },
    { title: 'Crop', path: '/editor?tab=crop', description: 'Cut and frame your image' },
    { title: 'Compress', path: '/editor?tab=compress', description: 'Reduce file size' },
    { title: 'Watermark', path: '/editor?tab=watermark', description: 'Add text or logo overlay' }
  ]

  if (!editedImage) {
    return (
      <Box bg={useColorModeValue('gray.50', 'gray.800')} minH="100vh">
        <Header />
        <Container maxW="container.xl" py={8}>
          <VStack spacing={4} align="center">
            <Heading size="lg">No image found</Heading>
            <Button onClick={() => navigate('/')} colorScheme="blue">Go to Home</Button>
          </VStack>
        </Container>
      </Box>
    )
  }

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.800')} minH="100vh">
      <Header />
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading size="xl" mb={4}>Your Image is Ready!</Heading>
            <Text fontSize="lg" color="gray.600">Download your edited image or continue editing</Text>
          </Box>

          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8}>
            <Box
              bg={bg}
              p={6}
              borderRadius="lg"
              border="1px"
              borderColor={borderColor}
              shadow="sm"
            >
              <VStack spacing={6}>
                <Box
                  w="full"
                  h="300px"
                  bg="gray.100"
                  borderRadius="md"
                  overflow="hidden"
                  position="relative"
                >
                  <img
                    src={editedImage}
                    alt="Edited preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </Box>
                <Button
                  leftIcon={<FiDownload />}
                  colorScheme="blue"
                  size="lg"
                  w="full"
                  onClick={handleDownload}
                >
                  Download Image
                </Button>
                <HStack spacing={4} w="full">
                  <Button
                    leftIcon={<FiEdit />}
                    variant="outline"
                    flex={1}
                    onClick={handleContinueEditing}
                  >
                    Continue Editing
                  </Button>
                  <Button
                    leftIcon={<FiRefreshCw />}
                    variant="outline"
                    flex={1}
                    onClick={handleStartOver}
                  >
                    Start Over
                  </Button>
                </HStack>
              </VStack>
            </Box>

            <Box>
              <Heading size="md" mb={4}>More Editing Options</Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {editingOptions.map((option, index) => (
                  <Box
                    key={index}
                    p={4}
                    bg={bg}
                    borderRadius="md"
                    border="1px"
                    borderColor={borderColor}
                    cursor="pointer"
                    onClick={() => navigate(option.path)}
                    _hover={{ borderColor: 'blue.500' }}
                  >
                    <Heading size="sm" mb={2}>{option.title}</Heading>
                    <Text fontSize="sm" color="gray.600">{option.description}</Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          </Grid>
        </VStack>
      </Container>
    </Box>
  )
}