import React, { useState } from 'react';

interface FileGridProps {
    inputFiles: File[];  // Array of uploaded files passed as props
    outputFiles?: File[];
}

const FileGrid: React.FC<FileGridProps> = ({ inputFiles }) => {
    return (
        <div>
            <h2>Uploaded Files</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px' }}>File Name</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Results</th>
                    </tr>
                </thead>
                <tbody>
                    {inputFiles.map((file, index) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{file.name}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>
                                {/* Placeholder for results */}
                                Results will go here
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FileGrid;