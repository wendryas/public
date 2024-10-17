import { PlusOutlined } from "@ant-design/icons";
import { Upload, UploadProps, UploadFile, Form } from "antd";
import { customUpload } from "src/services/upload";
import { useState } from "react";
import { UploadType } from "src/types/upload";

interface UploadComponentType {
    component: UploadType | undefined,
    form: any,
    label: string
}

export default function UploadComponent({ component, form, label }: UploadComponentType) {
    const [fileList, setFileList] = useState<UploadFile[]>( component?.thumbUrl ? [
        {
          uid: component?.uid || '',
          name: component?.name || '',
          thumbUrl: component?.thumbUrl
        }
    ] : []);

    const onChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
        setFileList(newFileList);
        if (newFileList[0]?.status === "done") {
            form.setFieldValue('upload', {
              name: fileList[0]?.name || '',
              uid: fileList[0]?.uid || '',
              thumbUrl: fileList[0]?.thumbUrl
            })
        }
    };

    const onRemove: UploadProps['onRemove'] = async () => {
        form.setFieldValue('upload', '')
    };
    
    return (
        <Form.Item
        name="upload"
        label={label}
        >
            <div className="flex flex-row flex-wrap">
                <div style={{ marginRight: 30, marginBottom: 5 }}>
                    <Upload
                    listType="picture-card"
                    maxCount={1}
                    fileList={fileList}
                    onChange={onChange}
                    onRemove={onRemove}
                    customRequest={customUpload}
                    showUploadList={{showPreviewIcon: false}}
                    >
                        {!fileList.length && (
                        <button style={{ border: 0, background: 'none' }} type="button">
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </button>
                        )}
                    </Upload>
                </div>
            </div>
    </Form.Item>
    )
}