import {
    Button,
    VStack,
    Box,
    useToast,
    FormControl,
    FormLabel,
    Select,
    Text,
    HStack,
    Alert,
    AlertIcon
} from '@chakra-ui/react'
import { useState, useRef, useCallback, useMemo } from 'react'
import ReactCrop, { Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

interface PassportPanelProps {
    image: {
        file: File
        preview: string
    }
    setEditedImage: (preview: string) => void
}

interface CountrySpec {
    name: string
    width: number // mm or ratio
    height: number
    aspect: number
    description: string
}

const countrySpecs: Record<string, CountrySpec> = {
    us: { name: 'United States (2x2")', width: 2, height: 2, aspect: 1, description: 'Standard US Passport & Visa (600x600px min)' },
    uk: { name: 'UK / EU (35x45mm)', width: 35, height: 45, aspect: 35 / 45, description: 'Standard for UK and most EU countries' },
    japan: { name: 'Japan (35x45mm)', width: 35, height: 45, aspect: 35 / 45, description: 'Standard Resident Card & Passport' },
    china: { name: 'China (33x48mm)', width: 33, height: 48, aspect: 33 / 48, description: 'Chinese Passport & Visa' },
    canada: { name: 'Canada (50x70mm)', width: 50, height: 70, aspect: 50 / 70, description: 'Canadian Passport' },
    india: { name: 'India (35x45mm)', width: 35, height: 45, aspect: 35 / 45, description: 'Indian Passport (Visa often 2x2")' },
    australia: { name: 'Australia (35x45mm)', width: 35, height: 45, aspect: 35 / 45, description: 'Australian Passport' },
}

export function PassportPanel({ image, setEditedImage }: PassportPanelProps) {
    const [selectedCountry, setSelectedCountry] = useState<string>('us')
    const [crop, setCrop] = useState<Crop>({
        unit: '%',
        width: 50,
        height: 50,
        x: 25,
        y: 25
    })
    const [cropping, setCropping] = useState(false)
    const imgRef = useRef<HTMLImageElement | null>(null)
    const toast = useToast()

    // Update aspect ratio when country changes
    const handleCountryChange = (country: string) => {
        setSelectedCountry(country)
        const spec = countrySpecs[country]
        if (spec) {
            // Reset crop to center with new aspect
            setCrop({
                unit: '%',
                width: 50,
                height: 50 * (1 / spec.aspect), // Approximate
                x: 25,
                y: 25
            })
        }
    }

    const currentSpec = countrySpecs[selectedCountry]

    const handleCrop = useCallback(async () => {
        try {
            if (!imgRef.current || !crop.width || !crop.height) return

            setCropping(true)
            const img = new Image()
            let isMounted = true

            img.onerror = () => {
                if (!isMounted) return
                setCropping(false)
                toast({
                    title: 'Error loading image',
                    description: 'The image could not be loaded. Please try again.',
                    status: 'error',
                    duration: 2000,
                    isClosable: true
                })
            }

            img.onload = () => {
                if (!isMounted) return
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                const scaleX = imgRef.current!.naturalWidth / imgRef.current!.width;
                const scaleY = imgRef.current!.naturalHeight / imgRef.current!.height;

                // High quality output dimensions
                // For US (2x2), target at least 600x600. For others, 300dpi equivalent.
                // Simplified: Use the cropped region at full resolution
                const targetWidth = crop.width * scaleX
                const targetHeight = crop.height * scaleY

                canvas.width = targetWidth;
                canvas.height = targetHeight;

                ctx.drawImage(
                    imgRef.current!,
                    crop.x * scaleX,
                    crop.y * scaleY,
                    crop.width * scaleX,
                    crop.height * scaleY,
                    0,
                    0,
                    targetWidth,
                    targetHeight
                );

                const dataUrl = canvas.toDataURL(image.file.type || 'image/jpeg', 0.95);
                setEditedImage(dataUrl);
                toast({
                    title: 'Photo Created',
                    description: `Cropped for ${currentSpec.name}`,
                    status: 'success',
                    duration: 2000,
                    isClosable: true
                });
            };

            img.src = image.preview;

            return () => {
                isMounted = false
                img.onload = null
                img.onerror = null
            }
        } catch (error) {
            console.error('Error cropping image:', error);
            toast({
                title: 'Error processing photo',
                status: 'error',
                duration: 2000,
                isClosable: true
            });
        } finally {
            if (imgRef.current) setCropping(false)
        }
    }, [imgRef, crop, image.file.type, image.preview, setEditedImage, toast, currentSpec])

    return (
        <VStack spacing={6} align="stretch" p={4}>
            <FormControl>
                <FormLabel fontWeight="bold">Select Country / Format</FormLabel>
                <Select
                    value={selectedCountry}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    bg="white"
                    _dark={{ bg: "gray.700" }}
                >
                    {Object.entries(countrySpecs).map(([key, spec]) => (
                        <option key={key} value={key}>{spec.name}</option>
                    ))}
                </Select>
                <Text fontSize="sm" color="gray.500" mt={2}>
                    {currentSpec.description}
                </Text>
            </FormControl>

            <Alert status="info" borderRadius="md" variant="left-accent">
                <AlertIcon />
                <Text fontSize="sm">
                    Align the face within the crop box. Ensure the head is centered.
                </Text>
            </Alert>

            <Box maxH="500px" overflow="auto" borderWidth={1} borderRadius="lg" bg="gray.100" _dark={{ bg: "gray.800" }}>
                <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    aspect={currentSpec.aspect}
                    grid
                >
                    <img
                        ref={imgRef}
                        src={image.preview}
                        style={{ maxWidth: '100%' }}
                        alt="Passport crop preview"
                    />
                </ReactCrop>
            </Box>

            <Button
                onClick={handleCrop}
                colorScheme="blue"
                size="lg"
                isLoading={cropping}
                loadingText="Generating Photo..."
            >
                Create Passport Photo
            </Button>
        </VStack>
    )
}
