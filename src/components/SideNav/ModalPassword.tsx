import { Modal, Form, notification, Input, Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import useAuthStore from "src/stores/auth";
import useUserStore from "src/stores/user";
import { changePassword } from "src/firebase/auth";

interface ModalPasswordProps {
    open: boolean;
    setModalPassword: (open: boolean) => void;
}

interface FormPassword {
    currPassword: string;
    newPassword: string;
    confirmPassword: string;
  }

export default function ModalPassword ({ open, setModalPassword}: ModalPasswordProps) {
    const [loading, setLoading] = useState(false);
    const [formPassword] = Form.useForm<FormPassword>();
    const { login } = useAuthStore();
    const { user } = useUserStore()

    useEffect(() => {
        formPassword.setFieldsValue({
          currPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
    })

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
            setModalPassword(false)
        }
    }

    return (
        <>
        { loading ? (
            <Spin fullscreen={true} indicator={ <LoadingOutlined style={{ fontSize: 48 }} /> } />
        ) : (
            <Modal
          open={open}
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
        )}
        </>
    )
}