
import { handleUpdateUserAction } from '@/actions';
import {
    Col,
    Form,
    Input,
    message,
    Modal,
    Row, Radio
} from 'antd';
import { useEffect } from 'react';

interface IProps {
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    dataUpdate: any;
    setDataUpdate: any;
}

const UpdateStudent = (props: IProps) => {

    const {
        isUpdateModalOpen, setIsUpdateModalOpen,
        dataUpdate, setDataUpdate
    } = props;

    const [form] = Form.useForm();

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                name: dataUpdate.name,
                age: dataUpdate.age,
                mark: dataUpdate.mark,
                city: dataUpdate.city,
                gender: dataUpdate.gender,
            })
        }
    }, [dataUpdate])

    const handleCloseUpdateModal = () => {
        form.resetFields()
        setIsUpdateModalOpen(false);
        setDataUpdate(null)
    }

    const onFinish = async (values: any) => {
        const { name, age, mark, city, gender } = values;
        if (dataUpdate) {
            const data = {
                id: dataUpdate.id,
                name, age, mark, city, gender
            }

            await handleUpdateUserAction(data)
            handleCloseUpdateModal();
            message.success("Cập nhật học sinh thành công")
        }
    };

    return (
        <Modal
            title="Cập nhật thông tin học sinh "
            open={isUpdateModalOpen}
            onOk={() => form.submit()}
            onCancel={() => handleCloseUpdateModal()}
            maskClosable={false}
        >
            <Form
                name="basic"
                onFinish={onFinish}
                layout="vertical"
                form={form}
            >
                <Row gutter={[15, 15]}>
                    <Col span={24} md={12}>
                        <Form.Item
                            label="Họ và tên"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Form.Item
                        label="Giới tính"
                        name="gender"
                        rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
                    >
                        <Radio.Group>
                            <Radio value="male"> Male </Radio>
                            <Radio value="female"> Female </Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Col span={24} md={12}>
                        <Form.Item
                            label="Tuổi"
                            name="age"
                            rules={[{ required: true, message: 'Vui lòng nhập tuổi' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                        <Form.Item
                            label="Điểm"
                            name="mark"
                            rules={[{ required: true, message: 'Vui lòng nhập điểm' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                        <Form.Item
                            label="Thành phố"
                            name="city"
                            rules={[{ required: true, message: 'Vui lòng nhập thành phố' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default UpdateStudent;