import { Image, Avatar } from "antd";
import {
    HomeFilled,
    RightOutlined,
    NotificationOutlined,
    BarsOutlined,
    BarChartOutlined,
    FormOutlined,
    UserOutlined,
    LogoutOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { auth } from "src/config/firebase";
import { useEffect, useState } from "react";
import useUserStore from "src/stores/user";

export default function SideNav () {
    const navigate = useNavigate()
    const [isOnline, setIsOnline] = useState(false)
    const { user } = useUserStore()

    useEffect(() => {
        setIsOnline(true)
    }, [])

    function handleLogOut() {
        auth.signOut();
        navigate('/login')
    }

    const menuItems = [
        {
            Icon: HomeFilled,
            label: 'Home',
            action: () => navigate('/dashboard')
        },
        {
            Icon: FormOutlined,
            label: 'Cadastrar Devolução',
            action: () => console.log('cadastro')
        },
        {
            Icon: BarsOutlined,
            label: 'Listar Devoluções',
            action: () => console.log('lista')
        },
        {
            Icon: BarChartOutlined,
            label: 'Relatórios',
            action: () => console.log('relatorio')
        },
        {
            Icon: NotificationOutlined,
            label: 'Notificações',
            action: () => console.log('notificacao')
        },
    ]
    return (
        <div className="flex bg-primary flex-col h-full p-3 justify-between">
            <div className="w-full flex flex-col gap-4">
                <Image src={"/assets/logotipo-frisa.png"} width={200} preview={false} />
                {menuItems.map((item, index) => {
                    return (
                        <div className="flex cursor-pointer text-white" onClick={() => item.action} key={index}>
                            <item.Icon />
                            <span className="w-[80%] m-2">{item.label}</span>
                            <RightOutlined className="text-sm"/>
                            </div>
                    )
                })}
            </div>
            <div className="flex text-white flex-col w-full">
                <div className="flex mb-2">
                    <div className="w-[150px]">
                        <Avatar size="small" icon={<UserOutlined/>} className="mr-2"></Avatar>
                        <span>{user?.name.split(' ')[0]}</span>
                    </div>
                    <div className="cursor-pointer text-gray-900" onClick={() => handleLogOut()}>
                        <span className="mr-2">Sair</span>
                        <LogoutOutlined/>
                    </div>
                </div>
                <div style={{ display: 'flex'}}>
                    <div className={`h-4 w-4 rounded-full self-center ml-1 mr-2 ${isOnline ? 'bg-green-700' : 'bg-[#0000004d]'}`}/>
                    <span>{isOnline ? 'Online' : 'Offline'}</span>
                </div>
            </div>
        </div>
    )
}