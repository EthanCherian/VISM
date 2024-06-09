import React from 'react';
import { API_LINK } from "@/utils/constants";

interface FileGridProps {
    filePairs: Record<string, string | null>;      // MSCZ file name => BRF file name
    loading?: boolean;
}

const FileGrid: React.FC<FileGridProps> = ({ filePairs, loading }) => {
    const downloadAllFiles = async () => {
        const outputFiles = Object.values(filePairs).filter(value => value !== null);
        if (outputFiles.length === 0) {
            alert('No files to download!');
            return;
        }
        console.log("Downloading: " + outputFiles);
        
        try {
            const result = await fetch(API_LINK + '/download/multiple', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ filenames: outputFiles }),
            });
            // do the rest of ChatGPT's code here
            const blob = await result.blob();

            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'braille_files.zip';
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            // document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading files: ', error);
            return;
        }
    }

    return (
        <div className="flex flex-col container items-center justify-center w-1/2 mx-auto py-4 border bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600 rounded-lg shadow-sm">
            <h2 className="text-xl underline font-semibold mb-4">Processed Files</h2>
            <table className="w-2/3 text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-black dark:text-gray-200">
                    <tr>
                        <th className="py-3 px-6 w-1/3 border border-gray-400">MuseScore File Name</th>
                        <th className="py-3 px-6 w-1/3 border border-gray-400">Braille File Link
                            <button className="ml-10 p-1 border border-gray-800 dark:border-white bg-blue-500 hover:bg-blue-700 ease-in-out transition-colors rounded"
                                onClick={downloadAllFiles}>
                                Download All
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(filePairs).map(([inputFileName, outputPath], index) => (
                        <tr key={index} className="bg-white text-gray-800 dark:bg-gray-700 dark:text-white border-b">
                            <td className="py-4 px-6 border border-gray-400">{inputFileName}</td>
                            <td className="py-4 px-6 border border-gray-400">
                                {outputPath ? (
                                    <a href={`http://localhost:5000/download/${outputPath}`} download className="underline text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-200 transition duration-300 ease-in-out">
                                        Download Processed File
                                    </a>
                                ) : (
                                    loading ? "Converting..." : "Waiting to process..." 
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FileGrid;