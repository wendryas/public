import { MenuOutlined } from "@ant-design/icons"
import { useState } from 'react'
import SideNav from "../SideNav"

interface HeaderProps {
    title: string
}

export default function FeatureHeader ({title}: HeaderProps) {
    const [mobileSideNav, setMobileSideNav] = useState<boolean>(false);

    return (
        <div className="flex">
            <MenuOutlined className="flex lg:hidden text-primary ml-3" onClick={() => setMobileSideNav(!mobileSideNav)}/>
            <p className="text-xl text-primary border-b-2 border-primary w-full font-bold m-3">{title}</p>
            {mobileSideNav && (
                <div
                className="flex lg:hidden bg-black/10 fixed z-10 h-screen w-full"
                onClick={() => setMobileSideNav(!mobileSideNav)}>
                    <SideNav />
                </div>
            )}
        </div>
    )
}