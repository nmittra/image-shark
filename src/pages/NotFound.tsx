import { Box, Button, Container, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()
  const bg = useColorModeValue('gray.50', 'gray.800')

  return (
    <Box bg={bg} minH="100vh" display="flex" alignItems="center">
      <Container maxW="container.md" py={20}>
        <VStack spacing={8} textAlign="center">
          <Heading size="4xl" color={useColorModeValue('gray.600', 'gray.200')}>404</Heading>
          <Heading size="xl">Page Not Found</Heading>
          <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
            The page you're looking for doesn't exist or has been moved.
          </Text>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => navigate('/')}
          >
            Return to Home
          </Button>
        </VStack>
      </Container>
    </Box>
  )
}

export default NotFound