import {
  Button,
  FormControl,
  FormLabel,
  Select,
  VStack,
  Text,
  useToast,
  HStack,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
  Badge,
  Progress,
  FormHelperText,
  useColorModeValue
} from '@chakra-ui/react'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

interface ConvertPanelProps {
  image: {
    file: File
    preview: string
  }
  setEditedImage: (preview: string) => void
}

// Helper to get friendly format name
const getFormatName = (mimeType: string): string => {
  const formatMap: Record<string, string> = {
    'image/jpeg': 'JPEG',
    'image/png': 'PNG',
    'image/webp': 'WebP',
    'image/gif': 'GIF',
    'image/bmp': 'BMP',
    'image/svg+xml': 'SVG'
  };
  return formatMap[mimeType] || mimeType.split('/')[1]?.toUpperCase() || 'Unknown';
};

// Helper to estimate file size after conversion
const estimateFileSize = (
  originalSize: number, 
  originalFormat: string, 
  targetFormat: string, 
  quality: number
): number => {
  // Very rough estimation factors
  const factors: Record<string, Record<string, number>> = {
    'image/jpeg': {
      'image/png': 1.5,
      'image/webp': 0.7,
    },
    'image/png': {
      'image/jpeg': 0.7,
      'image/webp': 0.6,
    },
    'image/webp': {
      'image/jpeg': 1.2,
      'image/png': 1.7,
    }
  };
  
  const factor = factors[originalFormat]?.[targetFormat] || 1;
  // Adjust for quality (if applicable)
  const qualityFactor = (targetFormat === 'image/jpeg' || targetFormat === 'image/webp') 
    ? quality
    : 1;
  
  return Math.round(originalSize * factor * qualityFactor);
};

export function ConvertPanel({ image, setEditedImage }: ConvertPanelProps) {
  // Extract current format from file
  const currentFormat = image.file.type || 'image/jpeg';
  const currentFormatName = getFormatName(currentFormat);
  
  // State management
  const [format, setFormat] = useState(currentFormat !== 'image/webp' ? 'image/webp' : 'image/jpeg');
  const [quality, setQuality] = useState(92);
  const [showTooltip, setShowTooltip] = useState(false);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const toast = useToast();
  const navigate = useNavigate();
  const textColor = useColorModeValue('gray.600', 'gray.300');
  
  // Reset error when format changes
  useEffect(() => {
    setError(null);
  }, [format]);
  
  // Estimated file size after conversion
  const estimatedSize = useMemo(() => {
    return estimateFileSize(
      image.file.size,
      currentFormat,
      format,
      quality / 100
    );
  }, [image.file.size, currentFormat, format, quality]);
  
  const formatSizeDiff = useMemo(() => {
    const diff = estimatedSize - image.file.size;
    const percentDiff = Math.round((diff / image.file.size) * 100);
    return {
      diff,
      percentDiff,
      isSmaller: diff < 0
    };
  }, [estimatedSize, image.file.size]);
  
  // Memoized conversion function
  const convertImage = useCallback(async () => {
    try {
      setConverting(true);
      setProgress(10);
      setError(null);
      
      // Create canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Could not initialize image editor');
      }
      
      // Load image with progress tracking
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        
        img.onerror = () => {
          reject(new Error('The image could not be loaded'));
        };
        
        img.onload = () => {
          try {
            setProgress(50);
            
            // Set canvas dimensions
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            setProgress(80);
            
            // Convert to selected format
            const qualityValue = (format === 'image/jpeg' || format === 'image/webp') ? quality / 100 : undefined;
            const dataUrl = canvas.toDataURL(format, qualityValue);
            
            if (!dataUrl || typeof dataUrl !== 'string') {
              throw new Error('Invalid data URL generated');
            }
            
            setProgress(100);
            resolve(dataUrl);
          } catch (e) {
            reject(e instanceof Error ? e : new Error(String(e)));
          }
        };
        
        img.src = image.preview;
      });
    } catch (error) {
      throw error;
    }
  }, [format, quality, image.preview]);
  
  const handleConvert = async () => {
    try {
      // Skip conversion if format is the same and quality doesn't matter
      if (format === currentFormat && (format !== 'image/jpeg' && format !== 'image/webp')) {
        toast({
          title: 'No conversion needed',
          description: `The image is already in ${currentFormatName} format.`,
          status: 'info',
          duration: 3000,
          isClosable: true
        });
        return;
      }
      
      const dataUrl = await convertImage();
      
      // Update the edited image
      setEditedImage(dataUrl);
      
      // Generate a unique key for localStorage
      const storageKey = `converted_image_${Date.now()}`;
      try {
        // Store the converted image data in localStorage
        localStorage.setItem(storageKey, dataUrl);
        
        // Create URL parameters with only the storage key
        const searchParams = new URLSearchParams({
          imageKey: storageKey,
          fileName: image.file.name,
          tab: 'convert'
        });
        
        // Navigate to download page
        navigate(`/download?${searchParams.toString()}`);
        
        toast({
          title: 'Image converted',
          status: 'success',
          duration: 2000,
          isClosable: true
        });
      } catch (storageError) {
        console.error('Error storing converted image:', storageError);
        toast({
          title: 'Error saving converted image',
          description: 'The image was converted but could not be saved. Please try again with a smaller image.',
          status: 'error',
          duration: 4000,
          isClosable: true
        });
      }
    } catch (error) {
      console.error('Error converting image:', error);
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
      toast({
        title: 'Error converting image',
        description: error instanceof Error ? error.message : 'Failed to convert the image',
        status: 'error',
        duration: 4000,
        isClosable: true
      });
    } finally {
      setConverting(false);
      setProgress(0);
    }
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* Current format info */}
      <Box 
        p={3} 
        borderRadius="md" 
        bg={useColorModeValue('blue.50', 'blue.900')}
      >
        <Text fontSize="sm" fontWeight="medium">
          Current format: <Badge colorScheme="blue">{currentFormatName}</Badge>
          <Text as="span" ml={2} fontWeight="normal">
            ({(image.file.size / 1024).toFixed(1)} KB)
          </Text>
        </Text>
      </Box>

      {/* Format selection */}
      <FormControl isDisabled={converting}>
        <FormLabel htmlFor="format-select">Convert to Format</FormLabel>
        <Select
          id="format-select"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
        >
          <option value="image/jpeg">JPEG</option>
          <option value="image/png">PNG</option>
          <option value="image/webp">WebP</option>
        </Select>
        <FormHelperText>
          Estimated size: {(estimatedSize / 1024).toFixed(1)} KB
          {formatSizeDiff.diff !== 0 && (
            <Text as="span" color={formatSizeDiff.isSmaller ? "green.500" : "red.500"}>
              {' '}({formatSizeDiff.isSmaller ? '-' : '+'}{Math.abs(formatSizeDiff.percentDiff)}%)
            </Text>
          )}
        </FormHelperText>
      </FormControl>

      {/* Quality slider (only for formats that support it) */}
      {(format === 'image/jpeg' || format === 'image/webp') && (
        <FormControl isDisabled={converting}>
          <FormLabel htmlFor="quality-slider">Quality: {quality}%</FormLabel>
          <Slider
            id="quality-slider"
            min={10}
            max={100}
            value={quality}
            onChange={(val) => setQuality(val)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showTooltip}
              label={`${quality}%`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
          <FormHelperText>
            Higher quality = larger file size
          </FormHelperText>
        </FormControl>
      )}

      {/* Error message */}
      {error && (
        <Text color="red.500" fontSize="sm">
          Error: {error}
        </Text>
      )}

      {/* Progress bar */}
      {converting && progress > 0 && (
        <Progress
          value={progress}
          size="sm"
          colorScheme="blue"
          borderRadius="md"
          hasStripe
          isAnimated
        />
      )}

      {/* Convert button */}
      <Button
        colorScheme="blue"
        onClick={handleConvert}
        isLoading={converting}
        loadingText="Converting"
        isDisabled={format === currentFormat && (format !== 'image/jpeg' && format !== 'image/webp')}
      >
        Convert to {getFormatName(format)}
      </Button>
      
      {/* Format comparison info */}
      <HStack 
        spacing={4} 
        justify="space-between" 
        fontSize="xs" 
        color={textColor}
        display={converting ? "none" : "flex"}
      >
        <Text>Original: {(image.file.size / 1024).toFixed(1)} KB</Text>
        <Text>→</Text>
        <Text>
          Estimated: {(estimatedSize / 1024).toFixed(1)} KB
          {formatSizeDiff.diff !== 0 && (
            <Text as="span" color={formatSizeDiff.isSmaller ? "green.500" : "red.500"}>
              {' '}({formatSizeDiff.isSmaller ? '-' : '+'}{Math.abs(formatSizeDiff.percentDiff)}%)
            </Text>
          )}
        </Text>
      </HStack>
    </VStack>
  );
}