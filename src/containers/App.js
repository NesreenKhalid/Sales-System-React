import React from 'react';
import '../App.css';
// import MainContainer from "./MainContainer"
// import Nav from "./nav"
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Item from "../components/items";
import Client from "../components/clients"

const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" >
            <Menu.Item key="1">حسابك</Menu.Item>
            <Menu.Item key="2">تسجيل الدخول</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
              // console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              // console.log(collapsed, type);
            }}
          >
            {/* <div className="logo" /> */}
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to={"/items"}>
                  الاصناف
                  </Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                فاتورة
            </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                بيان اضافة
            </Menu.Item>
              <Menu.Item key="4" icon={<UserOutlined />}>
                التقارير
            </Menu.Item>
              <Menu.Item key="5" icon={<UserOutlined />}>
                <Link to={"/clients"}>
                  بيانات العملاء
                  </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ margin: '24px 16px 0' }}>

              <Switch>
                <Route path="/items" component={Item} />
                <Route path="/clients" component={Client} />
              </Switch>

            </Content>
            <Footer style={{ textAlign: 'center' }}>ERP System ... Author : Nesreen Khalid</Footer>
          </Layout>
        </Layout>
      </Layout>


    </Router>

  )
}

export default App;
