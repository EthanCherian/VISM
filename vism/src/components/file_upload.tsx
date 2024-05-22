import React, { useState } from 'react';

interface FileUploaderProps {
    onFileUpload: (file: File) => void;         // file upload handler
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload: handleUpload }) => {
    const [file, setFile] = useState<File | null>(null);

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const onFileUpload = async () => {
        if (file) {
            handleUpload(file);
        } else {
            alert("Please select a file.");
        }
    };

    return (
        <div>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>Upload</button>
        </div>
    );
};

export default FileUploader;