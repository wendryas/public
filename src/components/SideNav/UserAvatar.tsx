import { MenuProps, Dropdown, Avatar, Modal, Form, Input, Spin, notification } from "antd"
import { UserOutlined, LoadingOutlined } from "@ant-design/icons"
import useUserStore from "src/stores/user"
import { useEffect, useState } from "react"
import UploadComponent from "../UploadComponent"
import { User } from "src/types/user"
import { updateUser } from "src/services/user"

export default function UserAvatar () {
  const { user, setUser } = useUserStore()
  const [modalUser, setModalUser] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<User>();

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

  useEffect(() => {
    form.setFieldsValue({
      name: user?.name
    })
  })

  const handleSubmit = async (fields: User) => {
    try {
      form.submit();
      await form.validateFields();
      setLoading(true);
      if (user?.id) {
        const userData = {
          ...fields,
          id: user.id
        }
        await updateUser(userData)
        setUser(userData)
      }
    } catch(error) {
      console.log("Erro:", error);
      notification.error({
        message: 'Erro ao editar perfil',
        description: 'Tente novamente mais tarde',
      });
    } finally {
        setLoading(false)
        setModalUser(false)
    }
  }
    
  return (
      <>
      {loading ? (
        <Spin fullscreen={true} indicator={ <LoadingOutlined style={{ fontSize: 48 }} /> } />
      ) : (
        <>
          <Dropdown menu={{ items }} arrow>
            <div>
              <Avatar size="small" icon={<UserOutlined/>} className="mr-2"></Avatar>
              <span>{user?.name.split(' ')[0]}</span>
            </div>
          </Dropdown>
          <Modal
          open={modalUser}
          onCancel={() => setModalUser(false)}
          cancelText={'Cancelar'}
          okText={'Salvar'}
          onOk={() => handleSubmit(form.getFieldsValue())}
          >
          <p className="text-primary font-bold text-lg border-b-2 border-primary mb-5">Editar Perfil</p>
              <Form
              className="flex"
              form={form}>
                <UploadComponent form={form} component={user?.upload} label=""/>
                <Form.Item
                className="w-full"
                layout="vertical"
                label="Nome:"
                name="name"
                rules={[{ required: true, message: 'Esse campo é obrigatório!' }]}>
                  <Input />
                </Form.Item>
              </Form>
          </Modal>
          <Modal open={modalPassword} onCancel={() => setModalPassword(false)} onOk={submitModalPassword}>
            <div>Senha</div>
          </Modal>
        </>
      )}
      </>
  )
}