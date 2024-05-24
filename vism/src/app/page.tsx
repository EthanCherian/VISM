'use client';
import { useState } from "react";
import FileUploader from "@/components/file_upload";
import FileGrid from "@/components/file_grid";


export default function Home() {
    const [fileMap, setFileMap] = useState<Record<string, string>>({});
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [resultNames, setResultNames] = useState<string[]>([]);

    const onFileUpload = async (files: File[]) => {
        const newEntries = files.reduce((acc, file) => {
            acc[file.name] = null;      // set null result for each uploaded file
            return acc;
        }, {} as Record<string, string | null>);
        setFileMap(prevMap => Object.assign({ ...prevMap, ...newEntries }));

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

            // isolate results that were successful
            const successfulResults = result.results.filter((item: {success: boolean}) => item.success);
            // isolate input and output filenames from these results
            let inputs: string[] = successfulResults.map((item: {filename: string}) => item.filename + ".mscz");      // re-add .mscz extension
            let outputs: string[] = successfulResults.map((item: {result: string}) => item.result.split('/')[1]);     // remove path
            setFileMap(prevMap => Object.assign({ ...prevMap, ...Object.fromEntries(inputs.map((key, index) => [key, outputs[index]])) }));
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
            {/* <button disabled={uploadedFiles.length == 0} onClick={() => convertMSCZ(uploadedFiles.map(file => file.name))}>Convert!</button> */}
            <button disabled={Object.keys(fileMap).length == 0} onClick={() => convertMSCZ(Object.keys(fileMap))}>Convert!</button>
            <br/>
            <br/>
            <FileGrid filePairs={fileMap}/>
        </>
    );
}
