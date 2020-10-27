import React from 'react'
// ui框架直接引用要用的组件
// import { Menu, Col, Row, Button } from 'antd';
// 样式
import 'antd/dist/antd.css';
import '@/App.scss';
import RouterTable from './Router'
import {Provider} from './hook/index'

// 路由跳转
// import { Route, Redirect, Switch, NavLink, withRouter } from "react-router-dom"
function App() {
  return (
    <div className="App">
      <Provider>
        <RouterTable/>
      </Provider>
    </div>
  );
}

export default App;
