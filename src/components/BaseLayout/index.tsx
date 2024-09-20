import SideNav from "../SideNav";
import { Outlet } from "react-router-dom";

export default function BaseLayout () {
    return (
        <>
            <div className="w-full min-h-screen h-full flex flex-col bg-bgDefault">
                <div className="flex flex-grow overflow-hidden">
                    <div className="flex">
                        <SideNav />
                    </div>
                    <div className="flex-grow overflow-auto px-4 pt-6">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}