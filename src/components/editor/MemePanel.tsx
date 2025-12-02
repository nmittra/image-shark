import {
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  ColorPicker,
  useToast
} from '@chakra-ui/react'
import { useState, useRef } from 'react'

interface MemePanelProps {
  image: {
    file: File
    preview: string
  }
  setEditedImage: (preview: string) => void
}

export function MemePanel({ image, setEditedImage }: MemePanelProps) {
  const [topText, setTopText] = useState('')
  const [bottomText, setBottomText] = useState('')
  const [fontSize, setFontSize] = useState(48)
  const [textColor, setTextColor] = useState('#FFFFFF')
  const [generating, setGenerating] = useState(false)
  const toast = useToast()

  const handleGenerate = async () => {
    try {
      setGenerating(true)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const img = new Image()
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        // Configure text style
        ctx.fillStyle = textColor
        ctx.strokeStyle = '#000000'
        ctx.lineWidth = fontSize / 8
        ctx.font = `bold ${fontSize}px Impact`
        ctx.textAlign = 'center'

        // Draw top text
        if (topText) {
          ctx.textBaseline = 'top'
          ctx.strokeText(topText, canvas.width / 2, 20)
          ctx.fillText(topText, canvas.width / 2, 20)
        }

        // Draw bottom text
        if (bottomText) {
          ctx.textBaseline = 'bottom'
          ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20)
          ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20)
        }

        const dataUrl = canvas.toDataURL(image.file.type)
        setEditedImage(dataUrl)
        toast({
          title: 'Meme generated',
          status: 'success',
          duration: 2000,
          isClosable: true
        })
      }
      img.src = image.preview
    } catch (error) {
      console.error('Error generating meme:', error)
      toast({
        title: 'Error generating meme',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    } finally {
      setGenerating(false)
    }
  }

  return (
    <VStack spacing={6} align="stretch">
      <FormControl>
        <FormLabel>Top Text</FormLabel>
        <Input
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
          placeholder="Enter top text"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Bottom Text</FormLabel>
        <Input
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
          placeholder="Enter bottom text"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Font Size</FormLabel>
        <NumberInput
          value={fontSize}
          onChange={(_, value) => setFontSize(value)}
          min={20}
          max={100}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl>
        <FormLabel>Text Color</FormLabel>
        <Input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        onClick={handleGenerate}
        isLoading={generating}
        loadingText="Generating"
      >
        Generate Meme
      </Button>
    </VStack>
  )
}