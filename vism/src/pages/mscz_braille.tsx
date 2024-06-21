'use client';
import { useState } from "react";
import { API_LINK } from "@/utils/constants";
import FileUploader from "@/components/file_upload";
import FileGrid from "@/components/file_grid";

export default function Home() {
    const [fileMap, setFileMap] = useState<Record<string, string | null>>({});
    const [loading, setLoading] = useState<boolean>(false);

    const onFileUpload = async (files: File[]) => {
        setFileMap(prevMap => {
            const newEntries = files.reduce((acc, file) => {
                // Only add new entry if the file name does not exist in the previous map
                if (!prevMap.hasOwnProperty(file.name)) {
                    acc[file.name] = null;  // Set null result for each new uploaded file
                }
                return acc;
            }, {} as Record<string, string | null>);
    
            return { ...prevMap, ...newEntries };
        });

        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file, file.name);      // append each uploaded file to request
        });
    
        try {
            const response = await fetch(API_LINK + '/upload', {
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
        if (filenames.length === 0) {
            alert('Upload some files to convert!');
            return;
        }

        setLoading(true);
        // find any previously uploaded files and ignore
        filenames = filenames.filter((filename) => !fileMap[filename]);
        
        try {
            const response = await fetch(API_LINK + '/convert/mscz', {
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
        setLoading(true);
        // console.log("Converting MusicXML files...");
        try {
            const response = await fetch(API_LINK + '/convert/xml', {
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

        setLoading(false);
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="text-lg py-6">
                This page allows you to convert MuseScore (.mscz) files to Braille (.brf) files.
                <ul className="list-disc list-inside my-4">
                    <li className="px-5 mx-1">Upload your .mscz files</li>
                    <li className="px-5 mx-1">Press "Convert!"</li>
                    <li className="px-5 mx-1">Download resulting .brf files</li>
                </ul>
            </div>

            <FileUploader onFileUpload={onFileUpload}/>

            <button
                className={`${Object.keys(fileMap).length == 0 ? "cursor-not-allowed" : "cursor-pointer"} m-6 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110`}
                disabled={Object.keys(fileMap).length == 0 || loading} 
                onClick={() => convertMSCZ(Object.keys(fileMap))}
            >
                Convert!
            </button>

            <FileGrid filePairs={fileMap} loading={loading}/>
        </div>
    );
}
