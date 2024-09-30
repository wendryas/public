import { Image } from "antd";
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

export default function SideNav () {
    const navigate = useNavigate()

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
        <div className="bg-primary flex align-center flex-col h-full p-3">
                <Image src={"/assets/logotipo-frisa.png"} width={200} preview={false} />
                <div className="w-full h-[80%] flex flex-col gap-4">
                {menuItems.map(item => {
                    return (
                        <div className="flex cursor-pointer text-white" onClick={() => item.action}>
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
                            <UserOutlined className="mr-2" />
                            <span>Usuário</span>
                        </div>
                        <div className="cursor-pointer" onClick={() => handleLogOut()}>
                            <span className="mr-2" >sair</span>
                            <LogoutOutlined/>
                        </div>
                    </div>
                    <div style={{ display: 'flex'}}>
                        <div className="h-4 w-4 rounded-full self-center bg-green-700 mr-2"/>
                        <span>Online</span>
                    </div>
                </div>
        </div>
    )
}