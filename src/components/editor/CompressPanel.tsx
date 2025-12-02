import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  VStack,
  HStack,
  useToast,
  Collapse,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Image
} from '@chakra-ui/react'
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import imageCompression from 'browser-image-compression'
import { Progress } from '@chakra-ui/react'

interface CompressPanelProps {
  image: {
    file: File
    preview: string
  }
  setEditedImage: (preview: string) => void
}

export function CompressPanel({ image, setEditedImage }: CompressPanelProps) {
  const [quality, setQuality] = useState(80)
  const [compressing, setCompressing] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [maxWidth, setMaxWidth] = useState(1920)
  const [maxHeight, setMaxHeight] = useState(1920)
  const [preserveExif, setPreserveExif] = useState(false)
  const [previewCompressed, setPreviewCompressed] = useState<string | null>(null)
  const [previewLoading, setPreviewLoading] = useState(false)
  const [compressionProgress, setCompressionProgress] = useState(0)
  const [previewData, setPreviewData] = useState({
    originalSize: image.file.size,
    estimatedSize: 0,
    compressionRatio: 0,
    savings: 0
  })
  const toast = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    // Rough estimation based on quality setting
    const estimatedSize = Math.max(
      (image.file.size * quality) / 100,
      image.file.size * 0.1 // Minimum 10% of original
    )
    
    setPreviewData({
      originalSize: image.file.size,
      estimatedSize,
      compressionRatio: Math.round((image.file.size / estimatedSize) * 10) / 10,
      savings: Math.round(((image.file.size - estimatedSize) / image.file.size) * 100)
    })
  }, [quality, image.file.size])

  const generatePreview = async () => {
    try {
      setPreviewLoading(true)
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: Math.max(maxWidth, maxHeight),
        useWebWorker: true,
        initialQuality: quality / 100,
        preserveExif: preserveExif
      }

      const compressedFile = await imageCompression(image.file, options)
      const reader = new FileReader()
      
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPreviewCompressed(reader.result)
        }
        setPreviewLoading(false)
      }
      
      reader.onerror = () => {
        setPreviewLoading(false)
      }
      
      reader.readAsDataURL(compressedFile)
    } catch (error) {
      console.error('Error generating preview:', error)
      setPreviewLoading(false)
    }
  }

  const handleCompress = async () => {
    let reader: FileReader | null = null
    try {
      setCompressing(true)
      setCompressionProgress(0)
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: Math.max(maxWidth, maxHeight),
        useWebWorker: true,
        initialQuality: quality / 100,
        preserveExif: preserveExif,
        onProgress: (progress: number) => {
          setCompressionProgress(progress)
        }
      }

      const compressedFile = await imageCompression(image.file, options)
      reader = new FileReader()

      const result = await new Promise<string>((resolve, reject) => {
        if (!reader) return reject(new Error('FileReader was cleaned up'))

        reader.onloadend = () => {
          if (reader && typeof reader.result === 'string') {
            resolve(reader.result)
          } else {
            reject(new Error('Failed to read compressed file'))
          }
        }

        reader.onerror = () => {
          reject(new Error('Error reading compressed file'))
        }

        reader.readAsDataURL(compressedFile)
      })

      setEditedImage(result)
      // Use React Router for navigation to maintain the single-page application flow
      const searchParams = new URLSearchParams({
        image: result,
        originalSize: String(image.file.size),
        compressedSize: String(compressedFile.size),
        fileName: image.file.name
      })
      navigate(`/download?${searchParams.toString()}`)
    } catch (error) {
      console.error('Error compressing image:', error)
      toast({
        title: 'Error compressing image',
        description: 'Please try again with a different quality setting',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    } finally {
      if (reader) {
        reader.onloadend = null
        reader.onerror = null
        reader = null
      }
      setCompressing(false)
    }
  }

  return (
    <VStack spacing={6} align="stretch" p={4}>
      <Box 
        p={4} 
        borderWidth={1} 
        borderRadius="md" 
        bg="gray.50" 
        _dark={{ bg: "gray.700" }}
        mb={4}
      >
        <VStack spacing={2} align="stretch">
          <HStack justify="space-between">
            <Text fontWeight="medium">Original Size:</Text>
            <Text>{(previewData.originalSize / 1024).toFixed(1)} KB</Text>
          </HStack>
          
          <HStack justify="space-between">
            <Text fontWeight="medium">Estimated Size:</Text>
            <Text>{(previewData.estimatedSize / 1024).toFixed(1)} KB</Text>
          </HStack>
          
          <HStack justify="space-between">
            <Text fontWeight="medium">Reduction:</Text>
            <Text color="green.500">{previewData.savings}%</Text>
          </HStack>
        </VStack>
      </Box>

      <FormControl mb={4}>
        <FormLabel fontWeight="medium">Quick Presets</FormLabel>
        <HStack spacing={4}>
          <Button 
            size="sm" 
            colorScheme={quality === 90 ? "blue" : "gray"} 
            onClick={() => setQuality(90)}
            flex={1}
          >
            High Quality
          </Button>
          <Button 
            size="sm" 
            colorScheme={quality === 70 ? "blue" : "gray"} 
            onClick={() => setQuality(70)}
            flex={1}
          >
            Balanced
          </Button>
          <Button 
            size="sm" 
            colorScheme={quality === 40 ? "blue" : "gray"} 
            onClick={() => setQuality(40)}
            flex={1}
          >
            High Compression
          </Button>
        </HStack>
      </FormControl>

      <FormControl>
        <FormLabel fontWeight="medium">Compression Quality</FormLabel>
        <Box px={2}>
          <Text mb={2}>{quality}%</Text>
          <Slider
            value={quality}
            onChange={(value: number) => setQuality(value)}
            min={1}
            max={100}
            step={1}
            colorScheme="blue"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
        </Box>
      </FormControl>

      <Box mt={4}>
        <Button 
          variant="link" 
          size="sm" 
          onClick={() => setShowAdvanced(!showAdvanced)}
          rightIcon={showAdvanced ? <ChevronUpIcon /> : <ChevronDownIcon />}
        >
          Advanced Options
        </Button>
        
        <Collapse in={showAdvanced} animateOpacity>
          <VStack spacing={4} mt={4} align="stretch">
            <FormControl>
              <FormLabel fontSize="sm">Maximum Width (px)</FormLabel>
              <NumberInput 
                value={maxWidth} 
                onChange={(_, val) => setMaxWidth(val)}
                min={100}
                max={8000}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            
            <FormControl>
              <FormLabel fontSize="sm">Maximum Height (px)</FormLabel>
              <NumberInput 
                value={maxHeight} 
                onChange={(_, val) => setMaxHeight(val)}
                min={100}
                max={8000}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            
            <FormControl>
              <Checkbox isChecked={preserveExif} onChange={(e) => setPreserveExif(e.target.checked)}>
                Preserve image metadata (EXIF)
              </Checkbox>
            </FormControl>
          </VStack>
        </Collapse>
      </Box>

      <Button
        mt={4}
        colorScheme="gray"
        size="md"
        width="100%"
        onClick={generatePreview}
        isLoading={previewLoading}
        loadingText="Generating Preview"
      >
        Preview Compression
      </Button>

      {compressing && (
        <Box mt={4}>
          <Text mb={1} fontSize="sm">Compressing: {Math.round(compressionProgress)}%</Text>
          <Progress 
            value={compressionProgress} 
            size="sm" 
            colorScheme="blue" 
            borderRadius="md" 
            hasStripe 
            isAnimated 
          />
        </Box>
      )}

      {previewCompressed && (
        <Box mt={4} borderWidth={1} borderRadius="md" overflow="hidden">
          <Tabs isFitted variant="enclosed">
            <TabList>
              <Tab>Original</Tab>
              <Tab>Compressed</Tab>
            </TabList>
            <TabPanels>
              <TabPanel p={0}>
                <Box position="relative">
                  <Image 
                    src={image.preview} 
                    alt="Original" 
                    width="100%" 
                  />
                  <Text 
                    position="absolute" 
                    bottom={2} 
                    right={2} 
                    bg="blackAlpha.700" 
                    color="white" 
                    fontSize="xs" 
                    px={2} 
                    py={1} 
                    borderRadius="md"
                  >
                    {(image.file.size / 1024).toFixed(1)} KB
                  </Text>
                </Box>
              </TabPanel>
              <TabPanel p={0}>
                <Box position="relative">
                  <Image 
                    src={previewCompressed} 
                    alt="Compressed" 
                    width="100%" 
                  />
                  <Text 
                    position="absolute" 
                    bottom={2} 
                    right={2} 
                    bg="blackAlpha.700" 
                    color="white" 
                    fontSize="xs" 
                    px={2} 
                    py={1} 
                    borderRadius="md"
                  >
                    ~{(previewData.estimatedSize / 1024).toFixed(1)} KB
                  </Text>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      )}

      <Button
        colorScheme="blue"
        size="lg"
        width="100%"
        borderRadius="md"
        onClick={handleCompress}
        isLoading={compressing}
        loadingText="Compressing"
        mt={4}
      >
        Compress Image
      </Button>
    </VStack>
  )
}