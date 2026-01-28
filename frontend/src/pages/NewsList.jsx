import { useState, useEffect } from 'react'
import { Card, Row, Col, Pagination, Empty } from 'antd'
import { newsApi } from '../services/api'

export default function NewsList() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  const loadNews = async () => {
    setLoading(true)
    try {
      const response = await newsApi.list({ page, page_size: 10 })
      setNews(response.data.data)
      setTotal(response.data.total)
    } catch (error) {
      console.error('加载新闻列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadNews()
  }, [page])

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  return (
    <div style={{ padding: '20px' }}>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>加载中...</div>
      ) : news.length === 0 ? (
        <Empty description="暂无新闻" />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {news.map(item => (
              <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={item.cover_image_url && (
                    <img alt={item.title} src={item.cover_image_url} style={{ height: '150px', objectFit: 'cover' }} />
                  )}
                  title={item.title}
                >
                  <p style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    color: '#666'
                  }}>
                    {item.summary || item.content.substring(0, 100)}
                  </p>
                </Card>
              </Col>
            ))}
          </Row>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Pagination
              current={page}
              total={total}
              pageSize={10}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  )
}
