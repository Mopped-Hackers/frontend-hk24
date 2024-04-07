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

    useEffect(() => {
        const input = document.querySelector(".github-repo-link");
        input?.addEventListener("input", (e) => {
            const value = (e.target as HTMLInputElement).value;
            console.log(value);
        });
    }, []);

    const pollStatus = (url: string) => {
        setLoading(true);
        axios.get(url)
            .then(response => {
                if (response.data.status === "done") {

                    navigate(`/done?file=${encodeURIComponent(response.data.output)}`);
                    
                } else {
                    setTimeout(() => pollStatus(url), 3000); // Poll again after 1 second
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


        axios.post(processUrl).then(() => {
            const statusUrl = `${getEnv('VITE_BACKEND_HOST')}/status/${encodeURIComponent(url)}`;
            pollStatus(statusUrl);
        });
    };


    return (
        <>
            {loading ? <>
                <img src={spinner} />
            </> : <> <Helmet>
                <title>Github Legacy Refactorer</title>
            </Helmet>

                <form className="wrapper" onSubmit={e => sendRequest(e)}>
                    <img src={logo} className="logo" alt="Vite logo" />
                    <h1>Your Github Repository Link</h1>

                    <h2>Host: {getEnv('VITE_BACKEND_HOST')}</h2>

                    <input className="github-repo-link" type="text" placeholder="Github repository link" />
                </form></>}
        </>

    );
}

export default HomeView;