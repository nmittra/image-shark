import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  chakra,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react'
import { FaTwitter, FaYoutube, FaInstagram, FaArrowUp } from 'react-icons/fa'
import { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  )
}

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode
  label: string
  href: string
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      mt={8}
    >
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr' }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Text fontSize={'lg'} fontWeight={'bold'}>
                Image Editor
              </Text>
            </Box>
            <Text fontSize={'sm'}>
              © {new Date().getFullYear()} Image Editor. All rights reserved
            </Text>
            <Stack direction={'row'} spacing={6}>
              <SocialButton label={'Twitter'} href={'#'}>
                <FaTwitter />
              </SocialButton>
              <SocialButton label={'YouTube'} href={'#'}>
                <FaYoutube />
              </SocialButton>
              <SocialButton label={'Instagram'} href={'#'}>
                <FaInstagram />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Legal</ListHeader>
            <Link as={RouterLink} to="/privacy-policy">Privacy Policy</Link>
            <Link as={RouterLink} to="/terms-of-service">Terms of Service</Link>
            <Link as={RouterLink} to="/cookie-policy">Cookie Policy</Link>
            <Link as={RouterLink} to="/copyright">Copyright Notice</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <Link as={RouterLink} to="/contact">Contact Us</Link>
            <Link as={RouterLink} to="/sitemap">Sitemap</Link>
          </Stack>
        </SimpleGrid>
      </Container>

      {/* Back to top button */}
      <Box
        position="fixed"
        bottom="20px"
        right="20px"
        zIndex={3}
        onClick={scrollToTop}
        bg={useColorModeValue('white', 'gray.700')}
        color={useColorModeValue('gray.600', 'gray.200')}
        rounded="full"
        p={3}
        boxShadow="md"
        cursor="pointer"
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        }}
        transition="all 0.2s"
      >
        <Icon as={FaArrowUp} w={6} h={6} />
      </Box>
    </Box>
  )
}