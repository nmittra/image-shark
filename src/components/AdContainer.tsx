import { Box, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

interface AdContainerProps {
  id: string;
  type: 'leaderboard' | 'sidebar' | 'in-content' | 'footer' | 'anchor';
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdContainer = ({ id, type, className }: AdContainerProps) => {
  const bg = useColorModeValue('gray.50', 'gray.700');
  const border = useColorModeValue('gray.200', 'gray.600');
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // For anchor ads, we want them to load immediately if possible, or use standard observer
    if (type === 'anchor') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '200px' } // Load slightly earlier
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [type]);

  useEffect(() => {
    if (isVisible && !adLoaded) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }
  }, [isVisible, adLoaded]);

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
      case 'anchor':
        return { width: '100%', height: 'auto', minHeight: '50px' };
      default:
        return {};
    }
  };

  if (type === 'anchor') {
    return (
      <Box
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        zIndex="1000"
        bg={bg}
        borderTop="1px solid"
        borderColor={border}
        textAlign="center"
        display={{ base: 'block', md: 'none' }} // Only show on mobile
        id={id}
        className={`ad-container ${className || ''}`}
      >
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Placeholder
          data-ad-slot="XXXXXXXXXX" // Placeholder
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </Box>
    );
  }

  return (
    <Box
      ref={containerRef}
      id={id}
      className={`ad-container ${className || ''}`}
      bg={bg}
      border="2px solid"
      borderColor={border}
      borderRadius="lg"
      p={4}
      my={8} // Increased margin for spacing
      mx="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="relative"
      _before={{
        content: '"Advertisement"',
        position: 'absolute',
        top: '-12px',
        left: '50%',
        transform: 'translateX(-50%)',
        bg: bg,
        px: 2,
        fontSize: 'xs',
        color: 'gray.500',
        fontWeight: 'medium',
      }}
      {...getAdDimensions(type)}
      role="complementary"
      aria-label="Advertisement"
    >
      {isVisible ? (
        <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center" overflow="hidden">
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Placeholder
            data-ad-slot="XXXXXXXXXX" // Placeholder
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </Box>
      ) : (
        <Box as="span" color="gray.500" fontSize="sm">
          Loading advertisement...
        </Box>
      )}
    </Box>
  );
};