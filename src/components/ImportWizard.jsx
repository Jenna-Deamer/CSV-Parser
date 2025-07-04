import { Wizard } from 'react-use-wizard';
import { CSVWizardProvider } from '../context/CSVWizardContext';
// Steps
import UploadStep from './UploadStep';
import AssignAccountStep from './AssignAccountStep';
import ColumnMappingStep from './ColumnMappingStep';

function ImportWizard() {

    return (
        <CSVWizardProvider>
            <Wizard>
                <UploadStep />
                <AssignAccountStep />
                <ColumnMappingStep />
            </Wizard>
        </CSVWizardProvider>
    )
}

export default ImportWizard
