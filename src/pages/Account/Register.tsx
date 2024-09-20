import { Button, Form, Image, Input, Typography, Spin, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "src/config/firebase";
import { updateProfile } from "firebase/auth";
import { LoadingOutlined } from "@ant-design/icons";

interface RegisterForm {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }

export default function Register () {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const [form] = Form.useForm<RegisterForm>();

    const onSubmit = async (fields: RegisterForm) => {
        setIsLoading(true);
        try {
            await form.validateFields();
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                fields.email,
                fields.password
            );
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: fields.name,
            });

            navigate("/dashboard")
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                notification.error({
                  message: 'Erro ao fazer cadastro',
                  description: 'Já existe um usuário com este e-mail',
                });
            } else {
                console.log('Erro ao fazer cadastro:', error)
                notification.error({
                    message: 'Houve um erro inesperado',
                    description: 'Tente novamente mais tarde',
                });
            }
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <main className="bg-primary flex items-center flex-col h-full justify-center">
            {isLoading ? (
                <Spin fullscreen={true} indicator={ <LoadingOutlined style={{ fontSize: 48 }} /> } />
            ) : (
                <>
                    <Image src={"src/assets/logotipo-frisa.png"} width={180} preview={false} />
                    <div className="flex bg-secundary rounded-2xl p-10 w-4/5 lg:w-2/5 justify-center items-center flex-col">
                        <Typography.Title level={2}>Cadastre-se</Typography.Title>
                        <Form form={form} onFinish={onSubmit} layout="vertical" className="w-2/3">
                            <Form.Item
                            label="Nome"
                            name="name"
                            rules={[
                                { required: true, message: 'Este campo é obrigatório!' }
                                ]}>
                                    <Input placeholder="Nome" />
                            </Form.Item>
                            <Form.Item
                            label="E-mail"
                            name="email"
                            rules={[
                                { required: true, message: 'Este campo é obrigatório!' },
                                { type: 'email', message: 'Formato de e-mail inválido.'}
                                ]}>
                                    <Input placeholder="E-mail" />
                            </Form.Item>
                            <Form.Item
                            label="Senha"
                            name="password"
                            rules={[
                                { required: true, message: 'Este campo é obrigatório!' },
                                { min: 6, message: 'Sua senha deve ter pelo menos 6 caracteres'}
                                ]}>
                                    <Input type="password" placeholder="Senha"/>
                            </Form.Item>
                            <Form.Item
                            label="Confirme sua senha"
                            name="confirm_password"
                            rules={[
                                { required: true, message: 'Este campo é obrigatório!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('As senhas não coincidem!'));
                                    },
                                })
                            ]}>
                                    <Input type="password" placeholder="Senha"/>
                            </Form.Item>
                            <div className="flex gap-2">
                                <Button type="primary" htmlType="submit" className="w-1/2">Cadastrar</Button>
                                <Button onClick={() => navigate('/login')} className="w-1/2">Cancelar</Button>
                            </div>
                        </Form>
                    </div>
                </>
              )}
        </main>
    )
}