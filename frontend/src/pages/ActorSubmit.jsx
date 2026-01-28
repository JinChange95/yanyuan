import { useState } from 'react'
import { Form, Input, Button, message, Card, Select } from 'antd'
import { actorApi } from '../services/api'

const { Option } = Select

export default function ActorSubmit() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      await actorApi.create(values)
      message.success('演员信息提交成功')
      form.resetFields()
    } catch (error) {
      console.error('提交失败:', error)
      message.error('提交失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <Card title="演员入驻" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>

          <Form.Item
            label="性别"
            name="gender"
            rules={[{ required: true, message: '请选择性别' }]}
          >
            <Select placeholder="请选择性别">
              <Option value="male">男</Option>
              <Option value="female">女</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="年龄"
            name="age"
            rules={[{ required: true, message: '请输入年龄' }]}
          >
            <Input type="number" placeholder="请输入年龄" />
          </Form.Item>

          <Form.Item
            label="照片URL"
            name="photo_url"
          >
            <Input placeholder="请输入照片URL" />
          </Form.Item>

          <Form.Item
            label="个人简介"
            name="bio"
          >
            <Input.TextArea rows={4} placeholder="请输入个人简介" />
          </Form.Item>

          <Form.Item
            label="演艺经历"
            name="experience"
          >
            <Input.TextArea rows={6} placeholder="请输入演艺经历" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block size="large">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
