import { Box, Container, Heading, Text, VStack, useColorModeValue, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { Helmet } from 'react-helmet-async'

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: 'How do I crop an image?',
    answer: 'Upload your image, go to the Crop tool, adjust the crop area by dragging the corners or edges, and click "Apply" to save your changes.'
  },
  {
    question: 'What image formats are supported?',
    answer: 'We support common image formats including JPG, PNG, WebP, and GIF. You can also convert between these formats.'
  },
  {
    question: 'Is there a file size limit?',
    answer: 'Yes, the maximum file size is 10MB per image. For larger files, try our compression tool first.'
  },
  {
    question: 'Are my images stored on your servers?',
    answer: 'No, all image processing is done in your browser. We never store or transmit your images to any server.'
  },
  {
    question: 'Can I edit multiple images at once?',
    answer: 'Currently, you can edit one image at a time. However, you can quickly switch between images using our interface.'
  }
]

export default function FAQPage() {
  const bg = useColorModeValue('gray.50', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <Box bg={bg} minH="100vh">
      <Helmet>
        <title>Frequently Asked Questions - Image Editor</title>
        <meta name="description" content="Find answers to common questions about our image editing tools, supported formats, and features." />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map(item => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer
              }
            }))
          })}
        </script>
      </Helmet>

      <Header />
      <Box py={12}>
        <Container maxW="container.lg">
          <VStack spacing={8} align="stretch">
            <Box textAlign="center">
              <Heading as="h1" size="2xl" mb={4}>
                Frequently Asked Questions
              </Heading>
              <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')}>
                Find answers to common questions about our image editing tools
              </Text>
            </Box>

            <Accordion allowMultiple borderColor={borderColor}>
              {faqItems.map((item, index) => (
                <AccordionItem key={index}>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <Heading as="h3" size="md">
                          {item.question}
                        </Heading>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Text>{item.answer}</Text>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}