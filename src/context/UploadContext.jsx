import React, { createContext, useState } from 'react';

// Create the context
const UploadContext = createContext();

// Create the provider component
function UploadProvider({children}){
    const [uploadedFile, setUploadedFile] = useState(null); // Track the file user uploaded (they can go through the wiz with one file at a time)

    return(
        // Provide the uploadedFile and setUploadedFile to all components that need it
        // This allows us to access the uploaded file in any component that is a child of UploadProvider
        <UploadContext.Provider value={{ uploadedFile, setUploadedFile }}>
            {children}
        </UploadContext.Provider>
    )
}

// Export both the context and the provider
export { UploadContext, UploadProvider };