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
        <div className="flex flex-col items-center justify-center p-8 pb-5 border bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600 rounded-lg shadow-sm w-full md:w-1/2 lg:w-1/3 mx-auto">
            <p className="block pb-4 mb-2 text-lg underline font-medium text-gray-900 dark:text-white">
                Upload your files
            </p>
            <input
                type="file"
                multiple
                onChange={onFileChange}
                className="block w-80 mb-2 text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 cursor-pointer dark:text-white focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white"
            />
            <button
                onClick={onFileUpload}
                className="mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            >
                Upload
            </button>
        </div>
    );
};

export default FileUploader;