import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import HeaderDash from "./HeaderDash";

function Dashboard() {

    var element = (
        <>
            <HeaderDash />
            <Outlet />
        </>
    )

    return element;
}

export default Dashboard;