import { useState, useEffect } from 'react'
import { Card, Row, Col, Pagination, Select, Empty } from 'antd'
import { actorApi } from '../services/api'

const { Option } = Select

export default function ActorList() {
  const [actors, setActors] = useState([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [gender, setGender] = useState(undefined)
  const [ageGroup, setAgeGroup] = useState(undefined)

  const loadActors = async () => {
    setLoading(true)
    try {
      const response = await actorApi.list({ page, page_size: 20, gender, age_group: ageGroup })
      setActors(response.data.data)
      setTotal(response.data.total)
    } catch (error) {
      console.error('加载演员列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadActors()
  }, [page, gender, ageGroup])

  const handleGenderChange = (value) => {
    setGender(value)
    setPage(1)
  }

  const handleAgeGroupChange = (value) => {
    setAgeGroup(value)
    setPage(1)
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col span={8}>
          <Select
            placeholder="性别筛选"
            allowClear
            style={{ width: '100%' }}
            onChange={handleGenderChange}
          >
            <Option value="male">男</Option>
            <Option value="female">女</Option>
          </Select>
        </Col>
        <Col span={8}>
          <Select
            placeholder="年龄段筛选"
            allowClear
            style={{ width: '100%' }}
            onChange={handleAgeGroupChange}
          >
            <Option value="under12">12岁以下</Option>
            <Option value="12-20">12-20岁</Option>
            <Option value="30-50">30-50岁</Option>
            <Option value="over50">50岁以上</Option>
          </Select>
        </Col>
      </Row>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>加载中...</div>
      ) : actors.length === 0 ? (
        <Empty description="暂无演员" />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {actors.map(actor => (
              <Col key={actor.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={actor.photo_url && (
                    <img alt={actor.name} src={actor.photo_url} style={{ height: '200px', objectFit: 'cover' }} />
                  )}
                  title={actor.name}
                >
                  <p><strong>性别:</strong> {actor.gender === 'male' ? '男' : '女'}</p>
                  <p><strong>年龄:</strong> {actor.age}岁</p>
                  {actor.bio && <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{actor.bio}</p>}
                </Card>
              </Col>
            ))}
          </Row>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Pagination
              current={page}
              total={total}
              pageSize={20}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  )
}
