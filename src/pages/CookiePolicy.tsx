import { Box, Container, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { Header } from '../components/Header'

export function CookiePolicy() {
  const bg = useColorModeValue('gray.50', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.300')

  return (
    <Box bg={bg} minH="100vh">
      <Header />
      <Container maxW="container.lg" py={12}>
        <VStack spacing={8} align="start">
          <Heading as="h1" size="xl">
            Cookie Policy
          </Heading>

          <Text color={textColor}>
            Last updated: {new Date().toLocaleDateString()}
          </Text>

          <VStack spacing={6} align="start">
            <Box>
              <Heading as="h2" size="lg" mb={4}>
                What Are Cookies
              </Heading>
              <Text color={textColor}>
                Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide a better user experience.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4}>
                How We Use Cookies
              </Heading>
              <Text color={textColor}>
                We use different types of cookies for different purposes:
              </Text>
              <VStack spacing={3} align="start" pl={4} mt={2}>
                <Text color={textColor}>• Essential Cookies: Required for the website to function properly</Text>
                <Text color={textColor}>• Analytics Cookies: Help us understand how visitors interact with our website</Text>
                <Text color={textColor}>• Preference Cookies: Remember your settings and preferences</Text>
              </VStack>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4}>
                Cookie Categories
              </Heading>
              <VStack spacing={4} align="start">
                <Box>
                  <Heading as="h3" size="md" mb={2}>
                    Essential Cookies
                  </Heading>
                  <Text color={textColor}>
                    These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you which amount to a request for services.
                  </Text>
                </Box>

                <Box>
                  <Heading as="h3" size="md" mb={2}>
                    Analytics Cookies
                  </Heading>
                  <Text color={textColor}>
                    These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular.
                  </Text>
                </Box>

                <Box>
                  <Heading as="h3" size="md" mb={2}>
                    Preference Cookies
                  </Heading>
                  <Text color={textColor}>
                    These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages.
                  </Text>
                </Box>
              </VStack>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4}>
                Managing Cookies
              </Heading>
              <Text color={textColor}>
                You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit our website.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="lg" mb={4}>
                Contact Us
              </Heading>
              <Text color={textColor}>
                If you have any questions about our Cookie Policy, please contact us at nmittra@gmail.com.
              </Text>
            </Box>
          </VStack>
        </VStack>
      </Container>

    </Box>
  )
}
export default CookiePolicy