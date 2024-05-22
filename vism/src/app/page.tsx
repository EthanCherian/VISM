'use client';
import { useEffect } from "react";
import FileUploader from "@/components/file_upload";

const fetchData = async () => {
    const response = await fetch("http://localhost:5000/api/data");
    const data = await response.json();
    console.log(data);
};

const onFileUpload = async (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => {
        formData.append('files', file, file.name);      // append each uploaded file to request
    })

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

export default function Home() {
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
            <FileUploader onFileUpload={onFileUpload}/>
        </>
    );
}
