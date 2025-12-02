import { Box, Breadcrumb as ChakraBreadcrumb, BreadcrumbItem, BreadcrumbLink, useColorModeValue } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

interface BreadcrumbRoute {
  path: string
  label: string
}

const routeMap: Record<string, BreadcrumbRoute[]> = {
  '/': [{ path: '/', label: 'Home' }],
  '/crop': [
    { path: '/', label: 'Home' },
    { path: '/crop', label: 'Crop Image' }
  ],
  '/resize': [
    { path: '/', label: 'Home' },
    { path: '/resize', label: 'Resize Image' }
  ],
  '/compress': [
    { path: '/', label: 'Home' },
    { path: '/compress', label: 'Compress Image' }
  ],
  '/watermark': [
    { path: '/', label: 'Home' },
    { path: '/watermark', label: 'Add Watermark' }
  ],
  '/convert': [
    { path: '/', label: 'Home' },
    { path: '/convert', label: 'Convert Format' }
  ],
  '/meme': [
    { path: '/', label: 'Home' },
    { path: '/meme', label: 'Meme Generator' }
  ],
  '/faq': [
    { path: '/', label: 'Home' },
    { path: '/faq', label: 'FAQ' }
  ]
}

export function Breadcrumb() {
  const location = useLocation()
  const routes = routeMap[location.pathname] || [{ path: '/', label: 'Home' }]
  const color = useColorModeValue('gray.600', 'gray.400')
  const separator = useColorModeValue('gray.400', 'gray.600')

  return (
    <Box mb={4}>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: routes.map((route, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@id': `https://image-shark.com${route.path}`,
                name: route.label
              }
            }))
          })}
        </script>
      </Helmet>

      <ChakraBreadcrumb separator="/" color={separator}>
        {routes.map((route, index) => (
          <BreadcrumbItem key={route.path} isCurrentPage={index === routes.length - 1}>
            <BreadcrumbLink
              as={Link}
              to={route.path}
              color={index === routes.length - 1 ? 'blue.500' : color}
              _hover={{ textDecoration: 'none', color: 'blue.500' }}
            >
              {route.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </ChakraBreadcrumb>
    </Box>
  )
}