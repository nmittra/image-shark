import { Box, Text, VStack, Button, HStack, IconButton, useColorModeValue } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUploadCloud, FiSettings, FiPlus } from 'react-icons/fi'

interface ImageUploaderProps {
  setSelectedImage: (image: { file: File; preview: string } | null) => void
}

export function ImageUploader({ setSelectedImage }: ImageUploaderProps) {
  const [files, setFiles] = useState<Array<{ name: string; size: number }>>([])
  const borderColor = useColorModeValue("gray.200", "gray.600")
  const bgColor = useColorModeValue("blue.50", "blue.900")

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = () => {
        setSelectedImage({
          file,
          preview: reader.result as string
        })
      }
      reader.readAsDataURL(file)
      setFiles(prevFiles => [...prevFiles, { name: file.name, size: file.size }])
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
        >
          <input {...getInputProps()} />
          <VStack spacing={2}>
            <FiUploadCloud size={40} color="currentColor" />
            <Text fontWeight="medium">
              {files.length > 0 ? "File added! Start task or add more files" : "Drag and drop your images here, or click to select files"}
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

        <HStack spacing={4}>
          <Button
            leftIcon={<FiPlus />}
            variant="outline"
            onClick={() => {
              const fileInput = document.createElement('input')
              fileInput.type = 'file'
              fileInput.accept = 'image/*'
              fileInput.multiple = true
              fileInput.onchange = (e) => {
                const files = (e.target as HTMLInputElement).files
                if (files) {
                  onDrop(Array.from(files))
                }
              }
              fileInput.click()
            }}
          >
            Add more files
          </Button>
          <Button
            leftIcon={<FiSettings />}
            variant="outline"
          >
            Settings
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              if (files.length > 0) {
                setSelectedImage({
                  file: files[0],
                  preview: URL.createObjectURL(files[0])
                })
              }
            }}
          >
            START
          </Button>
        </HStack>
      </VStack>
    </Box>
  )
}