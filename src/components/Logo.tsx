import { Box, Text, HStack, useColorModeValue, BoxProps } from '@chakra-ui/react';

export const Logo = (props: BoxProps) => {
    return (
        <HStack spacing={2} alignItems="center" {...props}>
            <Box
                as="svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                color="blue.500"
                width="100%"
                height="100%"
                maxW="40px"
                maxH="40px"
            >
                <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
            </Box>
            <Text
                fontFamily="Righteous"
                fontSize="2xl"
                fontWeight="bold"
                bgGradient="linear(to-r, blue.400, purple.500)"
                bgClip="text"
                display={{ base: 'none', sm: 'block' }}
            >
                Image Shark
            </Text>
        </HStack>
    );
};
