import React from 'react';

interface FileGridProps {
    filePairs: Record<string, string>;      // MSCZ file name => BRF file name
}

const FileGrid: React.FC<FileGridProps> = ({ filePairs }) => {
    return (
        <div>
            <h2>Uploaded Files</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th className="border border-black p-4">File Name</th>
                        <th className="border border-black p-4">Results</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(filePairs).map(([inputFileName, outputPath], index) => (
                        <tr key={index}>
                            <td className="border border-black p-4">{inputFileName}</td>
                            <td className="border border-black p-4">
                                {outputPath ? (
                                    <a href={`http://localhost:5000/download/${outputPath}`} download>{outputPath}</a>
                                ) : (
                                    "Press Convert!"
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