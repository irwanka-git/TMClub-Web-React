import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from "react-router-dom";
import { Helmet } from 'react-helmet';
const TITLE = 'TMClub.';

const Layout = () => {
    return (
        <div>
            <Helmet>
                <title>{TITLE}</title> 
            </Helmet>
            <Navbar />
            <div className='text-slate-900 md:px-28  px-6 mt-12' >
                <Outlet />
            </div>
        </div>
    )
}

export default Layout