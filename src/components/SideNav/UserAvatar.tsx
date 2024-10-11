import { MenuProps, Dropdown, Avatar, Modal } from "antd"
import { UserOutlined } from "@ant-design/icons"
import useUserStore from "src/stores/user"
import { useState } from "react"
import UploadComponent from "../UploadComponent"

export default function UserAvatar () {
  const { user } = useUserStore()
  const [modalUser, setModalUser] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);

  const submitModalUser = () => {
    setModalUser(false);
  };
  const submitModalPassword = () => {
    setModalPassword(false);
  };

  const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <p onClick={() => setModalUser(true)}>
            Editar perfil
          </p>
        ),
      },
      {
        key: '2',
        label: (
          <p onClick={() => setModalPassword(true)}>
            Trocar senha
          </p>
        )
      }
  ]
    
  return (
      <>
        <Dropdown menu={{ items }} arrow>
          <div>
            <Avatar size="small" icon={<UserOutlined/>} className="mr-2"></Avatar>
            <span>{user?.name.split(' ')[0]}</span>
          </div>
        </Dropdown>
        <Modal open={modalUser} onCancel={() => setModalUser(false)} onOk={submitModalUser}>
          <UploadComponent component={user?.avatar} />
        </Modal>
        <Modal open={modalPassword} onCancel={() => setModalPassword(false)} onOk={submitModalPassword}>
          <div>Senha</div>
        </Modal>
      </>
  )
}