import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
import Col from "antd/es/grid/col";
import Row from "antd/es/grid/row";
import { Table, Divider, Tag } from 'antd';
import './MovieList.css';
import Dropdown from "antd/es/dropdown/dropdown";

let array;
let array2=[];
class MovieList extends Component {
    constructor() {
        super();
        this.state={
            myList:[]
        }
    }
    componentWillMount() {
        let data = this.props.location.state;
        if (data['loginSuccess'] === true) {
            fetch('http://localhost:8081/movieList',
                {
                    method: "GET"
                }
            ).then(response => {
                    response.json().then(resp => {
                        console.log(resp);
                        array = resp;
                        array2=[];
                        for (let i = 0; i < resp.length; ++i) {
                            let temp = {
                                key:i,
                                play: 'play',
                                link: resp[i]
                            };
                            array2.push(temp);
                        }
                        this.setState({myList:array2});
                    })
                }
            )
        } else {
            this.props.history.push("/");
        }
    }
    handleClick=(value)=>{
        console.log(value);
        let path= {
            pathname: '/playVideo',
            videoName: value
        }
        console.log(value);
        this.props.history.push(path);
    }
    render(){
        const { Header, Content, Footer } = Layout;
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer">退出</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer">会员中心</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer">充值</a>
                </Menu.Item>
            </Menu>
        );
        const columns=[{
            title:"点击播放",
            dataIndex:'play',
            key:'play',
        },
            {
                title:"链接地址",
                dataIndex:"link",
                key:'link',
                render: text => <a href="javascript:;" onClick={()=>this.handleClick(text)}>{text}</a>,
            }]
        console.log(array2.length+7);
        return(
            <Layout>
                <Header className={'header'}>
           <Row>
               <Col span={5} offset={3}>
                   <h1>A good cat movie site</h1>
               </Col>
               <Col offset={18}>
                   <Dropdown overlay={menu}>
                       <a className={'dropDown'} href="#">
                           个人中心<Icon type="down"/>
                       </a>
                   </Dropdown>
               </Col>
           </Row>
                </Header>
                <Content className={'content'}>
                    <Row>
                        <Col span={12} offset={6}>
                         <Table dataSource={this.state.myList} pagination={{ pageSize: 7}}columns={columns} />
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }
}
export default MovieList;

