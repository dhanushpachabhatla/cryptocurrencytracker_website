import React from "react";
import Header from "../components/Common/Header";
import MainComponent from "../components/LandingPage/MainComponent";
import Footer from "../components/Common/Footer/footer";
import LoginComponent from "../components/LoginPage";
function Home() {
    return (
        <>
            <Header />
            <LoginComponent/>
            <Footer />
        </>
    );
}

export default Home;

