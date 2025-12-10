import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Icon,
  Text,
  VStack,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { AdContainer } from './AdContainer'
import { FiImage, FiCrop, FiEdit, FiDownload } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Header } from './Header'
import { SEO } from './SEO'

interface FeatureCardProps {
  icon: typeof FiImage
  title: string
  description: string
  to: string
}

function FeatureCard({ icon, title, description, to }: FeatureCardProps) {
  const cardBg = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <Box
      as={Link}
      to={to}
      p={6}
      bg={cardBg}
      borderRadius="xl"
      borderWidth={1}
      borderColor={borderColor}
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(-4px)',
        shadow: 'lg',
      }}
    >
      <VStack spacing={4} align="flex-start">
        <Icon as={icon} boxSize={8} color="blue.500" />
        <Heading size="md">{title}</Heading>
        <Text color="gray.500">{description}</Text>
      </VStack>
    </Box>
  )
}

export function LandingPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const features = [
    {
      icon: FiImage,
      title: 'Compress IMAGE',
      description: 'Compress JPG, PNG and GIFs while saving space and maintaining quality.',
      to: '/compress',
    },
    {
      icon: FiCrop,
      title: 'Resize IMAGE',
      description: 'Define your dimensions by percent or pixel, and resize your JPG, PNG and GIF images.',
      to: '/resize',
    },
    {
      icon: FiEdit,
      title: 'Photo Editor',
      description: 'Spice up your pictures with text, effects, frames or stickers. Simple editing tools for your image needs.',
      to: '/editor',
    },
    {
      icon: FiDownload,
      title: 'Watermark IMAGE',
      description: 'Stamp an image or text over your images in seconds. Choose your typography, transparency and position.',
      to: '/watermark',
    },
    {
      icon: FiCrop,
      title: 'Crop IMAGE',
      description: 'Crop your images to the perfect size and aspect ratio. Remove unwanted areas with precision.',
      to: '/editor/crop',
    },
    {
      icon: FiEdit,
      title: 'Convert Format',
      description: 'Convert your images between different formats including JPG, PNG, and WebP while maintaining quality.',
      to: '/editor/convert',
    },
    {
      icon: FiEdit,
      title: 'Meme Generator',
      description: 'Create funny memes by adding custom text to your images. Perfect for social media sharing.',
      to: '/editor/meme',
    }
  ]

  return (
    <Box>
      <SEO
        title="Free Online Image Editor & Photo Editing Tools"
        description="Edit, compress, resize, watermark, crop, and convert images online for free with Image Shark. Professional image editing tools with no registration required."
        keywords="image editor, photo editor, compress images, resize images, watermark images, crop images, convert images, meme generator, free online image tools"
      />
      <Header />
      <Box
        bgGradient="linear(to-r, green.200, blue.400, purple.500, pink.400)"
        py={32}
        px={4}
        textAlign="center"
        position="relative"
        overflow="hidden"
      >
        <Container maxW="container.lg">
          <VStack spacing={8} position="relative" zIndex={2}>
            <Heading
              as="h1"
              size="3xl"
              color="white"
              fontWeight="extrabold"
              lineHeight="1.2"
              textShadow="0 2px 4px rgba(0,0,0,0.2)"
              maxW="800px"
              mx="auto"
            >
              Every tool you could want to edit images in bulk
            </Heading>
            <Text
              fontSize="xl"
              color="white"
              opacity={0.9}
              maxW="600px"
              mx="auto"
              textShadow="0 1px 2px rgba(0,0,0,0.1)"
            >
              Your online photo editor is here and forever free!
            </Text>
            <Button
              size="lg"
              colorScheme="whiteAlpha"
              fontWeight="bold"
              px={8}
              py={6}
              onClick={onOpen}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'xl'
              }}
              transition="all 0.2s"
              mt={8}
            >
              Start Editing
            </Button>
          </VStack>
        </Container>
      </Box>

      <Container maxW="container.xl" py={20}>
        <AdContainer id="landing-leaderboard" type="leaderboard" />
        <Grid
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          gap={8}
        >
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </Grid>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose Your Editing Tool</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Grid
              templateColumns={{
                base: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              }}
              gap={4}
            >
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default LandingPage
