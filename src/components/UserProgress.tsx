import { Box, Progress, Text, VStack, HStack, Icon } from '@chakra-ui/react';
import { FiStar, FiImage, FiAward } from 'react-icons/fi';

interface UserStats {
  imagesEdited: number;
  achievements: number;
  level: number;
  xp: number;
  nextLevelXp: number;
}

export function UserProgress({ stats }: { stats: UserStats }) {
  const progress = (stats.xp / stats.nextLevelXp) * 100;

  return (
    <VStack spacing={4} w="full" p={4}>
      <HStack justify="space-between" w="full">
        <Text fontSize="xl" fontWeight="bold">Level {stats.level}</Text>
        <Text>{stats.xp}/{stats.nextLevelXp} XP</Text>
      </HStack>
      <Progress value={progress} w="full" colorScheme="blue" />
      <HStack spacing={8} justify="center">
        <VStack>
          <Icon as={FiImage} boxSize={6} />
          <Text>{stats.imagesEdited} edited</Text>
        </VStack>
        <VStack>
          <Icon as={FiAward} boxSize={6} />
          <Text>{stats.achievements} achieved</Text>
        </VStack>
      </HStack>
    </VStack>
  );
}