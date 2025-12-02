import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { Header } from '../components/Header'
import { useState } from 'react'

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const bg = useColorModeValue('gray.50', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically send the email using a backend service
      // For now, we'll just simulate the email sending
      await new Promise(resolve => setTimeout(resolve, 1000))

      toast({
        title: 'Message sent!',
        description: 'We\'ll get back to you as soon as possible at admin@image-shark.com.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

      // Clear the form
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box bg={bg} minH="100vh">
      <Header />
      <Container maxW="container.md" py={12}>
        <VStack spacing={8} align="start">
          <Heading as="h1" size="xl">
            Contact Us
          </Heading>

          <Text color={textColor}>
            Have a question or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible at admin@image-shark.com.
          </Text>

          <Box as="form" onSubmit={handleSubmit} width="100%">
            <VStack spacing={4} align="start">
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Subject</FormLabel>
                <Input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What is this about?"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Message</FormLabel>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message here..."
                  rows={6}
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isSubmitting}
                loadingText="Sending"
                width="full"
              >
                Send Message
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default Contact;