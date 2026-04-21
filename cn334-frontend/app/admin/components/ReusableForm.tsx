import React, { useState } from 'react'
export interface FormField {
  name: string
  label: string
  type: 'text' | 'date' | 'time' | 'textarea'
  required?: boolean
}
interface ReusableFormProps {
  title: string
  fields: FormField[]
  initialData: any
  onSubmit: (formData: any) => void
  onCancel: () => void
}
export default function ReusableForm({ title, fields, initialData, onSubmit, onCancel }: ReusableFormProps) {
  const [formData, setFormData] = useState(initialData)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData) // สงขอมูลกลับไปใหหนาหลักจัดการตอ
  }
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.name} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                rows={4}
                required={field.required}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required={field.required}
              />
            )}
          </div>
        ))}
        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          >
            บันทึกข้อมูล
          </button>
        </div>
      </form>
    </div>
  )
}