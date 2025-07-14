export const uploadCSVData = async (file, mapping, account) => {
    // Send raw file, mappings and selected account to backend
    const formData = new FormData();
    formData.append('file', file);
    formData.append('mapping', JSON.stringify(mapping));
    formData.append('account', JSON .stringify(account));


    console.log('Sending data to backend:', {
        fileName: file.name,
        mapping: mapping,
        account: account
    });

    const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        // handle errors
        console.error('Upload failed');
        return;
    }

   return response;
};