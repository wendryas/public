import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  verifyPassworRecoveryCode,
  resetPassword,
} from "src/firebase/auth";
import { Button, Form, Input, Spin, Image } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import useAuthStore from "src/stores/auth";

interface RecoverPasswordFields {
  password: string;
  passwordConfirmation: string;
}

const RecoverPassword = () => {
  const [form] = Form.useForm<RecoverPasswordFields>();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(useLocation().search);
  const code = queryParams.get("oobCode") as string;

  useEffect(() => {
    async function checkCodeValidation() {
      try {
        const userEmail = await verifyPassworRecoveryCode(code);
        setEmail(userEmail);
      } catch (error) {
        alert("O link de redefinição expirou! Tente utilizar outro link.");
      }
    }

    checkCodeValidation();
  }, []);

  const onSubmit = async (params: RecoverPasswordFields) => {
    try {
      setIsLoading(true);
      await form.validateFields();
      await resetPassword(code, params.password);
      await login({ email, password: params.password });

      return navigate("/");
    } catch (error) {
      alert("Ocorreu um erro. Tente recuperar sua senha novamente");
      console.log("Erro ao recuperar senha:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-primary flex items-center flex-col h-screen justify-center">
        {isLoading ? (
          <Spin fullscreen={true} indicator={ <LoadingOutlined style={{ fontSize: 48 }} /> } />
        ) : (
        <>
          <Image src={"/assets/logotipo-frisa.png"} width={200} preview={false} />
          <div className="flex bg-secundary rounded-2xl p-10 w-4/5 lg:w-2/5 justify-center items-center flex-col">
          <h1 className="font-semibold text-3xl">Nova Senha</h1>
            <span className="text-xs mb-2">Digite sua nova senha e confirme para acessar novamente o sistema</span>
              <Form form={form} onFinish={onSubmit} layout="vertical" className="w-2/3">
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
                  name="confirmPassword"
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
                      <Input type="password" placeholder="Confirme sua senha"/>
                  </Form.Item>
                  <Button type="primary" htmlType="submit" className="mt-3">Entrar</Button>
              </Form>
          </div>
        </>
        )}
      </main>
  );
};

export default RecoverPassword;
