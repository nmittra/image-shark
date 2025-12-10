import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    Icon,
    VStack,
    HStack,
    useColorModeValue,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Flex
} from '@chakra-ui/react'
import { AdContainer } from './AdContainer'
import {
    FaCheckCircle, FaRocket, FaLock, FaMagic, FaMobileAlt, FaGlobe, FaPrint, FaEnvelope,
    FaPalette, FaCropAlt, FaExpandArrowsAlt, FaCompressArrowsAlt, FaFont,
    FaQuestionCircle, FaUserTie, FaLaptopCode, FaCamera, FaStore, FaShareAlt
} from 'react-icons/fa'
import { IconType } from 'react-icons'

type ToolType = 'compress' | 'resize' | 'crop' | 'convert' | 'watermark' | 'meme' | 'editor' | 'passport'

interface ToolInfoSectionProps {
    toolType: ToolType
}

interface Feature {
    title: string
    description: string
    icon: IconType
}

interface HowToStep {
    title: string
    description: string
}

interface UserCase {
    role: string
    benefit: string
    icon: IconType
}

interface FAQ {
    question: string;
    answer: string
}

interface ToolData {
    title: string
    description: string
    features: Feature[]
    benefits: string[]
    howTo: HowToStep[]
    userCases: UserCase[]
    faqs: FAQ[]
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
        ],
        howTo: [
            { title: "Upload Your Image", description: "Click the upload area or drag and drop your JPG, PNG, or GIF file." },
            { title: "Automatic Compression", description: "Our smart engine automatically analyzes and compresses your image for the best quality-to-size ratio." },
            { title: "Download", description: "Instantly download your optimized image. No registration needed." }
        ],
        userCases: [
            { role: "Web Developers", benefit: "Improve Core Web Vitals and PageSpeed scores by serving optimized assets.", icon: FaLaptopCode },
            { role: "Photographers", benefit: "Save disk space while archiving high-volume shoots without losing visual fidelity.", icon: FaCamera },
            { role: "E-commerce Owners", benefit: "Ensure product pages load instantly to prevent customer drop-off.", icon: FaStore }
        ],
        faqs: [
            { question: "Is the compression lossless?", answer: "We use smart lossy compression that significantly reduces file size while maintaining visual quality that is nearly indistinguishable to the human eye." },
            { question: "Is it safe to upload my photos?", answer: "Yes! All processing happens in your browser. Your images are never uploaded to our servers, ensuring 100% privacy." },
            { question: "What formats do you support?", answer: "We currently support compression for JPG, PNG, and WebP formats." }
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
        ],
        howTo: [
            { title: "Select Image", description: "Upload the photo you want to resize." },
            { title: "Choose Dimensions", description: "Enter your desired width and height, or use a percentage scale. Toggle 'Maintain Aspect Ratio' for proportional resizing." },
            { title: "Process & Save", description: "Click resize and download your perfectly sized image immediately." }
        ],
        userCases: [
            { role: "Social Media Managers", benefit: "Create content that fits perfectly in Stories, Feeds, and Headers without awkward cropping.", icon: FaShareAlt },
            { role: "Print Shops", benefit: "Prepare client files for printing at specific physical dimensions.", icon: FaPrint },
            { role: "Bloggers", benefit: "Standardize image widths across your blog posts for a clean, professional look.", icon: FaUserTie }
        ],
        faqs: [
            { question: "Will my image lose quality?", answer: "Downscaling (making smaller) usually retains high quality. Upscaling (making larger) may result in some pixelation, but our algorithms try to minimize this." },
            { question: "Can I resize by percentage?", answer: "Yes, you can easily reduce an image to 50%, 75%, etc., of its original size." }
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
        ],
        howTo: [
            { title: "Upload Photo", description: "Drag and drop your image into the editor." },
            { title: "Select Area", description: "Drag the crop handles to select your area, or choose a preset aspect ratio (like 1:1 for Instagram)." },
            { title: "Crop & Download", description: "Confirm your selection and download the cropped image instantly." }
        ],
        userCases: [
            { role: "Instagram Users", benefit: "Quickly square-crop photos for your feed or 9:16 for stories.", icon: FaMobileAlt },
            { role: "ID Photo Makers", benefit: "Crop headshots to specific passport or ID card requirements.", icon: FaUserTie },
            { role: "Graphic Designers", benefit: "Isolate specific elements from larger stock photos for use in designs.", icon: FaPalette }
        ],
        faqs: [
            { question: "What aspect ratios are available?", answer: "We offer freeform, 1:1 (Square), 16:9 (Widescreen), 4:3, and many more standard presets." },
            { question: "Does cropping reduce file size?", answer: "Yes, removing pixels fundamentally reduces the amount of data in the image file." }
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
        ],
        howTo: [
            { title: "Upload Files", description: "Select one or multiple images to convert." },
            { title: "Choose Format", description: "Select your target format (e.g., JPG, PNG, WebP)." },
            { title: "Convert", description: "Hit convert and download your files in the new format." }
        ],
        userCases: [
            { role: "iPhone Users", benefit: "Convert HEIC photos to JPG for compatibility with Windows and older devices.", icon: FaMobileAlt },
            { role: "Web Developers", benefit: "Generate next-gen WebP images to make websites load faster.", icon: FaLaptopCode },
            { role: "Designers", benefit: "Convert logos to PNG to ensure transparent backgrounds work everywhere.", icon: FaPalette }
        ],
        faqs: [
            { question: "Can I convert HEIC files?", answer: "Yes, we support converting High Efficiency Image formats (HEIC) from Apple devices to standard JPG or PNG." },
            { question: "Why use WebP?", answer: "WebP provides superior quality at smaller file sizes compared to JPG, making it ideal for the web." }
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
        ],
        howTo: [
            { title: "Upload Image", description: "Start by uploading the photo you want to protect." },
            { title: "Add Watermark", description: "Choose text or upload a logo image. Adjust size, transparency, and position." },
            { title: "Apply & Save", description: "Once satisfied, apply the watermark and download your protected image." }
        ],
        userCases: [
            { role: "Artists & Photographers", benefit: "Protect your portfolio from unauthorized usage online.", icon: FaCamera },
            { role: "Real Estate Agents", benefit: "Brand your property listing photos with your agency logo.", icon: FaStore },
            { role: "Content Creators", benefit: "Add your handle or channel name to original memes and images.", icon: FaShareAlt }
        ],
        faqs: [
            { question: "Can I use my own logo?", answer: "Yes, you can upload any PNG or JPG image to use as a watermark." },
            { question: "Is the watermark permanent?", answer: "Once you download the image, the watermark is baked into the pixels and cannot be easily removed." }
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
        ],
        howTo: [
            { title: "Choose Base", description: "Upload your own image or select a popular meme template." },
            { title: "Add Text", description: "Add top and bottom text, resizing and styling as needed for maximum impact." },
            { title: "Generate Meme", description: "Create and download your meme, ready for sharing on social media." }
        ],
        userCases: [
            { role: "Redditors", benefit: "Create high-quality original content for your favorite subreddits.", icon: FaLaptopCode },
            { role: "Marketers", benefit: "Engage your audience with trending meme formats adapted for your brand.", icon: FaStore },
            { role: "Friends", benefit: "Make inside jokes and funny reactions to share in group chats.", icon: FaUserTie }
        ],
        faqs: [
            { question: "Do you add a watermark?", answer: "No! The memes you generate are 100% free of our branding." },
            { question: "Can I change the font?", answer: "Yes, we use the classic Impact font by default but you can customize styles." }
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
        ],
        howTo: [
            { title: "Upload", description: "Open any image file in the editor." },
            { title: "Edit", description: "Use the toolbar to apply filters, adjust brightness/contrast, or crop/rotate." },
            { title: "Export", description: "Save your masterpiece in your preferred format and quality." }
        ],
        userCases: [
            { role: "Everyday Users", benefit: "Quickly touch up photos before sharing them with friends and family.", icon: FaUserTie },
            { role: "Bloggers", benefit: "Create cohesive visuals for your posts using consistent filters and settings.", icon: FaLaptopCode },
            { role: "Small Business Owners", benefit: "Create professional-looking product photos without hiring a pro.", icon: FaStore }
        ],
        faqs: [
            { question: "Is this like Photoshop?", answer: "It offers many essential features of professional software but runs entirely in your browser for free." },
            { question: "Does it work on mobile?", answer: "Yes, our editor is fully responsive and touch-friendly for editing on the go." }
        ]
    },
    passport: {
        title: "Professional Passport Photos for Free",
        description: "Create biometric passport and ID photos that meet official requirements. No expensive photo booth trips needed.",
        features: [
            { title: "Standard Sizes", description: "Preset dimensions for US, UK, EU, and 100+ other countries' ID requirements.", icon: FaGlobe },
            { title: "Background Cleanup", description: "Easily crop and adjust to ensure you meet the white/neutral background rules.", icon: FaMagic },
            { title: "Face Centering", description: "Guidelines to help you position your face perfectly according to biometric standards.", icon: FaUserTie },
            { title: "Print Ready", description: "Download a 4x6 inch sheet with multiple copies ready for cheap printing.", icon: FaPrint }
        ],
        benefits: [
            "Save money on photos",
            "Unlimited retakes",
            "Immediate download",
            "Privacy guaranteed"
        ],
        howTo: [
            { title: "Take Photo", description: "Take a photo against a plain white wall with good lighting." },
            { title: "Upload", description: "Upload your photo to our secure editor." },
            { title: "Crop & Download", description: "Use our presets to crop to the correct size and download your printable sheet." }
        ],
        userCases: [
            { role: "Travelers", benefit: "Get your visa and passport photos sorted quickly before your next trip.", icon: FaGlobe },
            { role: "Students", benefit: "Create student ID photos without paying campus administration fees.", icon: FaUserTie },
            { role: "Job Seekers", benefit: "Create professional-looking headshots for CVs and LinkedIn.", icon: FaLaptopCode }
        ],
        faqs: [
            { question: "Are these photos accepted?", answer: "Yes, as long as you follow the lighting and posing guidelines, our sizing tools meet official standards." },
            { question: "How do I print them?", answer: "We generate a standard 4x6 inch image file that you can print at any pharmacy or photo kiosk for pennies." }
        ]
    }
}

export function ToolInfoSection({ toolType }: ToolInfoSectionProps) {
    const content = toolContent[toolType]
    const bg = useColorModeValue('white', 'gray.700')
    const cardBg = useColorModeValue('gray.50', 'gray.800')
    const sectionBg = useColorModeValue('gray.50', 'gray.900')
    const textColor = useColorModeValue('gray.600', 'gray.300')
    const titleColor = useColorModeValue('gray.800', 'white')
    const accentColor = useColorModeValue('blue.500', 'blue.300')

    return (
        <Box mt={16}>
            <AdContainer id={`tool-top-ad-${toolType}`} type="in-content" />

            <Box py={16} bg={bg}>
                <Container maxW="container.xl">
                    <VStack spacing={16}>
                        {/* Main Value Proposition */}
                        <Box textAlign="center" maxW="3xl" mx="auto">
                            <Heading as="h2" size="2xl" mb={6} color={titleColor} lineHeight="1.2">
                                {content.title}
                            </Heading>
                            <Text fontSize="xl" color={textColor} lineHeight="1.6">
                                {content.description}
                            </Text>
                        </Box>

                        {/* Feature Grid */}
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} w="full">
                            {content.features.map((feature, index) => (
                                <Box
                                    key={index}
                                    p={8}
                                    bg={cardBg}
                                    borderRadius="2xl"
                                    boxShadow="sm"
                                    border="1px"
                                    borderColor={useColorModeValue('gray.100', 'gray.600')}
                                    transition="all 0.3s"
                                    _hover={{ transform: 'translateY(-4px)', boxShadow: 'md' }}
                                >
                                    <HStack align="start" spacing={5}>
                                        <Flex
                                            p={4}
                                            bg={useColorModeValue('blue.50', 'blue.900')}
                                            color="blue.500"
                                            borderRadius="xl"
                                            align="center"
                                            justify="center"
                                        >
                                            <Icon as={feature.icon} boxSize={6} />
                                        </Flex>
                                        <VStack align="start" spacing={3}>
                                            <Heading as="h3" size="md" color={titleColor}>
                                                {feature.title}
                                            </Heading>
                                            <Text color={textColor} fontSize="md">
                                                {feature.description}
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </VStack>
                </Container>
            </Box>

            <AdContainer id={`tool-middle-ad-${toolType}`} type="in-content" />

            {/* How To Section */}
            <Box py={16} bg={sectionBg}>
                <Container maxW="container.lg">
                    <Heading as="h2" size="xl" mb={12} textAlign="center" color={titleColor}>
                        How to use the {toolType === 'editor' ? 'Photo Editor' : `${toolType.charAt(0).toUpperCase() + toolType.slice(1)} Tool`}
                    </Heading>
                    <VStack spacing={8} w="full">
                        {content.howTo.map((step, index) => (
                            <Flex
                                key={index}
                                w="full"
                                bg={bg}
                                p={8}
                                borderRadius="xl"
                                boxShadow="sm"
                                align="center"
                                direction={{ base: 'column', md: 'row' }}
                                gap={6}
                            >
                                <Flex
                                    boxSize="60px"
                                    bg={accentColor}
                                    color="white"
                                    borderRadius="full"
                                    align="center"
                                    justify="center"
                                    fontSize="2xl"
                                    fontWeight="bold"
                                    flexShrink={0}
                                >
                                    {index + 1}
                                </Flex>
                                <VStack align="start" spacing={2} flex={1}>
                                    <Heading as="h3" size="md" color={titleColor}>
                                        {step.title}
                                    </Heading>
                                    <Text color={textColor} fontSize="lg">
                                        {step.description}
                                    </Text>
                                </VStack>
                            </Flex>
                        ))}
                    </VStack>
                </Container>
            </Box>

            {/* Who is this for? */}
            <Box py={16} bg={bg}>
                <Container maxW="container.xl">
                    <Heading as="h2" size="xl" mb={12} textAlign="center" color={titleColor}>
                        Who is this for?
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                        {content.userCases.map((userCase, index) => (
                            <VStack
                                key={index}
                                p={8}
                                bg={cardBg}
                                borderRadius="2xl"
                                textAlign="center"
                                spacing={4}
                                transition="all 0.3s"
                                _hover={{ transform: 'scale(1.02)' }}
                            >
                                <Icon as={userCase.icon} boxSize={10} color={accentColor} />
                                <Heading as="h3" size="md" color={titleColor}>
                                    {userCase.role}
                                </Heading>
                                <Text color={textColor}>
                                    {userCase.benefit}
                                </Text>
                            </VStack>
                        ))}
                    </SimpleGrid>
                </Container>
            </Box>

            <AdContainer id={`tool-bottom-ad-${toolType}`} type="in-content" />

            {/* FAQ Section */}
            <Box py={16} bg={sectionBg}>
                <Container maxW="container.lg">
                    <Heading as="h2" size="xl" mb={12} textAlign="center" color={titleColor}>
                        Frequently Asked Questions
                    </Heading>
                    <Accordion allowToggle defaultIndex={[0]}>
                        {content.faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                border="none"
                                mb={4}
                                bg={bg}
                                borderRadius="xl"
                                overflow="hidden"
                            >
                                <h2>
                                    <AccordionButton p={6} _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}>
                                        <Box flex="1" textAlign="left" fontWeight="bold" fontSize="lg" color={titleColor}>
                                            <HStack>
                                                <Icon as={FaQuestionCircle} color={accentColor} />
                                                <Text>{faq.question}</Text>
                                            </HStack>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={6} px={6} fontSize="md" color={textColor}>
                                    {faq.answer}
                                </AccordionPanel>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Container>
            </Box>

            {/* Benefits List (Legacy but styled) */}
            <Box py={12} bg={bg}>
                <Container maxW="container.xl">
                    <Box
                        w="full"
                        bg={useColorModeValue('blue.50', 'blue.900')}
                        p={10}
                        borderRadius="3xl"
                    >
                        <Heading as="h3" size="lg" mb={8} textAlign="center" color={titleColor}>
                            Quick Summary
                        </Heading>
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                            {content.benefits.map((benefit, index) => (
                                <HStack key={index} spacing={3} bg={bg} p={4} borderRadius="lg">
                                    <Icon as={FaCheckCircle} color="green.500" boxSize={5} />
                                    <Text fontWeight="medium" color={titleColor}>{benefit}</Text>
                                </HStack>
                            ))}
                        </SimpleGrid>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}
