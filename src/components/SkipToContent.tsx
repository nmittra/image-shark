import { Box, Link } from '@chakra-ui/react'

export const SkipToContent = () => {
  return (
    <Box
      as="div"
      position="absolute"
      w="1px"
      h="1px"
      p={0}
      overflow="hidden"
      clip="rect(0, 0, 0, 0)"
      whiteSpace="nowrap"
      border={0}
      _focus={{
        w: 'auto',
        h: 'auto',
        clip: 'auto',
        p: 4,
        zIndex: 9999,
        bg: 'white',
        color: 'blue.600',
        border: '1px solid',
        borderColor: 'blue.600',
        borderRadius: 'md',
        fontWeight: 'medium',
      }}
    >
      <Link
        href="#main-content"
        p={2}
        _focus={{ outline: 'none' }}
        aria-label="Skip to main content"
      >
        Skip to main content
      </Link>
    </Box>
  )
}