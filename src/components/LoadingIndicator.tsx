import { Box, Spinner, useColorModeValue } from '@chakra-ui/react'

export function LoadingIndicator() {
  const bg = useColorModeValue('white', 'gray.800')
  const spinnerColor = useColorModeValue('blue.500', 'blue.200')

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={bg}
      opacity={0.9}
      zIndex={9999}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color={spinnerColor}
        size="xl"
        role="progressbar"
        aria-label="Loading content"
      />
    </Box>
  )
}