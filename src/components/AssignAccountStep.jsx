import { useWizard } from 'react-use-wizard';
import { useCSVWizard } from '../hooks/useCSVWizard';
import { listOfAccounts } from '../data/mockAccounts';

function AssignAccountStep() {
    const { nextStep } = useWizard();
    const { uploadedFile, selectedAccount, setSelectedAccount } = useCSVWizard(); // Get uploadedFile & account state

    // Filter out archived accounts & cash (physical wallets)
    const filteredAccounts = listOfAccounts.filter(account => !account.isArchived && account.accountType !== 'Cash');

    // Handle when the user changes account in UI
    const handleAccountChange = (e) => {
        // Parse the selected account ID from the event target value
        const accountId = parseInt(e.target.value);
        const account = filteredAccounts.find(acc => acc.id === accountId);
        setSelectedAccount(account);
        console.log('Selected account:', account);
    };

    const handleNext = () => {
        nextStep();
    };

    // Enable next only if file is uploaded and account is selected
    const canProceed = uploadedFile && selectedAccount;
    return (
        <div>
            <h2>Step 2: Assign file to a financial account</h2>
            <select value={selectedAccount?.id || ''} onChange={handleAccountChange}>
                <option value="">Select an account...</option>
                {filteredAccounts.map((account) => (
                    <option key={account.id} value={account.id}>
                        {account.name} ({account.institution})
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
