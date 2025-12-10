import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { FiDownload, FiTrash2 } from 'react-icons/fi'
import { ResizePanel } from './editor/ResizePanel'
import { CompressPanel } from './editor/CompressPanel'
import { WatermarkPanel } from './editor/WatermarkPanel'
import { ConvertPanel } from './editor/ConvertPanel'
import { CropPanel } from './editor/CropPanel'
import { MemePanel } from './editor/MemePanel'
import { PassportPanel } from './editor/PassportPanel'

export const ImageEditor = ({
  selectedImage: propSelectedImage,
  setSelectedImage,
  defaultTab,
}: {
  selectedImage?: { file: File; preview: string } | null
  setSelectedImage: (image: { file: File; preview: string } | null) => void
  defaultTab?: string
}) => {
  const [selectedImage, setLocalImage] = useState(propSelectedImage)
  const [editedImage, setEditedImage] = useState<string | null>(propSelectedImage?.preview || null)
  const bg = useColorModeValue('white', 'gray.700')

  // Sync state with props
  useEffect(() => {
    setLocalImage(propSelectedImage)
    setEditedImage(propSelectedImage?.preview || null)
  }, [propSelectedImage])

  const getDefaultTabIndex = () => {
    const tabs = ['resize', 'compress', 'watermark', 'convert', 'crop', 'meme', 'passport']
    const index = tabs.indexOf(defaultTab || '')
    return index !== -1 ? index : 0
  }

  const [tabIndex, setTabIndex] = useState(getDefaultTabIndex())

  useEffect(() => {
    setTabIndex(getDefaultTabIndex())
  }, [defaultTab])

  const handleDownload = () => {
    if (editedImage) {
      const link = document.createElement('a')
      link.href = editedImage
      link.download = selectedImage?.file.name || 'edited-image.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <Box p={6} bg={bg} borderRadius="lg" shadow="md" minH="600px" w="100%">
      <Grid templateColumns={{ base: '1fr', md: '300px 1fr' }} gap={6}>
        <Box>
          <Image
            src={editedImage || selectedImage?.preview || ''}
            alt="Preview"
            maxH="300px"
            objectFit="contain"
            w="100%"
            borderRadius="md"
          />
          <HStack mt={4} spacing={4} justify="center">
            <Button
              leftIcon={<FiDownload />}
              onClick={handleDownload}
              colorScheme="blue"
              isDisabled={!editedImage}
            >
              Download
            </Button>
            <Button
              leftIcon={<FiTrash2 />}
              onClick={() => {
                setSelectedImage(null) // Reset parent
                setLocalImage(null)    // Reset local
                setEditedImage(null)
              }}
              colorScheme="red"
              variant="ghost"
            >
              Remove
            </Button>
          </HStack>
        </Box>

        <Box>
          <Tabs
            variant="enclosed"
            index={tabIndex}
            onChange={setTabIndex}
            isLazy
          >
            <TabList>
              <Tab>Resize</Tab>
              <Tab>Compress</Tab>
              <Tab>Watermark</Tab>
              <Tab>Convert</Tab>
              <Tab>Crop</Tab>
              <Tab>Meme</Tab>
              <Tab>Passport</Tab>
            </TabList>
            <TabPanels>
              <TabPanel minH="500px">
                {selectedImage && <ResizePanel image={selectedImage} setEditedImage={setEditedImage} />}
              </TabPanel>
              <TabPanel>
                {selectedImage && <CompressPanel
                  image={selectedImage}
                  setEditedImage={setEditedImage}
                />}
              </TabPanel>
              <TabPanel>
                {selectedImage && <WatermarkPanel
                  image={selectedImage}
                  setEditedImage={setEditedImage}
                />}
              </TabPanel>
              <TabPanel>
                {selectedImage && <ConvertPanel
                  image={selectedImage}
                  setEditedImage={setEditedImage}
                />}
              </TabPanel>
              <TabPanel>
                {selectedImage && <CropPanel
                  image={selectedImage}
                  setEditedImage={setEditedImage}
                />}
              </TabPanel>
              <TabPanel>
                {selectedImage && <MemePanel
                  image={selectedImage}
                  setEditedImage={setEditedImage}
                />}
              </TabPanel>
              <TabPanel>
                {selectedImage && <PassportPanel
                  image={selectedImage}
                  setEditedImage={setEditedImage}
                />}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Grid>
    </Box>
  )
}