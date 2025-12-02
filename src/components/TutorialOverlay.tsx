import { Box, Portal, Text, Button, useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export function TutorialOverlay() {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  
  return isOpen ? (
    <Portal>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0,0,0,0.7)"
          zIndex="tooltip"
        >
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            bg="white"
            p={6}
            borderRadius="md"
            maxW="400px"
          >
            <Text fontSize="xl" mb={4}>
              Welcome to Image Shark! 🦈
            </Text>
            <Text mb={4}>
              Let's get you started with some quick tips on how to make the most of our tools.
            </Text>
            <Button onClick={onClose}>Start Editing</Button>
          </Box>
        </Box>
      </motion.div>
    </Portal>
  ) : null;
}