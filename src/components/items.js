import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Table, Space} from 'antd';
import ItemModal from "./itemModal"
import axios from "axios";
const columns = [
    {
        title: 'الاسم',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'طوله',
        dataIndex: 'length',
        key: 'length',
    },
    {
        title: 'العدد',
        dataIndex: 'stock_qty',
        key: 'stock_qty',
    },
    {
        title: 'الوزن', ///////???
        key: 'weight',
        dataIndex: 'weight'
    },
    {
        title: 'التكلفة',
        key: 'price',
        dataIndex: 'price'
    },
    {
        title: 'السعر',
        key: 'cost',
        dataIndex: 'cost'
    },
    {
        title: 'مكان التخزين',
        key: 'storage_loc',
        dataIndex: 'storage_loc'
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

export default class Item extends Component {

    constructor(props) {
        super(props);
        var handleUpdate = this.handleUpdate.bind(this);
        this.state = {
            data: []
        };
    }
    handleUpdate(newItem){
        this.setState(prevState=>({
            data: [newItem, ...prevState.data]
          }))
    }
    componentDidMount() {
        axios.get(`http://localhost:3005/item/all`)
            .then(res => {
                const data= res.data.map(item=>( {
                    key: item.id, ...item
                }));
                this.setState({ data: data });
                console.log(this.state.data);
            })
    }

    render() {
        const {data } = this.state;
        var handleUpdate = this.handleUpdate;
        return (
            <div>
                <ItemModal handleUpdate={handleUpdate.bind(this)}/>
                <Table columns={columns} dataSource={data} />
            </div>
        );
    }

}