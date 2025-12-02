import { useOutletContext } from 'react-router-dom';
import { ImageEditor } from './ImageEditor';
import { useSearchParams } from 'react-router-dom';

interface ImageFile {
  file: File
  preview: string
}

type ImageContext = [
  ImageFile | null,
  React.Dispatch<React.SetStateAction<ImageFile | null>>
]

export function EditorWrapper() {
  const [selectedImage, setSelectedImage] = useOutletContext<ImageContext>();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'editor';
  
  return (
    <ImageEditor 
      selectedImage={selectedImage} 
      setSelectedImage={setSelectedImage} 
      defaultTab={tab}
    />
  );
}