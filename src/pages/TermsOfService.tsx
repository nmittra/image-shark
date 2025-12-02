import { Box, Container, Heading, Text, VStack, useColorModeValue, Link as ChakraLink } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { Link } from 'react-router-dom'

const TermsOfService = () => {
  const bg = useColorModeValue('gray.50', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.300')

  return (
    <Box bg={bg} minH="100vh">
      <Header />
      <Container maxW="container.lg" py={12}>
        <VStack spacing={8} align="start">
          <Heading as="h1" size="xl">
            Terms of Service
          </Heading>

          <Text color={textColor}>
            Last updated: {new Date().toLocaleDateString()}
          </Text>

          <VStack spacing={6} align="start">
            <Box>
              <Heading as="h2" size="lg" mb={4}>
                1. Acceptance of Terms
              </Heading>
              <Text color={textColor}>
                By accessing and using Image Shark, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4}>
                2. Description of Service
              </Heading>
              <Text color={textColor}>
                Image Shark provides online image editing tools including but not limited to image compression, resizing, watermarking, and format conversion. The service is provided "as is" and "as available" basis.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4}>
                3. User Obligations
              </Heading>
              <VStack spacing={3} align="start" pl={4}>
                <Text color={textColor}>• You must be at least 13 years old to use this service</Text>
                <Text color={textColor}>• You are responsible for maintaining the confidentiality of your account</Text>
                <Text color={textColor}>• You agree not to use the service for any illegal or unauthorized purpose</Text>
                <Text color={textColor}>• You must not transmit any malicious code or attempt to harm the service</Text>
              </VStack>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4}>
                4. Intellectual Property Rights
              </Heading>
              <Text color={textColor}>
                You retain all rights to the images you upload. By using our service, you grant us a non-exclusive license to process and store your images solely for the purpose of providing our service to you.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4}>
                5. Limitations of Liability
              </Heading>
              <Text color={textColor}>
                Image Shark shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4}>
                6. Changes to Terms
              </Heading>
              <Text color={textColor}>
                We reserve the right to modify these terms at any time. We will notify users of any changes by posting the new Terms of Service on this page and updating the "Last updated" date.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4}>
                7. Contact Information
              </Heading>
              <Text color={textColor}>
                For any questions about these Terms of Service, please{' '}
                <ChakraLink as={Link} to="/contact" color="blue.500" textDecoration="underline">
                  contact us
                </ChakraLink>.
              </Text>
            </Box>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default TermsOfService