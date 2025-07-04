import { useWizard } from 'react-use-wizard';
import { useUpload } from '../hooks/useUpload';

function AssignAccountStep() {
    const { nextStep } = useWizard();
    const { uploadedFile, selectedAccount, setSelectedAccount } = useUpload(); // Get uploadedFile & account state
    
    // mock list of accounts
    const listOfAccounts = [
        'Tangerine Savings',
        'Tangerine Chequing',
        'Tangerine Credit Card',
        'Wealthsimple Cash',
    ];

    // Handle account selection
    const handleAccountChange = (e) => {
        setSelectedAccount(e.target.value);
    };

    // Handle next step - ensure account is saved to context
    const handleNext = () => {
        nextStep();
    };

    // Enable next only if file is uploaded and account is selected
    const canProceed = uploadedFile && selectedAccount;
    return (
        <div>
            <h2>Step 2: Assign file to a financial account</h2>
            <select value={selectedAccount || ''} onChange={handleAccountChange}>
                <option value="">Select an account...</option>
                {listOfAccounts.map((account, index) => (
                    <option key={index} value={account}>
                        {account}
                    </option>
                ))}
            </select>

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


    );
}

export default AssignAccountStep;
