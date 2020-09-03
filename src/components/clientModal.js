import React, { useState } from 'react';
import 'antd/dist/antd.css';
import '../App.css';
import axios from "axios";
import { Button, Modal, Form, Input } from 'antd';

const ClientCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="عميل جديد"
      okText="اضافة"
      cancelText="الغاء"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
        label="الاسم"
        name="name"
        rules={[{ required: true, message: 'الرجاء ادخال الاسم '}]}
      >
        <Input />
      </Form.Item>
      
      <Form.Item
        label="رقم التليفون"
        name="phone"
        rules={[{ required: true , message: 'الرجاء ادخال رقم التليفون '}]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="المدينة"
        name="city"
        rules={[{ required: false}]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="العنوان"
        name="address"
        rules={[{ required: false}]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="نسبة الخصم "
        name="discount"
        rules={[{ required: false }]}
      >
        <Input placeholder="القيمة الافتراضية = 0  "/>
      </Form.Item>
      </Form>
    </Modal>
  );
};

const ClientModal = (props) => {
  const [visible, setVisible] = useState(false);

  const onCreate = values => {
    console.log('Received values of form: ', values);
    axios.post('http://localhost:3005/client/new', values)
    .then(response=> {
      console.log(response);
      props.handleUpdate(values);
    })
    .catch(error=>{
      console.log(error);
    });
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        اضافة عميل جديد
      </Button>
      <ClientCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default ClientModal;