import { useCallback } from 'react';
import Dropzone from 'react-dropzone';
import { useWizard } from 'react-use-wizard';
import { useUpload } from '../hooks/useUpload'; // Custom hook to access the uploaded files from it's context


function UploadStep() {
    const { nextStep } = useWizard();
    const { uploadedFile, setUploadedFile } = useUpload(); // Access the uploaded file and setter from the context

    const onDrop = useCallback((acceptedFiles) => {
        setUploadedFile(acceptedFiles[0]); // Only accept one file
    }, [setUploadedFile]); // Callback to handle file change

    return (
        // Only accept CSV files & display selected file name
        <div>
            <h2>Step 1: Upload CSV</h2>
            <Dropzone onDrop={onDrop} accept={{ 'text/csv': ['.csv'] }} multiple={false}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div
                            {...getRootProps()}
                            style={{
                                border: '2px dashed #888',
                                padding: '20px',
                                textAlign: 'center',
                                cursor: 'pointer',
                            }}
                        >
                            <input {...getInputProps()} />
                            <p>Drag and drop your CSV file here, or click to browse</p>
                        </div>
                    </section>
                )}
            </Dropzone>

            {uploadedFile && (
                <div style={{ marginTop: '10px' }}>
                    <strong>Selected file:</strong> {uploadedFile.name}
                </div>
            )}

            <button
                type="button"
                onClick={nextStep}
                disabled={!uploadedFile}
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    cursor: uploadedFile ? 'pointer' : 'not-allowed',
                    opacity: uploadedFile ? 1 : 0.5,
                }}
            >
                Next
            </button>
        </div>
    );
}

export default UploadStep;
