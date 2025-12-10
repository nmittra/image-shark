import { Box, Container, Heading, Text, SimpleGrid, Icon, VStack, HStack, useColorModeValue } from '@chakra-ui/react'
import { AdContainer } from './AdContainer'
import { FaCheckCircle, FaRocket, FaLock, FaMagic, FaMobileAlt, FaGlobe, FaPrint, FaEnvelope, FaPalette, FaCropAlt, FaExpandArrowsAlt, FaCompressArrowsAlt, FaFont } from 'react-icons/fa'
import { IconType } from 'react-icons'

type ToolType = 'compress' | 'resize' | 'crop' | 'convert' | 'watermark' | 'meme' | 'editor'

interface ToolInfoSectionProps {
    toolType: ToolType
}

interface Feature {
    title: string
    description: string
    icon: IconType
}

interface ToolData {
    title: string
    description: string
    features: Feature[]
    benefits: string[]
}

const toolContent: Record<ToolType, ToolData> = {
    compress: {
        title: "Why Compress Your Images?",
        description: "Optimize your images for the web without sacrificing quality. Faster loading sites rank better and keep visitors happy.",
        features: [
            { title: "Boost Website Speed", description: "Large images slow down your site. Compression reduces file size significantly, improving load times.", icon: FaRocket },
            { title: "Save Storage Space", description: "Keep your device or server storage free by shrinking image sizes by up to 80%.", icon: FaCompressArrowsAlt },
            { title: "Better SEO Rankings", description: "Google loves fast websites. Optimized images are a key factor in search engine ranking.", icon: FaGlobe },
            { title: "Faster Email Attachments", description: "Send high-quality photos via email without hitting attachment size limits.", icon: FaEnvelope }
        ],
        benefits: [
            "Smart compression algorithms",
            "Supports JPG, PNG, and WebP",
            "No visible quality loss",
            "Secure client-side processing"
        ]
    },
    resize: {
        title: "Perfect Dimensions Every Time",
        description: "Resize your photos for social media, printing, or web use with pixel-perfect precision.",
        features: [
            { title: "Social Media Ready", description: "Get the exact dimensions for Instagram, Facebook, Twitter, and LinkedIn posts.", icon: FaMobileAlt },
            { title: "Print Quality", description: "Prepare your photos for printing by adjusting DPI and dimensions correctly.", icon: FaPrint },
            { title: "Web Optimization", description: "Ensure your images fit your website layout perfectly without browser scaling.", icon: FaGlobe },
            { title: "Batch Processing", description: "Resize multiple images at once to save time and maintain consistency.", icon: FaExpandArrowsAlt }
        ],
        benefits: [
            "Maintain aspect ratio",
            "Custom pixel dimensions",
            "Percentage scaling",
            "High-quality resampling"
        ]
    },
    crop: {
        title: "Focus on What Matters",
        description: "Remove unwanted background elements and improve composition with our easy-to-use cropping tool.",
        features: [
            { title: "Improve Composition", description: "Use the rule of thirds and other composition techniques to make your photos pop.", icon: FaCropAlt },
            { title: "Remove Distractions", description: "Cut out photobombers, messy backgrounds, or unwanted objects.", icon: FaMagic },
            { title: "Social Media Aspect Ratios", description: "Preset ratios for Stories, Posts, Covers, and Profile Pictures.", icon: FaMobileAlt },
            { title: "Focus the Subject", description: "Zoom in on the most important part of your image for maximum impact.", icon: FaCheckCircle }
        ],
        benefits: [
            "Pre-set aspect ratios",
            "Free-form cropping",
            "Grid overlays",
            "Lossless cropping"
        ]
    },
    convert: {
        title: "Universal Format Compatibility",
        description: "Convert your images to the format you need. Make your images compatible with any device or software.",
        features: [
            { title: "WebP for Performance", description: "Convert to WebP for superior compression and quality on the web.", icon: FaRocket },
            { title: "Universal Compatibility", description: "Convert HEIC or WebP to JPG/PNG for compatibility with older software.", icon: FaGlobe },
            { title: "Transparent Backgrounds", description: "Convert to PNG to preserve transparency in your logos and graphics.", icon: FaMagic },
            { title: "Standardize Your Library", description: "Keep all your images in one format for easier organization.", icon: FaCheckCircle }
        ],
        benefits: [
            "Supports JPG, PNG, WebP, GIF",
            "Batch conversion",
            "Preserve metadata",
            "Fast processing"
        ]
    },
    watermark: {
        title: "Protect Your Creative Work",
        description: "Add professional watermarks to your images to protect your intellectual property and build brand recognition.",
        features: [
            { title: "Brand Protection", description: "Prevent unauthorized use of your photos by adding your logo or copyright text.", icon: FaLock },
            { title: "Professional Branding", description: "Add a subtle logo to look more professional and increase brand awareness.", icon: FaCheckCircle },
            { title: "Customizable Styles", description: "Adjust opacity, position, size, and rotation to fit your image perfectly.", icon: FaPalette },
            { title: "Batch Watermarking", description: "Apply your watermark to hundreds of photos in seconds.", icon: FaMagic }
        ],
        benefits: [
            "Text and Image watermarks",
            "Adjustable transparency",
            "Tiled watermarks",
            "Custom fonts and colors"
        ]
    },
    meme: {
        title: "Create Viral Content",
        description: "Unleash your humor and creativity. Make memes that get shared, liked, and laughed at.",
        features: [
            { title: "Viral Potential", description: "Create engaging content for Reddit, Twitter, Instagram, and Discord.", icon: FaRocket },
            { title: "Classic & Modern Styles", description: "Support for classic top/bottom text and modern meme formats.", icon: FaFont },
            { title: "Custom Uploads", description: "Use your own images or choose from popular templates.", icon: FaMobileAlt },
            { title: "No Watermarks", description: "Create clean, professional-looking memes without our branding.", icon: FaMagic }
        ],
        benefits: [
            "Custom text positioning",
            "Adjustable font sizes",
            "Stroke and shadow effects",
            "Instant download"
        ]
    },
    editor: {
        title: "Professional Editing Made Simple",
        description: "A complete suite of photo editing tools in your browser. No expensive software or steep learning curve required.",
        features: [
            { title: "All-in-One Solution", description: "Crop, resize, filter, and adjust colors all in one place.", icon: FaMagic },
            { title: "Filters & Effects", description: "Apply Instagram-like filters to give your photos a unique mood.", icon: FaPalette },
            { title: "Fine-Tune Adjustments", description: "Control brightness, contrast, saturation, and more for the perfect look.", icon: FaCheckCircle },
            { title: "Privacy First", description: "All editing happens in your browser. Your photos never leave your device.", icon: FaLock }
        ],
        benefits: [
            "User-friendly interface",
            "Undo/Redo functionality",
            "Real-time previews",
            "No account required"
        ]
    }
}

export function ToolInfoSection({ toolType }: ToolInfoSectionProps) {
    const content = toolContent[toolType]
    const bg = useColorModeValue('white', 'gray.700')
    const cardBg = useColorModeValue('gray.50', 'gray.800')
    const textColor = useColorModeValue('gray.600', 'gray.300')
    const titleColor = useColorModeValue('gray.800', 'white')

    return (
        <Box py={12} mt={8}>
            <Container maxW="container.xl">
                <VStack spacing={12}>
                    {/* Main Value Proposition */}
                    <Box textAlign="center" maxW="3xl" mx="auto">
                        <Heading as="h2" size="xl" mb={4} color={titleColor}>
                            {content.title}
                        </Heading>
                        <Text fontSize="xl" color={textColor}>
                            {content.description}
                        </Text>
                    </Box>

                    {/* Feature Grid */}
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
                        {content.features.map((feature, index) => (
                            <Box
                                key={index}
                                p={6}
                                bg={bg}
                                borderRadius="xl"
                                boxShadow="sm"
                                border="1px"
                                borderColor={useColorModeValue('gray.100', 'gray.600')}
                                transition="all 0.3s"
                                _hover={{ transform: 'translateY(-4px)', boxShadow: 'md' }}
                            >
                                <HStack align="start" spacing={4}>
                                    <Box
                                        p={3}
                                        bg={useColorModeValue('blue.50', 'blue.900')}
                                        color="blue.500"
                                        borderRadius="lg"
                                    >
                                        <Icon as={feature.icon} boxSize={6} />
                                    </Box>
                                    <VStack align="start" spacing={2}>
                                        <Heading as="h3" size="md" color={titleColor}>
                                            {feature.title}
                                        </Heading>
                                        <Text color={textColor}>
                                            {feature.description}
                                        </Text>
                                    </VStack>
                                </HStack>
                            </Box>
                        ))}
                    </SimpleGrid>

                    <AdContainer id={`tool-content-ad-${toolType}`} type="in-content" />

                    {/* Benefits List */}
                    <Box
                        w="full"
                        bg={cardBg}
                        p={8}
                        borderRadius="2xl"
                        border="1px"
                        borderColor={useColorModeValue('gray.200', 'gray.600')}
                    >
                        <Heading as="h3" size="lg" mb={6} textAlign="center" color={titleColor}>
                            Key Features & Benefits
                        </Heading>
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                            {content.benefits.map((benefit, index) => (
                                <HStack key={index} spacing={3}>
                                    <Icon as={FaCheckCircle} color="green.500" boxSize={5} />
                                    <Text fontWeight="medium" color={titleColor}>{benefit}</Text>
                                </HStack>
                            ))}
                        </SimpleGrid>
                    </Box>
                </VStack>
            </Container>
        </Box>
    )
}
