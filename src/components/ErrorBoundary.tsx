import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Box, Heading, Text, Button, VStack, useColorModeValue } from '@chakra-ui/react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Box
          minH="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={4}
        >
          <VStack spacing={4} align="center" maxW="container.md">
            <Heading as="h1" size="xl">
              Oops! Something went wrong
            </Heading>
            <Text align="center">
              {this.state.error?.message || 'An unexpected error occurred'}
            </Text>
            <Button
              colorScheme="blue"
              onClick={() => {
                this.setState({ hasError: false, error: null })
                window.location.href = '/'
              }}
            >
              Return to Home
            </Button>
          </VStack>
        </Box>
      )
    }

    return this.props.children
  }
}