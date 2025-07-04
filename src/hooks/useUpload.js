import { useContext } from 'react';
import { CSVWizardContext } from '../context/CSVWizardContext.jsx';

// Custom hook to allow components to easily access the CSV wizard state
// avoids using useContext(CSVWizardContext) everywhere
export function useUpload() {
  return useContext(CSVWizardContext);
}
