import React, { useState } from 'react';
import 'antd/dist/antd.css';
import '../App.css';
import axios from "axios";
import { Button, Modal, Form, Input } from 'antd';

const ItemCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="صنف جديد"
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
        label="اسم الصنف"
        name="name"
        rules={[{ required: true, message: 'الرجاء ادخال اسم الصنف '}]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="الطول"
        name="length"
        rules={[{ required: true, message: 'الرجاء ادخال الطول'}]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="العدد"
        name="stock_qty"
        rules={[{ required: false}]}
      >
        <Input placeholder="القيمة الافتراضية = 0  "/>
      </Form.Item>
      <Form.Item
        label="الوزن"
        name="weight"
        rules={[{ required: true , message: 'الرجاء ادخال الوزن '}]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="التكلفة"
        name="cost"
        rules={[{ required: true, message:'الرجاء ادخال سعر التلكفة'}]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="السعر"
        name="price"
        rules={[{ required: true, message:'الرجاء اهال سعر الصنف'}]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="مكان التخزين"
        name="storage_loc"
        rules={[{ required: false }]}
      >
        <Input />
      </Form.Item>
      </Form>
    </Modal>
  );
};

const ItemModal = (props) => {
  const [visible, setVisible] = useState(false);

  const onCreate = values => {
    console.log('Received values of form: ', values);
    axios.post('http://localhost:3005/item/new', values)
    .then(function (response) {
      console.log(response);
      props.handleUpdate(values);
    })
    .catch(function (error) {
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
        اضافة صنف جديد
      </Button>
      <ItemCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default ItemModal;