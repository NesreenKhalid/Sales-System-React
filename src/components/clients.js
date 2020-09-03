import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Table, Space} from 'antd';
import axios from "axios";
import ClientModal from "./clientModal"
const columns = [
    {
        title: 'الاسم',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'رقم التليفون',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'العنوان',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'نسبة الخصم', ///////???
        key: 'discount',
        dataIndex: 'discount'
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a>حذف</a>
                <a>تعديل</a>
            </Space>
        ),
    },
];

export default class Client extends Component {

    constructor(props) {
        super(props);
        var handleUpdate = this.handleUpdate.bind(this);
        this.state = {
            data: []
        };
    }
    handleUpdate(newClient){
        this.setState(prevState=>({
            data: [newClient, ...prevState.data]
          }))
    }

    componentDidMount() {
        axios.get(`http://localhost:3005/client/all`)
            .then(res => {
                const data= res.data.map(client=>( {
                    key: client.id, ...client
                }));
                this.setState({ data: data });
                console.log(this.state.data);
            })
    }

    render() {
        const { data } = this.state;
        var handleUpdate = this.handleUpdate;
        return (
            <div>
                <ClientModal handleUpdate={handleUpdate.bind(this)}/>
                <Table columns={columns} dataSource={data} />
            </div>
        );
    }

}