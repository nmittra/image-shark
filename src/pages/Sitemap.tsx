import { Box, Container, Heading, SimpleGrid, VStack, Text, Link, useColorModeValue } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { Header } from '../components/Header'

interface SitemapSection {
  title: string
  links: Array<{
    title: string
    path: string
    description?: string
  }>
}

export function Sitemap() {
  const bg = useColorModeValue('gray.50', 'gray.800')
  const cardBg = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const sitemapData: SitemapSection[] = [
    {
      title: 'Main Features',
      links: [
        {
          title: 'Compress Image',
          path: '/compress',
          description: 'Compress JPG, PNG and GIFs while saving space and maintaining quality.'
        },
        {
          title: 'Resize Image',
          path: '/resize',
          description: 'Define your dimensions by percent or pixel, and resize your JPG, PNG and GIF images.'
        },
        {
          title: 'Photo Editor',
          path: '/editor',
          description: 'Spice up your pictures with text, effects, frames or stickers.'
        },
        {
          title: 'Watermark Image',
          path: '/watermark',
          description: 'Stamp an image or text over your images in seconds.'
        },
        {
          title: 'Crop Image',
          path: '/editor?tab=crop',
          description: 'Crop your images to the perfect size and aspect ratio.'
        },
        {
          title: 'Convert Format',
          path: '/editor?tab=convert',
          description: 'Convert your images between different formats including JPG, PNG, and WebP.'
        },
        {
          title: 'Meme Generator',
          path: '/editor?tab=meme',
          description: 'Create funny memes by adding custom text to your images.'
        }
      ]
    },
    {
      title: 'Legal',
      links: [
        { title: 'Privacy Policy', path: '/privacy-policy' },
        { title: 'Terms of Service', path: '/terms-of-service' },
        { title: 'Cookie Policy', path: '/cookie-policy' },
        { title: 'Copyright Notice', path: '/copyright' }
      ]
    },
    {
      title: 'Support',
      links: [
        { title: 'Contact Us', path: '/contact' },
        { title: 'Home', path: '/' }
      ]
    }
  ]

  return (
    <Box bg={bg} minH="100vh">
      <Header />
      <Box py={12}>
        <Container maxW="container.xl">
          <VStack spacing={8} align="start">
            <Heading as="h1" size="xl">
              Sitemap
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
              {sitemapData.map((section) => (
                <Box key={section.title}>
                  <Heading as="h2" size="lg" mb={4}>
                    {section.title}
                  </Heading>
                  <VStack spacing={4} align="start">
                    {section.links.map((link) => (
                      <Box
                        key={link.path}
                        p={4}
                        bg={cardBg}
                        borderRadius="md"
                        borderWidth={1}
                        borderColor={borderColor}
                        w="full"
                      >
                        <Link
                          as={RouterLink}
                          to={link.path}
                          fontWeight="medium"
                          display="block"
                        >
                          {link.title}
                        </Link>
                        {link.description && (
                          <Text color="gray.500" fontSize="sm" mt={1}>
                            {link.description}
                          </Text>
                        )}
                      </Box>
                    ))}
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}

export default Sitemap