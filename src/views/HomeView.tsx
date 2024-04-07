import "./HomeView.css"
import { Helmet } from "react-helmet";
import logo from "../assets/Top.png";
import spinner from "../assets/spinner.svg";

import { useEffect, useState } from "react";

import axios from "axios";
import getEnv from "../utils/Env";

import { useNavigate } from "react-router-dom";

function HomeView() {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [time, setTime] = useState(0);

    useEffect(() => {
    
        setTime(0)
        const interval = setInterval(() => {
            setTime(time => time + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const pollStatus = (url: string) => {
        setLoading(true);
        axios.get(url)
            .then(response => {
                if (response.data.status === "done") {

                    navigate(`/done?file=${encodeURIComponent(response.data.output)}`);
                    
                } else {
                    setTimeout(() => pollStatus(url), 1000); // Poll again after 1 second
                }
            })
            .catch(error => {
                console.error(error);
            });
    };


    const sendRequest = (e: any) => {
        e.preventDefault()
        const input = document.querySelector(".github-repo-link") as HTMLInputElement;
        const url = input.value;
        const processUrl = `${getEnv('VITE_BACKEND_HOST')}/process?url=${encodeURIComponent(url)}`;
        
        setTime(0)
        axios.post(processUrl).then(() => {
            const statusUrl = `${getEnv('VITE_BACKEND_HOST')}/status?url=${encodeURIComponent(url)}`;
            pollStatus(statusUrl);
        }).catch(error => {
            console.error(error);
            const statusUrl = `${getEnv('VITE_BACKEND_HOST')}/status?url=${encodeURIComponent(url)}`;
            pollStatus(statusUrl);
        });
    };


    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <>
            {loading ? <>

                <div className="counter">{formatTime(time)}</div>

                <img src={spinner} />

            </> : <> <Helmet>
                <title>LegacyLifter</title>
            </Helmet>

                <form className="wrapper" onSubmit={e => sendRequest(e)}>
                    <img src={logo} className="logo" alt="Vite logo" />
                    <h1>LegacyLifter</h1>

                    <input className="github-repo-link text-center" type="text" placeholder="Enter Github Repo Link" />
                </form></>}
        </>

    );
}

export default HomeView;