import React from 'react';

interface FileGridProps {
    filePairs: Record<string, string>;      // MSCZ file name => BRF file name
}

const FileGrid: React.FC<FileGridProps> = ({ filePairs }) => {
    return (
        <div className="flex flex-col container items-center justify-center w-1/2 mx-auto py-4 border bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600 rounded-lg shadow-sm">
            <h2 className="text-xl underline font-semibold mb-4">Processed Files</h2>
            <table className="w-2/3 text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-black dark:text-gray-200">
                    <tr>
                        <th className="py-3 px-6 w-1/3 border border-gray-400">MuseScore File Name</th>
                        <th className="py-3 px-6 w-1/3 border border-gray-400">Braille File Link</th>
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
                                    "Waiting to process..."
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