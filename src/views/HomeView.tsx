import "./HomeView.css"
import {Helmet} from "react-helmet";
import logo from "../assets/Top.png";
function HomeView() {

    return (
        <>
            <Helmet>
                <title>Github Legacy Refactorer</title>
            </Helmet>
            <div className="wrapper">
                <img src={logo} className="logo" alt="Vite logo"/>
                <h1>Your Github Repository Link</h1>
                <input className="github-repo-link" type="text" placeholder="Github repository link"/>
            </div>
        </>

    );
}

export default HomeView;