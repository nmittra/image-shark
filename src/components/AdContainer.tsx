import { Box, useColorModeValue } from '@chakra-ui/react';

interface AdContainerProps {
  id: string;
  type: 'leaderboard' | 'sidebar' | 'in-content' | 'footer';
  className?: string;
}

export const AdContainer = ({ id, type, className }: AdContainerProps) => {
  const bg = useColorModeValue('gray.50', 'gray.700');
  const border = useColorModeValue('gray.200', 'gray.600');

  const getAdDimensions = (type: string) => {
    switch (type) {
      case 'leaderboard':
        return { minHeight: '90px', width: '100%', maxWidth: '728px' };
      case 'sidebar':
        return { minHeight: '600px', width: '300px' };
      case 'in-content':
        return { minHeight: '250px', width: '100%' };
      case 'footer':
        return { minHeight: '90px', width: '100%', maxWidth: '728px' };
      default:
        return {};
    }
  };

  return (
    <Box
      id={id}
      className={`ad-container ${className || ''}`}
      bg={bg}
      border="1px solid"
      borderColor={border}
      borderRadius="md"
      p={2}
      my={4}
      mx="auto"
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...getAdDimensions(type)}
      role="complementary"
      aria-label="Advertisement"
    >
      {/* Ad code will be inserted here */}
      <Box as="span" color="gray.500" fontSize="sm">
        Advertisement
      </Box>
    </Box>
  );
};