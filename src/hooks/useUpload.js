import { useContext } from 'react';
import { UploadContext } from '../context/UploadContext.jsx';

// Custom hook to allow components to easily access the uploaded file state
// avoids using useContext(UploadContext) everywhere
export function useUpload() {
  return useContext(UploadContext);
}
