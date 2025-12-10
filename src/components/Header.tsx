import {
  Box, Container, HStack, Link as ChakraLink, useColorModeValue, IconButton, VStack, Collapse,
  useDisclosure, useColorMode
} from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { Logo } from './Logo'
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useMemo } from 'react'

interface NavItem {
  path: string
  label: string
}

interface NavLinkProps extends NavItem {
  isActive: boolean
  activeColor: string
  hoverBg?: string
  isMobile?: boolean
}

const NavLink = ({ path, label, isActive, activeColor, hoverBg, isMobile = false }: NavLinkProps) => (
  <ChakraLink
    key={path}
    as={Link}
    to={path}
    fontSize="md"
    fontWeight={isActive ? 'bold' : 'normal'}
    color={isActive ? activeColor : 'inherit'}
    position="relative"
    _hover={{
      textDecoration: 'none',
      color: activeColor,
      ...(isMobile && { bg: hoverBg })
    }}
    _focus={{ boxShadow: 'outline', borderRadius: 'md' }}
    px={isMobile ? 4 : 3}
    py={2}
    borderRadius="md"
    aria-current={isActive ? 'page' : undefined}
    _after={!isMobile && isActive ? {
      content: '""',
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      height: '2px',
      bg: activeColor,
    } : {}}
  >
    {label}
  </ChakraLink>
)

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const activeColor = useColorModeValue('blue.500', 'blue.300')
  const hoverBg = useColorModeValue('gray.50', 'gray.700')
  const { isOpen, onToggle } = useDisclosure()
  const location = useLocation()

  // Define all navigation items in one place without parent-child relationships
  const navItems = useMemo(() => [
    { path: '/compress', label: 'Compress' },
    { path: '/resize', label: 'Resize' },
    { path: '/watermark', label: 'Watermark' },
    { path: '/crop', label: 'Crop' },
    { path: '/convert', label: 'Convert' },
    { path: '/meme', label: 'Meme' },
    { path: '/editor', label: 'Editor' }
  ], []);

  const isActive = useMemo(() => (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }, [location.pathname]);

  // Skip to content link for accessibility
  const SkipLink = () => (
    <ChakraLink
      href="#main-content"
      position="absolute"
      left="-9999px"
      top="auto"
      width="1px"
      height="1px"
      overflow="hidden"
      _focus={{
        left: "50%",
        transform: "translateX(-50%)",
        width: "auto",
        height: "auto",
        backgroundColor: "blue.100",
        padding: "1rem",
        zIndex: "1001"
      }}
    >
      Skip to main content
    </ChakraLink>
  );

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex={1000}
      bg={bg}
      borderBottom="1px"
      borderColor={borderColor}
      shadow="sm"
    >
      <SkipLink />
      <Container maxW="container.xl" py={4}>
        <HStack spacing={8} justify="space-between">
          <ChakraLink
            as={Link}
            to="/"
            display="flex"
            alignItems="center"
            _hover={{ textDecoration: 'none' }}
            aria-label="Home"
          >
            <Logo boxSize="40px" />
          </ChakraLink>

          {/* Desktop Navigation */}
          <HStack spacing={6} flex={1} justify="center" display={{ base: 'none', md: 'flex' }}>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                {...item}
                isActive={isActive(item.path)}
                activeColor={activeColor}
              />
            ))}
          </HStack>

          <HStack spacing={4}>
            {/* Dark Mode Toggle */}
            <IconButton
              onClick={toggleColorMode}
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              variant="ghost"
              aria-label="Toggle dark mode"
              display={{ base: 'none', md: 'flex' }}
            />

            {/* Mobile Navigation Toggle */}
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              onClick={onToggle}
              icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
              variant="ghost"
              aria-label="Toggle Navigation"
            />
          </HStack>
        </HStack>

        {/* Mobile Navigation Menu */}
        <Collapse in={isOpen} animateOpacity>
          <VStack
            display={{ base: 'flex', md: 'none' }}
            mt={4}
            pb={4}
            spacing={4}
            align="stretch"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                {...item}
                isActive={isActive(item.path)}
                activeColor={activeColor}
                hoverBg={hoverBg}
                isMobile
              />
            ))}
            <Box px={4} pt={2}>
              <IconButton
                onClick={toggleColorMode}
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                variant="ghost"
                aria-label="Toggle dark mode"
                width="full"
                justifyContent="flex-start"
              >
                {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
              </IconButton>
            </Box>
          </VStack>
        </Collapse>
      </Container>
    </Box>
  );
}