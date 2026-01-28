import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import HomePage from './pages/HomePage'
import ActorList from './pages/ActorList'
import NewsList from './pages/NewsList'
import ActorSubmit from './pages/ActorSubmit'
import RequirementSubmit from './pages/RequirementSubmit'

const { Header, Content, Footer } = Layout

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#ff6b35', padding: '0 50px' }}>
          <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
            演员资源库
          </div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']} style={{ background: 'transparent', lineHeight: '64px' }}>
            <Menu.Item key="home">
              <Link to="/">首页</Link>
            </Menu.Item>
            <Menu.Item key="actors">
              <Link to="/actors">演员列表</Link>
            </Menu.Item>
            <Menu.Item key="news">
              <Link to="/news">新闻列表</Link>
            </Menu.Item>
            <Menu.Item key="submit-actor">
              <Link to="/actor-submit">演员入驻</Link>
            </Menu.Item>
            <Menu.Item key="submit-requirement">
              <Link to="/requirement-submit">找演员</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '50px', background: '#fff' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/actors" element={<ActorList />} />
            <Route path="/news" element={<NewsList />} />
            <Route path="/actor-submit" element={<ActorSubmit />} />
            <Route path="/requirement-submit" element={<RequirementSubmit />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          演员资源库 ©2025
        </Footer>
      </Layout>
    </Router>
  )
}

export default App
