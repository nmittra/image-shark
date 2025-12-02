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
  VStack,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react'
import { AdContainer } from './AdContainer'
import { useState } from 'react'
import { FiDownload, FiTrash2 } from 'react-icons/fi'
import { ResizePanel } from './editor/ResizePanel'
import { CompressPanel } from './editor/CompressPanel'
import { WatermarkPanel } from './editor/WatermarkPanel'
import { ConvertPanel } from './editor/ConvertPanel'
import { CropPanel } from './editor/CropPanel'
import { MemePanel } from './editor/MemePanel'

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

  const getDefaultTabIndex = () => {
    const tabs = ['resize', 'compress', 'watermark', 'convert', 'crop', 'meme']
    const index = tabs.indexOf(defaultTab || '')
    return index !== -1 ? index : 0
  }

  const showSidebar = useBreakpointValue({ base: false, lg: true });

  return (
    <Box>
      <AdContainer id="leaderboard-top" type="leaderboard" />
      <Grid templateColumns={showSidebar ? '1fr 300px' : '1fr'} gap={4}>
        <Box p={6} bg={bg} borderRadius="lg" shadow="md" minH="600px" w="100%">
          <Grid templateColumns={{ base: '1fr', md: '300px 1fr' }} gap={6}>
            <Box>
              <Image
                src={editedImage || selectedImage?.preview}
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
                    setSelectedImage(null)
                    setLocalImage(null)
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
              <Tabs variant="enclosed" defaultIndex={getDefaultTabIndex()} isLazy>
                <TabList>
                  <Tab>Resize</Tab>
                  <Tab>Compress</Tab>
                  <Tab>Watermark</Tab>
                  <Tab>Convert</Tab>
                  <Tab>Crop</Tab>
                  <Tab>Meme</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel minH="500px">
                    <ResizePanel image={selectedImage} setEditedImage={setEditedImage} />
                  </TabPanel>
                  <TabPanel>
                    <CompressPanel
                      image={selectedImage}
                      setEditedImage={setEditedImage}
                    />
                  </TabPanel>
                  <TabPanel>
                    <WatermarkPanel
                      image={selectedImage}
                      setEditedImage={setEditedImage}
                    />
                  </TabPanel>
                  <TabPanel>
                    <ConvertPanel
                      image={selectedImage}
                      setEditedImage={setEditedImage}
                    />
                  </TabPanel>
                  <TabPanel>
                    <CropPanel
                      image={selectedImage}
                      setEditedImage={setEditedImage}
                    />
                  </TabPanel>
                  <TabPanel>
                    <MemePanel
                      image={selectedImage}
                      setEditedImage={setEditedImage}
                    />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Box>
  )
}