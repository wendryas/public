import { MenuProps, Dropdown, Avatar } from "antd"
import { UserOutlined } from "@ant-design/icons"
import useUserStore from "src/stores/user"
import { useState } from "react"
import ModalUser from "./ModalUser"
import ModalPassword from "./ModalPassword"

export default function UserAvatar () {
  const { user } = useUserStore()
  const [modalUser, setModalUser] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);

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
            <Avatar size="small" icon={ user?.upload?.name ? '' : <UserOutlined/>} src={user?.upload?.name ? <img src={user.upload.thumbUrl} /> : ''} className="mr-2"></Avatar>
            <span>{user?.name.split(' ')[0]}</span>
          </div>
        </Dropdown>
        <ModalUser open={modalUser} setModalUser={setModalUser} />
        <ModalPassword open={modalPassword} setModalPassword={setModalPassword} />
      </>
  )
}