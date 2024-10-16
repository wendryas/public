import { Button, Form, Image, Input, notification, Typography, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { LoginParams } from "src/firebase/auth";
import { auth } from "src/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

export default function Login () {
  const navigate = useNavigate();
  const [form] = Form.useForm<LoginParams>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (fields: LoginParams) => {
      try {
          await form.validateFields();
          setIsLoading(true);
          await signInWithEmailAndPassword(auth, fields.email, fields.password);
    
          navigate("/dashboard");
        } catch (error: any) {
          if (error.code === 'auth/invalid-credential') {
            notification.error({
              message: 'Erro ao fazer login',
              description: 'E-mail ou senha inválidos.',
            });
          } else if (error.code === 'auth/too-many-requests') {
            notification.error({
              message: 'Erro ao fazer login',
              description: "Foram feitas muitas tentativas de login. Recupere sua senha clicando em 'Esqueci minha senha' ou tente novamente mais tarde.",
            });
          } else {
            notification.error({
              message: 'Erro ao fazer login',
              description: "Tente novamente mais tarde.",
            });
            console.error("Erro ao fazer login:", error)
          }
    
        } finally {
          setIsLoading(false);
        }
    }

    return (
      <main className="bg-primary flex items-center flex-col h-screen justify-center">
        {isLoading ? (
          <Spin fullscreen={true} indicator={ <LoadingOutlined style={{ fontSize: 48 }} /> } />
        ) : (
        <>
          <Image src={"/assets/logotipo-frisa.png"} width={200} preview={false} />
          <div className="flex bg-secundary rounded-2xl p-10 w-4/5 lg:w-2/5 justify-center items-center flex-col">
            <Typography.Title level={2}>Login</Typography.Title>
              <Form form={form} onFinish={onSubmit} layout="vertical" className="w-2/3">
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
                  rules={[{ required: true, message: 'Este campo é obrigatório!' }]}>
                    <div>
                      <Input type="password" placeholder="Senha"/>
                      <p className="text-xs mt-1 cursor-pointer" onClick={() => navigate('/forgot-password')}>Esqueci minha senha</p>
                    </div>
                  </Form.Item>
                  <Button type="primary" htmlType="submit" className="mt-3">Entrar</Button>
              </Form>
              <div className="text-xs mt-5 text-center">
                <span>Você não tem uma conta?
                  <br/>
                  <p onClick={() => navigate('/register')} className="text-blue-600 cursor-pointer">
                  Clique aqui para se cadastrar!
                  </p>
                </span>
              </div>
          </div>
        </>
        )}
      </main>
    )
}