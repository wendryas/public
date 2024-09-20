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

export default function SideNav () {
    const navigate = useNavigate()

    function handleLogOut() {
        console.log('logout')
        navigate('/login')
      }

    const menuItems = [
        {
            Icon: HomeFilled,
            label: 'Home',
            action: () => console.log('home')
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
        <div style={{ backgroundColor: '#B1101E', display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100%', padding: 10}}>
                <Image src={"src/assets/logotipo-frisa.png"} width={200} preview={false} />
                <div style={{ width: '100%', height: '80%'}}>
                {menuItems.map(item => {
                    return (
                        <div style={{ display: 'flex', color: 'white', padding: 5, fontSize: 14}} onClick={() => item.action}>
                            <item.Icon />
                            <span style={{width: '90%', margin: 10}}>{item.label}</span>
                            <RightOutlined />
                         </div>
                    )
                })}
                </div>
                <div style={{ color: 'white', display: 'flex', flexDirection: 'column', width: '100%', fontSize: 14}}>
                    <div style={{ marginBottom: 5, display: 'flex'}}>
                        <div style={{ width: 150}}>
                            <UserOutlined  style={{ marginRight: 10}} />
                            <span>Usuário</span>
                        </div>
                        <div style={{ color: 'black'}}>
                            <span style={{ marginRight: 10}} onClick={() => handleLogOut}>sair</span>
                            <LogoutOutlined onClick={() => handleLogOut} />
                        </div>
                    </div>
                    <div style={{ display: 'flex'}}>
                        <div style={{ width: 10, height: 10, backgroundColor: 'green', borderRadius: '100%', marginRight: 10, alignSelf: 'center'}}></div>
                        <span>Online</span>
                    </div>
                </div>
        </div>
    )
}