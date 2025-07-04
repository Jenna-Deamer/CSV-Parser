import { createContext, useState } from 'react';

// Create the context
const CSVWizardContext = createContext();

// Create the provider component
function CSVWizardProvider({children}){
    const [uploadedFile, setUploadedFile] = useState(null); // Track the file user uploaded (they can go through the wiz with one file at a time)
    const [selectedAccount, setSelectedAccount] = useState(null); // Track the account the user selected for the CSV import
    const [columnMapping, setColumnMapping] = useState({}); // Track how the user maps the columns from their CSV file to the system's required fields

    return(
        // Provide all wizard-related state to components that need it
        // This allows us to access the wizard state in any component that is a child of CSVWizardProvider
        <CSVWizardContext.Provider value={{ 
            uploadedFile, 
            setUploadedFile,
            selectedAccount,
            setSelectedAccount,
            columnMapping,
            setColumnMapping
        }}>
            {children}
        </CSVWizardContext.Provider>
    )
}

// Export both the context and the provider
export { CSVWizardContext, CSVWizardProvider };