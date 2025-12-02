import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  useToast
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useState, useCallback } from 'react'

interface WatermarkPanelProps {
  image: {
    file: File
    preview: string
  }
  setEditedImage: (preview: string) => void
}

// Helper function to convert hex to rgb
function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

export function WatermarkPanel({ image, setEditedImage }: WatermarkPanelProps) {
  const [text, setText] = useState('')
  const [fontSize, setFontSize] = useState(24)
  const [opacity, setOpacity] = useState(50)
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [rotation, setRotation] = useState(0)
  const [color, setColor] = useState('#ffffff')
  const [fontFamily, setFontFamily] = useState('Arial')
  const toast = useToast()
  const navigate = useNavigate()

  const processWatermark = useCallback((shouldNavigate = false) => {
    if (!text) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      toast({
        title: 'Error processing watermark',
        description: 'Could not initialize image editor',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
      return
    }

    const img = new Image()
    img.onerror = () => {
      toast({
        title: 'Error loading image',
        description: 'The image could not be loaded. Please try again or use a different image.',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height

      // Draw the original image
      ctx.drawImage(img, 0, 0)

      // Configure watermark text
      ctx.fillStyle = `rgba(${hexToRgb(color)}, ${opacity / 100})`
      ctx.font = `${fontSize}px ${fontFamily}`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // Calculate position
      const x = (img.width * position.x) / 100
      const y = (img.height * position.y) / 100

      // Draw watermark with rotation
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate((rotation * Math.PI) / 180)
      ctx.fillText(text, 0, 0)
      ctx.restore()

      // Get the watermarked image data
      const result = canvas.toDataURL(image.file.type)

      // Update the image
      setEditedImage(result)

      if (shouldNavigate) {
        // Store image data in localStorage
        const imageData = result.split(',')[1]
        localStorage.setItem('watermarkedImage', imageData)
        localStorage.setItem('fileName', image.file.name)
        
        // Navigate to download page
        navigate('/download')
        toast({
          title: 'Watermark applied',
          status: 'success',
          duration: 2000,
          isClosable: true
        })
      }
    }
    img.src = image.preview
  }, [text, fontSize, opacity, position, rotation, color, fontFamily, image, setEditedImage, toast, navigate])

  const previewWatermark = useCallback(() => {
    processWatermark(false)
  }, [processWatermark])

  const applyWatermark = useCallback(() => {
    processWatermark(true)
  }, [processWatermark])

  return (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>Watermark Text</FormLabel>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter watermark text"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Font Size: {fontSize}px</FormLabel>
        <NumberInput
          value={fontSize}
          onChange={(_, value) => setFontSize(value)}
          min={12}
          max={200}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl>
        <FormLabel>Opacity: {opacity}%</FormLabel>
        <Slider
          value={opacity}
          onChange={setOpacity}
          min={0}
          max={100}
          step={1}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>

      <FormControl>
        <FormLabel>Position</FormLabel>
        <HStack spacing={4}>
          <VStack flex={1}>
            <Text fontSize="sm">X: {position.x}%</Text>
            <Slider
              value={position.x}
              onChange={(x) => setPosition({ ...position, x })}
              min={0}
              max={100}
              step={1}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </VStack>
          <VStack flex={1}>
            <Text fontSize="sm">Y: {position.y}%</Text>
            <Slider
              value={position.y}
              onChange={(y) => setPosition({ ...position, y })}
              min={0}
              max={100}
              step={1}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </VStack>
        </HStack>
      </FormControl>

      <FormControl>
        <FormLabel>Rotation: {rotation}°</FormLabel>
        <Slider
          value={rotation}
          onChange={setRotation}
          min={0}
          max={360}
          step={1}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>

      <FormControl>
        <FormLabel>Color</FormLabel>
        <Input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </FormControl>

      <HStack spacing={4} w="full">
        <Button
          colorScheme="gray"
          onClick={previewWatermark}
          isDisabled={!text}
          flex={1}
        >
          Preview
        </Button>
        <Button
          colorScheme="blue"
          onClick={applyWatermark}
          isDisabled={!text}
          flex={1}
        >
          Apply Watermark
        </Button>
      </HStack>
    </VStack>
  )
}