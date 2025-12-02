import { VStack, Button, Text, useClipboard } from '@chakra-ui/react';
import { FiShare2, FiTwitter, FiFacebook, FiLink } from 'react-icons/fi';

interface SocialShareProps {
  imageUrl: string;
  title: string;
}

export function SocialShare({ imageUrl, title }: SocialShareProps) {
  const { hasCopied, onCopy } = useClipboard(imageUrl);

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(imageUrl)}`,
      '_blank'
    );
  };

  return (
    <VStack spacing={3}>
      <Text fontSize="lg" fontWeight="bold">Share your creation</Text>
      <Button leftIcon={<FiTwitter />} onClick={shareOnTwitter}>
        Share on Twitter
      </Button>
      <Button leftIcon={<FiLink />} onClick={onCopy}>
        {hasCopied ? 'Copied!' : 'Copy Link'}
      </Button>
    </VStack>
  );
}