import { useEffect, useState } from 'react';
import { useWizard } from 'react-use-wizard';
import { useCSVWizard } from '../hooks/useCSVWizard';
import { usePapaParse } from 'react-papaparse';
import { uploadCSVData } from '../utils/uploadCSVData';

function ColumnMappingStep() {
    const { nextStep } = useWizard();
    const { uploadedFile, setColumnMapping, selectedAccount } = useCSVWizard(); // get uploadedFile from context
    const { readString } = usePapaParse(); // parse CSV content as a string.
    const [previewRows, setPreviewRows] = useState([]); // Store preview rows for the CSV file

    const [headers, setHeaders] = useState([]); // Store CSV headers extracted from the file
    const [mapping, setMapping] = useState({ // STores how the user maps the columns
        date: '',
        amount: '',
        memo: '',
        type: ''
    });

    // Minimum required fields for mapping
    const requiredFields = ['date', 'amount', 'memo', 'type'];

    // Enable next button only when all required fields are mapped
    const canProceed = requiredFields.every((field) => mapping[field]);

    // Parse file contents when component mounts
    useEffect(() => {
        if (!uploadedFile) return; // If uploaded file is somehow missing stop here

        const reader = new FileReader(); // Create a new FileReader instance to read the file

        reader.onload = ({ target }) => { // When the file is loaded, parse its content
            const fileContent = target.result;

            readString(fileContent, {
                header: true,
                preview: 3, // We just want the headers which are in the first row
                skipEmptyLines: true,
                complete: (results) => {
                    if (results.data.length > 0) {
                        const firstRow = results.data[0];
                        const cols = Object.keys(firstRow);
                        setHeaders(cols);
                        setPreviewRows(results.data); // Save preview rows
                    }
                },
            });
        };

        reader.readAsText(uploadedFile);
    }, [uploadedFile, readString]);

    // Render the column mapping UI when user makes changes
    const handleMappingChange = (field, value) => {
        const newMapping = {
            ...mapping,
            [field]: value,
        };
        setMapping(newMapping);
        setColumnMapping(newMapping); // Update context immediately
    };

    const handleNext = async () => {
        if (!canProceed) return;
        // Save mapping to context
        setColumnMapping(mapping);
        // upload the CSV data, mapping and selected account to the backend
        try {
            await uploadCSVData(uploadedFile, mapping, selectedAccount);
            nextStep(); // move to Step 4 after successful upload
        } catch (err) {
            console.error('Upload error:', err);
        }
    };

    return (
        <div>
            <h2>Step 3: Map Your Columns</h2>
            <div>
                {previewRows.length > 0 && (
                    <div style={{ marginBottom: '2rem' }}>
                        <h3>CSV Preview</h3>
                        <table border="1" cellPadding="5">
                            <thead>
                                <tr>
                                    {headers.map((header) => (
                                        <th key={header}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {previewRows.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {headers.map((header) => (
                                            <td key={header}>{row[header]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <h3>Please match your CSV headers to the system fields below.</h3>
                {['date', 'amount', 'memo', 'type'].map((field) => (
                    <div key={field} style={{ marginBottom: '1rem' }}>
                        <label htmlFor={field}>
                            {field.charAt(0).toUpperCase() + field.slice(1)}:
                        </label>
                        <select
                            id={field}
                            value={mapping[field]}
                            onChange={(e) => handleMappingChange(field, e.target.value)}
                        >
                            <option value="">-- Select a column --</option>
                            {headers.map((header) => (
                                <option key={header} value={header}>
                                    {header}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canProceed}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        cursor: canProceed ? 'pointer' : 'not-allowed',
                        opacity: canProceed ? 1 : 0.5,
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default ColumnMappingStep;
