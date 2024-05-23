'use client';
import { useState } from "react";
import FileUploader from "@/components/file_upload";
import FileGrid from "@/components/file_grid";


export default function Home() {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [resultFiles, setResultFiles] = useState<File[]>([]);

    const onFileUpload = async (files: File[]) => {
        setUploadedFiles(prevFiles => [...prevFiles, ...files]);

        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file, file.name);      // append each uploaded file to request
        });
    
        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            console.log(result);
            alert(result.message);
        } catch (error) {
            console.error('Error:', error);
            alert('Error uploading file');
        }
    }

    const convertMSCZ = async (filenames: string[]) => {
        try {
            const response = await fetch('http://localhost:5000/convert/mscz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ filenames }),
            });
            const result = await response.json();
            console.log(result);
            // alert('Conversion successful');
        } catch (error) {
            console.error('Error: ', error);
            alert('Error converting MSCZ files');
        }

        // drop file extensions
        convertXML(filenames.map(filename => filename.split('.')[0]));
    }
    
    const convertXML = async (filenames: string[]) => {
        console.log("Converting MusicXML files...");
        try {
            const response = await fetch('http://localhost:5000/convert/xml', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ filenames }),
            });
            const result = await response.json();
            console.log(result);
            alert('Braille files made successfully!');
        } catch (error) {
            console.error('Error: ', error);
            alert('Error creating BRF files');
        }
    }

    return (
        <>
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
            <FileUploader onFileUpload={onFileUpload}/>
            <br/>
            <br/>
            <button onClick={() => convertMSCZ(uploadedFiles.map(file => file.name))}>Convert!</button>
            <br/>
            <br/>
            <FileGrid inputFiles={uploadedFiles}/>
        </>
    );
}
