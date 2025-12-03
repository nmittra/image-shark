import { Box, Button } from '@chakra-ui/react';

export const SkipToContent = () => {
    return (
        <Box
            as="a"
            href="#main-content"
            position="absolute"
            top="-9999px"
            left="-9999px"
            zIndex="skipLink"
            _focus={{
                top: 4,
                left: 4,
                width: 'auto',
                height: 'auto',
                bg: 'white',
                color: 'blue.600',
                p: 4,
                boxShadow: 'outline',
            }}
        >
            Skip to content
        </Box>
    );
};
