import React from 'react';
import {
    NavBar,
    Icon,
    List,
    InputItem,
    Toast,
    Button,
    Flex,
    WhiteSpace,
    WingBlank,
} from "antd-mobile";
import { createForm } from "rc-form";
import SHA256 from 'crypto-js/sha256'

import './index.scss'
import User from "@/api/user";

function Reg(props){

    let { getFieldProps, getFieldError } = props.form;

    /* 正则校验：用户名 */
    const validateUserName = (rule, value, callback) => {

        // 仅允许输入英文和数字
        const reg = /^\w{4,8}$/;
        if (reg.test(value)) {
            callback();
        } else {
            callback(new Error("仅允许英文、数字长度为4到8"));
        }
    };

    /* 正则校验：密码 */
    const validatePassword = (rule, value, callback) => {

        const reg = /^\w{4,8}$/;
        if (reg.test(value)) {
            callback();
        } else {
            callback(new Error("仅允许英文、数字长度为4到8"));
        }
    };

    /* 注册 */
    const handleClick = () => {
        props.form.validateFields({ force: true }, async(error) => {
            if (!error) {
                let values = props.form.getFieldsValue();
                // 加密
                values.password = SHA256(values.password).toString();
                values.permissions = 'user'

                // 发送注册请求
                let {data} = await User.reg(values);
                if(data.code === 1){
                    Toast.info("注册成功！");
                    props.history.push({
                        pathname:'login'
                    })
                }

            } else {
                Toast.info("填写数据格式不正确");
            }
        });
    }

    return (
        <>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => {
                    props.history.go(-1);
                }}
            ></NavBar>
            <section className="reg">
                <h2>注册堆糖</h2>
                <WingBlank size="lg">
                    <List>
                        <InputItem
                            {...getFieldProps("username", {
                                validate: [
                                    {
                                        trigger: "onBlur",
                                        rules: [
                                            { validator: validateUserName },
                                        ],
                                    },
                                ],
                            })}
                            error={!!getFieldError("username")}
                            onErrorClick={() => {
                                Toast.info(getFieldError("username"), 2);
                            }}
                            clear
                            placeholder="请输入用户名"
                        >
                            用户名
                        </InputItem>

                        <InputItem
                            {...getFieldProps("password", {
                                validate: [
                                    {
                                        trigger: "onBlur",
                                        rules: [
                                            { validator: validatePassword },
                                        ],
                                    },
                                ],
                            })}
                            error={!!getFieldError("password")}
                            onErrorClick={() => {
                                Toast.info(getFieldError("password"), 2);
                            }}
                            type="password"
                            clear
                            placeholder="请输入密码"
                        >
                            密码
                        </InputItem>
                    </List>
                </WingBlank>
                <WhiteSpace size="xl" />
                <Flex>
                    <Flex.Item></Flex.Item>
                    <Flex.Item
                        onClick={() => {
                            props.history.push("/login");
                        }}
                    >
                        已有账号？请登录
                    </Flex.Item>
                </Flex>
                <WhiteSpace size="lg" />
                <Button
                    type="warning"
                    onClick={handleClick}
                >
                    注册
                </Button>
            </section>
        </>
    );
}

export default createForm()(Reg)