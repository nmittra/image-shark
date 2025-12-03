import { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <Box p={8} textAlign="center">
                    <VStack spacing={4}>
                        <Heading size="lg">Something went wrong</Heading>
                        <Text>We apologize for the inconvenience. Please try refreshing the page.</Text>
                        <Button
                            colorScheme="blue"
                            onClick={() => window.location.reload()}
                        >
                            Refresh Page
                        </Button>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <Box
                                p={4}
                                bg="red.50"
                                color="red.900"
                                borderRadius="md"
                                textAlign="left"
                                overflowX="auto"
                                maxW="100%"
                            >
                                <Text as="pre" fontSize="sm">
                                    {this.state.error.toString()}
                                </Text>
                            </Box>
                        )}
                    </VStack>
                </Box>
            );
        }

        return this.props.children;
    }
}
