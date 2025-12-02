import { Box, Container, Heading, Text, VStack, useColorModeValue, Link as ChakraLink } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { Link } from 'react-router-dom'

const PrivacyPolicy = () => {
  const bg = useColorModeValue('gray.50', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.300')

  return (
    <Box bg={bg} minH="100vh">
      <Header />
      <Container maxW="container.lg" py={12}>
        <VStack spacing={8} align="start">
          <Heading as="h1" size="xl">
            Privacy Policy
          </Heading>

          <Text color={textColor}>
            Last updated: {new Date().toLocaleDateString()}
          </Text>

          <VStack spacing={6} align="start">
            <Box>
              <Heading as="h2" size="lg" mb={4}>
                Introduction
              </Heading>
              <Text color={textColor}>
                Welcome to Image Shark. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4}>
                Data We Collect
              </Heading>
              <Text color={textColor}>
                When you use our image editing services, we may collect and process the following data:
              </Text>
              <VStack spacing={3} align="start" pl={4} mt={2}>
                <Text color={textColor}>• Images you upload for editing</Text>
                <Text color={textColor}>• Technical data including browser type and version</Text>
                <Text color={textColor}>• Usage data including editing preferences</Text>
                <Text color={textColor}>• Cookie data as described in our Cookie Policy</Text>
              </VStack>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4}>
                How We Use Your Data
              </Heading>
              <Text color={textColor}>
                We use your data to:
              </Text>
              <VStack spacing={3} align="start" pl={4} mt={2}>
                <Text color={textColor}>• Provide our image editing services</Text>
                <Text color={textColor}>• Improve our website and services</Text>
                <Text color={textColor}>• Respond to your inquiries</Text>
                <Text color={textColor}>• Ensure website security</Text>
              </VStack>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4}>
                Data Security
              </Heading>
              <Text color={textColor}>
                We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4}>
                Your Rights
              </Heading>
              <Text color={textColor}>
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
              </Text>
              <VStack spacing={3} align="start" pl={4} mt={2}>
                <Text color={textColor}>• Request access to your personal data</Text>
                <Text color={textColor}>• Request correction of your personal data</Text>
                <Text color={textColor}>• Request erasure of your personal data</Text>
                <Text color={textColor}>• Object to processing of your personal data</Text>
                <Text color={textColor}>• Request restriction of processing your personal data</Text>
                <Text color={textColor}>• Request transfer of your personal data</Text>
              </VStack>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4}>
                Contact Us
              </Heading>
              <Text color={textColor}>
                If you have any questions about this privacy policy or our privacy practices, please{' '}
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

export default PrivacyPolicy