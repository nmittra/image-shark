import { SimpleGrid, Box, Image, Text, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface Template {
  id: string;
  name: string;
  preview: string;
  category: string;
}

export function TemplateGallery({ templates, onSelect }: { 
  templates: Template[];
  onSelect: (template: Template) => void;
}) {
  const bgHover = useColorModeValue('gray.100', 'gray.700');

  return (
    <SimpleGrid columns={[2, 3, 4]} spacing={4}>
      {templates.map((template) => (
        <motion.div
          key={template.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Box
            cursor="pointer"
            onClick={() => onSelect(template)}
            borderRadius="md"
            overflow="hidden"
            _hover={{ bg: bgHover }}
          >
            <Image src={template.preview} alt={template.name} />
            <Text p={2} textAlign="center">{template.name}</Text>
          </Box>
        </motion.div>
      ))}
    </SimpleGrid>
  );
}