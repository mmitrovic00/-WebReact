import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";

function Home() {

    var element = (
        <>
            <Header />
            <Outlet />
        </>
    )

    return element;
}

export default Home;