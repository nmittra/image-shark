import { Box, Text, VStack, Button, HStack, useColorModeValue } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUploadCloud } from 'react-icons/fi'

interface ImageUploaderProps {
  setSelectedImage: (image: { file: File; preview: string } | null) => void
}

export function ImageUploader({ setSelectedImage }: ImageUploaderProps) {
  const [files, setFiles] = useState<Array<{ name: string; size: number; file: File }>>([])
  const borderColor = useColorModeValue("gray.200", "gray.600")
  const bgColor = useColorModeValue("blue.50", "blue.900")

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Auto-select the first file to streamline UX
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      const reader = new FileReader()
      reader.onload = () => {
        setSelectedImage({
          file,
          preview: reader.result as string
        })
      }
      reader.readAsDataURL(file)
    }

    // Also update local state
    acceptedFiles.forEach(file => {
      setFiles(prevFiles => [...prevFiles, { name: file.name, size: file.size, file }])
    })
  }, [setSelectedImage])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    }
  })

  return (
    <Box w="100%" p={4}>
      <VStack spacing={4} align="stretch">
        <Box
          {...getRootProps()}
          borderWidth={2}
          borderStyle="dashed"
          borderColor={borderColor}
          borderRadius="lg"
          p={6}
          bg={bgColor}
          textAlign="center"
          cursor="pointer"
          _hover={{ borderColor: "blue.500" }}
          transition="all 0.2s"
        >
          <input {...getInputProps()} />
          <VStack spacing={2}>
            <FiUploadCloud size={40} color="currentColor" />
            <Text fontWeight="medium">
              {files.length > 0 ? "Processing..." : "Drag and drop your images here, or click to select files"}
            </Text>
          </VStack>
        </Box>

        {files.length > 0 && (
          <Box>
            {files.map((file, index) => (
              <HStack key={index} p={2} bg={bgColor} borderRadius="md" justify="space-between">
                <Text>{file.name}</Text>
                <Text color="gray.500">{(file.size / 1024).toFixed(2)} KB</Text>
              </HStack>
            ))}
          </Box>
        )}


      </VStack>
    </Box>
  )
}