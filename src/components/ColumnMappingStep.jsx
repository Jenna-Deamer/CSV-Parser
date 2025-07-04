import { useCallback, useState } from 'react';
import { useWizard } from 'react-use-wizard';
import { useCSVWizard } from '../hooks/useCSVWizard'; // Custom hook to access the uploaded files from it's context


function ColumnMappingStep() {
    const { nextStep } = useWizard();
    const { uploadedFile, selectedAccount } = useCSVWizard(); // Get uploadedFile & account state
    // Access the uploaded file and account setter from the context
    const [loading, setLoading] = useState(false);

    return (

        <div>
            <h2>Step 3: Column Mapping</h2>
            <h3>For: {selectedAccount}</h3>


        </div>
    );
}

export default ColumnMappingStep;
