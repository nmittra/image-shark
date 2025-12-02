import { Box, Image } from '@chakra-ui/react'

export function Logo() {
  return (
    <Box boxSize="40px">
      <Image
        src="/logo.svg"
        alt="Image Shark Logo"
        width="100%"
        height="100%"
        objectFit="contain"
      />
    </Box>
  )
}