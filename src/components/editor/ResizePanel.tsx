import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Switch,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { useState, useCallback, useEffect } from 'react'

interface ResizePanelProps {
  image: {
    file: File
    preview: string
  }
  setEditedImage: (preview: string) => void
}

export function ResizePanel({ image, setEditedImage }: ResizePanelProps) {
  const toast = useToast()
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true)
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number } | null>(null)

  const loadImageDimensions = useCallback(() => {
    const img = new Image()
    img.onload = () => {
      setOriginalDimensions({ width: img.width, height: img.height })
      setWidth(String(img.width))
      setHeight(String(img.height))
    }
    img.src = image.preview
  }, [image.preview])

  useEffect(() => {
    loadImageDimensions()
  }, [loadImageDimensions])

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = e.target.value
    setWidth(newWidth)

    if (maintainAspectRatio && originalDimensions) {
      const ratio = originalDimensions.height / originalDimensions.width
      setHeight(String(Math.round(Number(newWidth) * ratio)))
    }
  }

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = e.target.value
    setHeight(newHeight)

    if (maintainAspectRatio && originalDimensions) {
      const ratio = originalDimensions.width / originalDimensions.height
      setWidth(String(Math.round(Number(newHeight) * ratio)))
    }
  }

  const handleResize = async () => {
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        toast({
          title: 'Error resizing image',
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
        canvas.width = Number(width)
        canvas.height = Number(height)
        ctx.drawImage(img, 0, 0, Number(width), Number(height))
        setEditedImage(canvas.toDataURL(image.file.type))
        toast({
          title: 'Image resized',
          status: 'success',
          duration: 2000,
          isClosable: true
        })
      }
      img.src = image.preview
    } catch (error) {
      console.error('Error resizing image:', error)
      toast({
        title: 'Error resizing image',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  }

  return (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>Width (px)</FormLabel>
        <Input
          type="number"
          value={width}
          onChange={handleWidthChange}
          min="1"
          max="10000"
          step="1"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Height (px)</FormLabel>
        <Input
          type="number"
          value={height}
          onChange={handleHeightChange}
          min="1"
          max="10000"
          step="1"
        />
      </FormControl>

      <FormControl display="flex" alignItems="center">
        <FormLabel mb="0">
          Maintain aspect ratio
        </FormLabel>
        <Switch
          isChecked={maintainAspectRatio}
          onChange={(e) => setMaintainAspectRatio(e.target.checked)}
        />
      </FormControl>

      <Button colorScheme="blue" onClick={handleResize}>
        Resize Image
      </Button>
    </VStack>
  )
}