import { HStack, IconButton, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { FiUndo, FiRedo, FiSave, FiRotateCcw } from 'react-icons/fi';

interface EditorToolbarProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
  onSave: () => void;
}

export function EditorToolbar({ canUndo, canRedo, onUndo, onRedo, onReset, onSave }: EditorToolbarProps) {
  const bg = useColorModeValue('white', 'gray.800');
  
  return (
    <HStack spacing={2} p={2} bg={bg} borderRadius="md" shadow="sm">
      <Tooltip label="Undo">
        <IconButton
          aria-label="Undo"
          icon={<FiUndo />}
          isDisabled={!canUndo}
          onClick={onUndo}
        />
      </Tooltip>
      {/* Add other toolbar buttons */}
    </HStack>
  );
}