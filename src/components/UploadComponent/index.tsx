import { PlusOutlined } from "@ant-design/icons";
import { Upload, UploadProps, UploadFile } from "antd";
import { customUpload } from "src/services/upload";
import { useState } from "react";
import { UploadType } from "src/types/upload";

interface UploadComponentType {
    component: UploadType | undefined
}

export default function UploadComponent({ component }: UploadComponentType) {
    const [fileList, setFileList] = useState<UploadFile[]>( component ? [
        {
          uid: component?.uid || '',
          name: component?.name || '',
          thumbUrl: component?.thumbUrl
        }
    ] : []);

    const onChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    
    return (
    <div className="flex flex-row flex-wrap">
        <div style={{ marginRight: 30, marginBottom: 5 }}>
            <Upload
            listType="picture-card"
            maxCount={1}
            fileList={fileList}
            onChange={onChange}
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
    )
}