import { MenuProps, Dropdown, Avatar, Modal, Form, Input, Spin, notification } from "antd"
import { UserOutlined, LoadingOutlined } from "@ant-design/icons"
import useUserStore from "src/stores/user"
import { useEffect, useState } from "react"
import UploadComponent from "../UploadComponent"
import { User } from "src/types/user"
import { updateUser } from "src/services/user"
import { changePassword } from "src/firebase/auth"
import useAuthStore from "src/stores/auth"

interface FormPassword {
  currPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function UserAvatar () {
  const { user, setUser } = useUserStore()
  const [modalUser, setModalUser] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formUser] = Form.useForm<User>();
  const [formPassword] = Form.useForm<FormPassword>();
  const { login } = useAuthStore();

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
    formUser.setFieldsValue({
      name: user?.name
    })
    formPassword.setFieldsValue({
      currPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  })

  const submitModalUser = async (fields: User) => {
    try {
      formUser.submit();
      await formUser.validateFields();
      setLoading(true);
      if (user?.id) {
        const userData = {
          ...fields,
          upload: fields.upload ? fields.upload : {
            name: '',
            uid: '',
            thumbUrl: ''
          },
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
      setLoading(false)
    } finally {
        setLoading(false)
        setModalUser(false)
    }
  }

  const submitModalPassword = async (fields: FormPassword) => {
    try {
      formPassword.submit();
      await formPassword.validateFields();
      setLoading(true);
      if (user) {
        await changePassword(fields);
        await login({ email: user.email, password: fields.newPassword });
        notification.success({
          message: 'Senha alterada com sucesso!'
        });
        setModalPassword(false);
      }
    } catch(error: any) {
      if (error.code === 'auth/invalid-credential') {
        notification.error({
          message: 'Erro ao trocar senha',
          description: 'Senha atual incorreta',
        });
      } else if (!error.code) {
        console.log('Erro:', error)
      } else {
        notification.error({
          message: 'Erro ao trocar senha',
          description: 'Tente novamente mais tarde',
        });
      }
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
              <Avatar size="small" icon={ user?.upload?.name ? '' : <UserOutlined/>} src={user?.upload?.name ? <img src={user.upload.thumbUrl} /> : ''} className="mr-2"></Avatar>
              <span>{user?.name.split(' ')[0]}</span>
            </div>
          </Dropdown>
          <Modal
          open={modalUser}
          onCancel={() => setModalUser(false)}
          cancelText={'Cancelar'}
          okText={'Salvar'}
          onOk={() => submitModalUser(formUser.getFieldsValue())}
          >
          <p className="text-primary font-bold text-lg border-b-2 border-primary mb-5">Editar Perfil</p>
              <Form
              className="flex"
              form={formUser}>
                <UploadComponent form={formUser} component={user?.upload} label=""/>
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
          <Modal
          open={modalPassword}
          onCancel={() => setModalPassword(false)}
          cancelText={'Cancelar'}
          okText={'Salvar'}
          onOk={() => submitModalPassword(formPassword.getFieldsValue())}>
            <p className="text-primary font-bold text-lg border-b-2 border-primary mb-5">Trocar Senha</p>
              <Form
              layout="vertical"
              form={formPassword}>
                <Form.Item
                className="w-full"
                layout="vertical"
                label="Senha Atual:"
                name="currPassword"
                rules={[
                  { required: true, message: 'Esse campo é obrigatório!' }
                ]}>
                  <Input type="password" placeholder="Senha atual" />
                </Form.Item>
                <Form.Item
                className="w-full"
                layout="vertical"
                label="Nova Senha:"
                name="newPassword"
                rules={[
                  { required: true, message: 'Esse campo é obrigatório!' },
                  { min: 6, message: 'Sua senha deve ter pelo menos 6 caracteres'}
                ]}>
                  <Input type="password" placeholder="Nova senha" />
                </Form.Item>
                <Form.Item
                className="w-full"
                layout="vertical"
                label="Confirmar Senha:"
                name="confirmPassword"
                rules={[
                  { required: true, message: 'Este campo é obrigatório!' },
                  ({ getFieldValue }) => ({
                      validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                      }
                      return Promise.reject(new Error('As senhas não coincidem!'));
                      },
                  })
              ]}>
                  <Input type="password" placeholder="Repita a senha" />
                </Form.Item>
              </Form>
          </Modal>
        </>
      )}
      </>
  )
}