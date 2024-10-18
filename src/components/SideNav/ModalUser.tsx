import { Modal, Form, notification, Input, Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons";
import UploadComponent from "../UploadComponent"
import { User } from "src/types/user";
import useUserStore from "src/stores/user";
import { updateUser } from "src/services/user";
import { useEffect, useState } from "react";

interface ModalUserProps {
    open: boolean;
    setModalUser: (open: boolean) => void;
}

export default function ModalUser ({ open, setModalUser}: ModalUserProps) {
    const [formUser] = Form.useForm<User>();
    const { user, setUser } = useUserStore()
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        formUser.setFieldsValue({
          name: user?.name
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
                name: user?.upload?.name || '',
                uid: user?.upload?.uid || '',
                thumbUrl: user?.upload?.thumbUrl || ''
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
                description: 'Tente nosvamente mais tarde',
            });
            setLoading(false)
        } finally {
            setLoading(false)
            setModalUser(false)
        }
    }

    return (
        <>
        { loading ? (
            <Spin fullscreen={true} indicator={ <LoadingOutlined style={{ fontSize: 48 }} /> } />
        ) : (
            <Modal
            open={open}
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
        )}
        </>
    )
}