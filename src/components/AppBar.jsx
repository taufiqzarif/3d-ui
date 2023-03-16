import React, { useState } from 'react';
import { Layout, Typography, Space, Divider, Col, Image } from 'antd';
import SearchBar from "./SearchBar";
import "antd/dist/antd.css";
import "../App.css";

const { Header} = Layout;


const AppBar = () => {
    return(
    <Layout style={{backgroundColor:'#faad14'}}>
      <Header style={{backgroundColor:'#faad14', marginLeft:-35,marginTop:-5}}>
      <Image src="../assets/curtin logo.png" style={{marginLeft: -15 }}/>
      <div style={{ float:'right', marginRight: -20}}>
      <Col>
      <SearchBar/>
      <Space split={<Divider type="vertical" />} style={{color:"white"}}>
      <a href="https://about.curtin.edu.my/about-us/contact/" target="_blank" rel="noopener noreferrer"><Typography.Link style={{color:"black", fontWeight:'bold', fontSize:16}}>Contact Us </Typography.Link></a>
      </Space>
      </Col>
      </div>
      </Header>
    </Layout>
    );
    }
    
export default AppBar;
