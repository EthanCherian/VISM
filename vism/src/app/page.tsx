'use client';
import { useEffect } from "react";

const fetchData = async () => {
    const response = await fetch("http://localhost:5000/api/data");
    const data = await response.json();
    console.log(data);
};

export default function Home() {
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {/* <button onClick={fetchData}>Press Me!</button> */}
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
        </>
    );
}
