import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
import Col from "antd/es/grid/col";
import Row from "antd/es/grid/row";
import './LoginForm.css';
import cats from "./static/cats.jpg";
let userInput;
class LoginForm extends Component{
    constructor(props){
        super();
        this.state={
            userId:'',
            userPwd:'',
            loginSuccess:false
        }
    }
    logInSubmit=(e)=> {
        e.preventDefault();
        new Promise((resolve,reject)=> {
            const data=this.props.form.getFieldsValue();
            let jsonObject={
                "userId":data['userId'],
                "userPwd":data['userPwd']
            }
            userInput={
                "userId":data['userId'],
                "userPwd":data['userPwd']
            }
            resolve(JSON.stringify(jsonObject));
        }).then(resp=> {
                fetch('http://localhost:8081/signIn',
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: resp
                    }
                ).then(response => {
                    console.log(response);
                    response.json().then(
                        data => {
                            console.log(data);
                            if(data===true){
                                this.setState({userId: userInput['userId']});
                                this.setState({userPwd:this.props.form.getFieldsValue()['userPwd']});
                                this.setState({loginSuccess:true});
                                let path1={
                                    pathname:'/movieList',
                                    state:{'loginSuccess':true}
                                };
                                this.props.history.push(path1);
                            }
                        }
                    )
                });
            }
        );
    }
    render(){
        const { getFieldDecorator} = this.props.form;
        const { Header, Content, Footer } = Layout;
        return(
            <Layout>
                <Header className={'header'}>
                    <Row className={'login'}>
                        <Col span={5}>
                            <p>This is a simple movie website</p>
                        </Col>
                        <Col span={12} offset={7}>
            <Form layout="inline" onSubmit={this.logInSubmit}>
                <Form.Item>
                    {getFieldDecorator('userId', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="userId" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('userPwd', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="userPwd" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >Log in
                    </Button>
                </Form.Item>
            </Form>
                        </Col>
                    </Row>
                </Header>
                <Content className={'content'}>
                    <Row>
                        <br/>
                        <br/>
                        <br/>
                    </Row>
                    <Row>
                        <Col span={7} offset={1}>
                            <img src={cats} className={'cats'}></img>
                        </Col>
                        <Col span={6} offset={6}>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <Form onSubmit={this.signUpSubmit}>
                                <Form.Item>
                                    {getFieldDecorator('userIdSignUp', {
                                        rules: [{ required: true, message: 'Please input your username!' }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="userId" />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('userPwdSignUp', {
                                        rules: [{ required: true, message: 'Please input your Password!' }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="userPwd" />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('email', {
                                        rules: [{ required: true, message: 'Please input your email!' }],
                                    })(
                                        <Input prefix={<Icon type="email" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="email" />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('phone', {
                                        rules: [{ required: true, message: 'Please input your phone number!' }],
                                    })(
                                        <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="phone" />
                                    )}
                                </Form.Item>
                                <Form.Item className={'signUp'}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                    >Sign Up
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Content>
                <Footer className={'footer'}>
                    <ul >
                        <li>两只猫design</li>
                        <li>a good cat whose name is mia</li>
                        <li>a good cat whose name is dat</li>
                        <li>a good car whose name is little audi</li>
                        <li>a beautiful land in Terre Haute Indiana</li>
                        <li>a lovely land in Ames Iowa</li>
                        <li>some goods friends Terre Haute and Ames</li>
                        <li>best memory in the United States</li>
                    </ul>
                </Footer>
            </Layout>
        );
    }
}
const LogIn = Form.create()(LoginForm);
export default LogIn;
