import {
  Button,
  VStack,
  Box,
  useToast,
  ButtonGroup,
  FormControl,
  FormLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Divider
} from '@chakra-ui/react'
import { useState, useRef, useCallback } from 'react'
import ReactCrop, { Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

interface CropPanelProps {
  image: {
    file: File
    preview: string
  }
  setEditedImage: (preview: string) => void
}

const aspectRatios = {
  none: undefined,
  square: 1,
  landscape: 16 / 9,
  portrait: 3 / 4,
  usPassport: 1, // 2x2 inches
  ukPassport: 35 / 45 // 35mm x 45mm
}

export function CropPanel({ image, setEditedImage }: CropPanelProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25
  })
  const [cropping, setCropping] = useState(false)
  const [quality, setQuality] = useState(0.92)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const toast = useToast()

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
          description: 'The image could not be loaded. Please try again or use a different image.',
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

        const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
        const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

        canvas.width = crop.width * scaleX;
        canvas.height = crop.height * scaleY;

        ctx.drawImage(
          imgRef.current,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width * scaleX,
          crop.height * scaleY
        );

        const dataUrl = canvas.toDataURL(image.file.type, quality);
        setEditedImage(dataUrl);
        toast({
          title: 'Image cropped',
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
        title: 'Error cropping image',
        status: 'error',
        duration: 2000,
        isClosable: true
      });
    } finally {
      setCropping(false)
    }
  }, [imgRef, crop, quality, image.file.type, image.preview, setEditedImage, toast])

  const resetCrop = useCallback(() => {
    setCrop({
      unit: '%',
      width: 50,
      height: 50,
      x: 25,
      y: 25
    });
  }, []);

  return (
    <VStack spacing={6} align="stretch">
      <VStack spacing={2} align="stretch">
        <Text fontSize="sm" fontWeight="medium">Standard Ratios</Text>
        <ButtonGroup size="sm" isAttached variant="outline" w="full">
          <Button onClick={() => setCrop({ ...crop, aspect: aspectRatios.square })} flex={1}>Square</Button>
          <Button onClick={() => setCrop({ ...crop, aspect: aspectRatios.landscape })} flex={1}>16:9</Button>
          <Button onClick={() => setCrop({ ...crop, aspect: aspectRatios.portrait })} flex={1}>3:4</Button>
          <Button onClick={() => setCrop({ ...crop, aspect: aspectRatios.none })} flex={1}>Free</Button>
        </ButtonGroup>
      </VStack>

      <VStack spacing={2} align="stretch">
        <Text fontSize="sm" fontWeight="medium">Passport & Visa</Text>
        <ButtonGroup size="sm" isAttached variant="outline" w="full">
          <Button onClick={() => setCrop({ ...crop, aspect: aspectRatios.usPassport })} flex={1}>
            US (2x2")
          </Button>
          <Button onClick={() => setCrop({ ...crop, aspect: aspectRatios.ukPassport })} flex={1}>
            UK/EU (35x45mm)
          </Button>
        </ButtonGroup>
      </VStack>

      <Box maxH="500px" overflow="auto">
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          aspect={crop.aspect}
        >
          <img
            ref={imgRef}
            src={image.preview}
            style={{ maxWidth: '100%' }}
            alt="Crop preview"
          />
        </ReactCrop>
      </Box>
      <FormControl>
        <FormLabel>Output Quality: {Math.round(quality * 100)}%</FormLabel>
        <Slider value={quality * 100} onChange={(val) => setQuality(val / 100)} min={10} max={100}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>
      <ButtonGroup spacing={4}>
        <Button
          onClick={handleCrop}
          colorScheme="blue"
          isLoading={cropping}
          loadingText="Cropping..."
        >
          Crop Image
        </Button>
        <Button onClick={resetCrop} variant="outline">Reset</Button>
      </ButtonGroup>
    </VStack>
  )
}