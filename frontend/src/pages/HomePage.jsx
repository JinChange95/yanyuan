import { useState, useEffect } from 'react'
import { Carousel, Row, Col, Card, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { posterApi } from '../services/api'

export default function HomePage() {
  const [posters, setPosters] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const loadPosters = async () => {
      try {
        const response = await posterApi.list()
        setPosters(response.data)
      } catch (error) {
        console.error('加载海报失败:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPosters()
  }, [])

  return (
    <div>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '100px 0' }}>加载中...</div>
      ) : posters.length > 0 ? (
        <Carousel autoplay style={{ background: '#ff6b35', height: '400px' }}>
          {posters.map(poster => (
            <div key={poster.id} style={{ position: 'relative', height: '400px' }}>
              <img
                src={poster.image_url}
                alt={poster.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  if (poster.link_url) {
                    window.open(poster.link_url, '_blank')
                  }
                }}
              />
              {poster.title && (
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  background: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  padding: '10px 20px',
                  textAlign: 'center'
                }}>
                  {poster.title}
                </div>
              )}
            </div>
          ))}
        </Carousel>
      ) : (
        <div style={{
          background: '#ff6b35',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px'
        }}>
          演员资源库
        </div>
      )}

      <div style={{ padding: '40px', background: '#fff', minHeight: '500px' }}>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={6}>
            <Card
              hoverable
              onClick={() => navigate('/actors')}
              style={{ cursor: 'pointer', height: '100%' }}
            >
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <h2 style={{ color: '#ff6b35' }}>演员列表</h2>
                <p style={{ color: '#666' }}>浏览我们的演员库</p>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              hoverable
              onClick={() => navigate('/news')}
              style={{ cursor: 'pointer', height: '100%' }}
            >
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <h2 style={{ color: '#ff6b35' }}>新闻列表</h2>
                <p style={{ color: '#666' }}>查看最新动态</p>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              hoverable
              onClick={() => navigate('/actor-submit')}
              style={{ cursor: 'pointer', height: '100%' }}
            >
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <h2 style={{ color: '#ff6b35' }}>演员入驻</h2>
                <p style={{ color: '#666' }}>成为我们的演员</p>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              hoverable
              onClick={() => navigate('/requirement-submit')}
              style={{ cursor: 'pointer', height: '100%' }}
            >
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <h2 style={{ color: '#ff6b35' }}>找演员</h2>
                <p style={{ color: '#666' }}>提交您的需求</p>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}
