import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const navItems = [
  { path: '/crop', label: 'Crop' },
  { path: '/convert', label: 'Convert' },
  { path: '/meme', label: 'Meme' }
]

export function RouteErrorBoundary() {
  return (
    <Box p={8} textAlign="center">
      <Heading size="lg">This tool is now directly accessible</Heading>
      <Text mt={4}>
        This tool is now a top-level feature and can be accessed directly from the navigation menu.
      </Text>
      <HStack spacing={4} mt={6} justify="center">
        {navItems.map(item => (
          <Button key={item.path} as={Link} to={item.path} colorScheme="blue">
            Go to {item.label}
          </Button>
        ))}
      </HStack>
    </Box>
  )
}