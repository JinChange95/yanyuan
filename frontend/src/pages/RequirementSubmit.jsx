import { useState } from 'react'
import { Form, Input, Button, message, Card, Select, InputNumber } from 'antd'
import { requirementApi } from '../services/api'

const { Option } = Select

export default function RequirementSubmit() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      await requirementApi.create(values)
      message.success('需求提交成功，我们会尽快与您联系')
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
      <Card title="找演员需求表单" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="项目名称"
            name="project_name"
            rules={[{ required: true, message: '请输入项目名称' }]}
          >
            <Input placeholder="请输入项目名称" />
          </Form.Item>

          <Form.Item
            label="需要演员数量"
            name="actor_count"
            rules={[{ required: true, message: '请输入演员数量' }]}
          >
            <InputNumber min={1} placeholder="请输入演员数量" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="性别要求"
            name="gender"
          >
            <Select placeholder="请选择性别要求" allowClear>
              <Option value="male">男</Option>
              <Option value="female">女</Option>
              <Option value="any">不限</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="年龄段要求"
            name="age_group"
          >
            <Select placeholder="请选择年龄段要求" allowClear>
              <Option value="under12">12岁以下</Option>
              <Option value="12-20">12-20岁</Option>
              <Option value="30-50">30-50岁</Option>
              <Option value="over50">50岁以上</Option>
              <Option value="any">不限</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="联系方式"
            name="contact_info"
            rules={[{ required: true, message: '请输入联系方式' }]}
          >
            <Input placeholder="请输入联系方式（手机号或邮箱）" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block size="large">
              提交需求
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
