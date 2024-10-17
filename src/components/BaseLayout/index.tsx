import useUserStore from "src/stores/user";
import SideNav from "../SideNav";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function BaseLayout () {
    const { user } = useUserStore()
    const [ isLoading, setIsLoading ] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        if (user) setIsLoading(false)
    }, [user])

    return (
        <>
            <div className="w-full min-h-screen h-full flex flex-col bg-bgDefault">
                { isLoading ? (
                    <Spin fullscreen={true} indicator={ <LoadingOutlined style={{ fontSize: 48 }} /> } />
                ) : (
                    <div className="flex flex-grow overflow-hidden">
                        <div className="hidden lg:flex">
                            <SideNav />
                        </div>
                        <div className="flex-grow overflow-auto">
                            <Outlet />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}