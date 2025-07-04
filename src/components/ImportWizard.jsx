import { Wizard } from 'react-use-wizard';
import UploadStep from './UploadStep';
import { CSVWizardProvider } from '../context/CSVWizardContext';
import AssignAccountStep from './AssignAccountStep';

function ImportWizard() {

    return (
        <CSVWizardProvider>
            <Wizard>
                <UploadStep />
                <AssignAccountStep />
            </Wizard>
        </CSVWizardProvider>
    )
}

            export default ImportWizard
