import { Button, Form, Image, Input, Typography } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useState } from "react";
import { sendPasswordRecoveryEmail } from "src/firebase/auth";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword () {
    const { Title } = Typography;
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [form] = Form.useForm<{ email: string; }>();
    const navigate = useNavigate()

    const onSubmit = async ({ email }: { email: string; }) => {
        try {
          await form.validateFields();
          await sendPasswordRecoveryEmail(email);
          setIsEmailSent(true);
        } catch (error) {
          alert('Ocorreu um erro. Acesse o console para mais detalhes');
          console.log('Erro ao enviar e-mail:', error);
        }
    }

    return (
        <main className="bg-primary flex items-center flex-col h-screen justify-center">
            <Image src={"/assets/logotipo-frisa.png"} width={200} preview={false} />
            <div className="flex bg-secundary rounded-2xl p-10 w-4/5 lg:w-2/5 justify-center items-center flex-col">
            <Title level={2}>Esqueci a senha</Title>
            { isEmailSent ? (
                <div className="flex w-3/4 flex-col items-center">
                    <p className="text-center">
                    <CheckOutlined className="text-xl"/> Um e-mail foi enviado para {form.getFieldValue('email')}
                    <br/>
                    <br/>
                    Verifique se há um e-mail da empresa e clique no link incluído para redefinir sua senha.
                    </p>
                    <Button type="primary" className="mt-3 w-1/2" onClick={() => navigate('/login')}>Voltar para login</Button>
                </div>
            ) : (
                <>
                    <p className="text-sm text-center w-2/3 mb-5">Digite seu endereço de e-mail e enviaremos um e-mail com instruções para redefinir sua senha</p>
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
                        <div className="flex gap-2">
                            <Button type="primary" htmlType="submit" className="w-1/2">Enviar</Button>
                            <Button className="w-1/2" onClick={() => navigate('/login')}>Cancelar</Button>
                        </div>
                    </Form>
                </>
            )}
                
            </div>
        </main>
    )
}