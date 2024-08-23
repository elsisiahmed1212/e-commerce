import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";
function Layout() {
    return (
        <div className="main h-screen flex flex-col justify-between">
            <Navbar></Navbar>
                <div className="">
                    <Outlet></Outlet>
                </div>
            <Footer></Footer>
        </div>
    );
}

export default Layout;