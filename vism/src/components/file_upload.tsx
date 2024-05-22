import React, { useState } from 'react';

interface FileUploaderProps {
    onFileUpload: (files: File[]) => void;         // file upload handler
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload: handleUpload }) => {
    const [files, setFiles] = useState<File[]>([]);

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(Array.from(event.target.files));
        }
    };

    const onFileUpload = async () => {
        if (files.length > 0) {
            handleUpload(files);
        } else {
            alert("Please select some files.");
        }
    };

    return (
        <div>
            <input type="file" multiple onChange={onFileChange} />
            <button onClick={onFileUpload}>Upload</button>
        </div>
    );
};

export default FileUploader;