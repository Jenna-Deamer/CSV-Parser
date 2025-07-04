import { Wizard } from 'react-use-wizard';
import UploadStep from './UploadStep';
import { UploadProvider } from '../context/UploadContext';

function ImportWizard() {

    return (
        <UploadProvider>
            <Wizard>
                <UploadStep />
            </Wizard>
        </UploadProvider>
    )
}

            export default ImportWizard
