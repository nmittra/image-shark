import { Box, Container, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { Header } from '../components/Header'

export function Copyright() {
  const bg = useColorModeValue('gray.50', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.300')

  return (
    <Box bg={bg} minH="100vh">
      <Header />
      <Container maxW="container.lg" py={12}>
        <VStack spacing={8} align="start">
          <Heading as="h1" size="xl">
            Copyright Notice
          </Heading>

          <Text color={textColor}>
            Last updated: {new Date().toLocaleDateString()}
          </Text>

          <VStack spacing={6} align="start">
            <Box>
              <Heading as="h2" size="lg" mb={4}>
                Copyright Protection
              </Heading>
              <Text color={textColor}>
                All content on this website, including but not limited to text, graphics, logos, images, software, code, and the compilation of all content on this site, is the property of Image Editor or its content suppliers and is protected by international copyright laws.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4}>
                Ownership of Content
              </Heading>
              <Text color={textColor}>
                The materials on this site are protected by copyright and trademark laws. Users may not modify, copy, reproduce, republish, upload, post, transmit, or distribute in any way any material from this site including code and software without express written permission from Image Editor.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4}>
                User-Generated Content
              </Heading>
              <Text color={textColor}>
                Users retain all rights to the images they upload for editing. By using our service, you warrant that you own the copyright to the images you upload or have obtained necessary permissions for their use.
              </Text>
            </Box>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default Copyright