'use client';
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center my-6">
            <p className="text-3xl underline font-bold mb-8">
                Welcome to Visually Impaired Sheet Music!
            </p>

            <Image src={"/images/VISM_logo.png"} alt={"VISM Logo"} width={512} height={512}/>

            <p className="text-lg italic mt-3 mb-7">
                Also known as VISM
            </p>

            <div className="flex flex-col justify-center my-4 text-lg text-center w-1/2">
                <p className="my-3">
                    This is an application designed for users to create and learn about braille sheet music.
                </p>

                <p className="my-3">
                    VISM was started as a hackathon project for <Link className="text-blue-600 hover:text-blue-300" href={"https://devpost.com/software/vism"}>HowdyHack 2021</Link>, where our team of relative beginners was fortunate enough to place second.
                    In fact, the logo you see above was created during the hackathon!
                </p>

                <p className="my-3">
                    Despite our nominal success, the application needed improvements, which we lacked the skills to implement at the time. 
                    It was a functional prototype and a good proof of concept, but the potential of the idea far exceeded our capabilities.
                </p>

                <p className="my-3 font-bold">
                    This is my attempt to make VISM the right way.
                </p>

                <p className="my-3 italic">
                    Use the navbar above to get started.
                </p>
            </div>
        </div>
    );
};