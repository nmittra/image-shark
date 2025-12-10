import { Box, Container, Heading, VStack, useColorModeValue } from '@chakra-ui/react'
import { ImageUploader } from '../components/ImageUploader'
import { ImageEditor } from '../components/ImageEditor'
import { Header } from '../components/Header'
import { SEO } from '../components/SEO'
import { ToolInfoSection } from '../components/ToolInfoSection'
import { useState } from 'react'

interface ImageFile {
    file: File
    preview: string
}

export function PassportPage() {
    const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null)
    const bg = useColorModeValue('gray.50', 'gray.800')

    return (
        <Box bg={bg} minH="100vh">
            <SEO
                title="Passport Photo Maker - Create ID Photos Online Free"
                description="Create professional passport, visa, and ID photos online. Automatic resizing and cropping for any country's requirements. Free, fast, and secure."
                keywords="passport photo, id photo, visa photo, passport photo maker, online passport photo, free passport photo"
            />
            <Header />
            <Box py={12}>
                <Container maxW="container.lg">
                    <VStack spacing={8} align="center" w="full">
                        <Heading as="h1" size="xl" textAlign="center" mb={4}>
                            Passport Photo Maker
                        </Heading>
                        {!selectedImage ? (
                            <>
                                <ImageUploader setSelectedImage={setSelectedImage} />
                                <ToolInfoSection toolType="passport" />
                            </>
                        ) : (
                            <ImageEditor
                                selectedImage={selectedImage}
                                setSelectedImage={setSelectedImage}
                                defaultTab="passport"
                            />
                        )}
                    </VStack>
                </Container>
            </Box>
        </Box>
    )
}

export default PassportPage
