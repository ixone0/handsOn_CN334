'use client'
import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import ReusableForm, { FormField } from '../../../components/ReusableForm'
export default function EditPatientPage() {
  const router = useRouter()
  const params = useParams()
 
  const patientId = params.id
  const [initialData, setInitialData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const patientFields: FormField[] = [
    { name: 'hn_number', label: 'หมายเลข HN', type: 'text', required: true },
    { name: 'patient_name', label: 'ชื่อ-นามสกุล คนไข้', type: 'text', required: true },
    { name: 'exam_date', label: 'วันที่ตรวจ (YYYY-MM-DD)', type: 'date', required: true },
    { name: 'diagnosis', label: 'ผลการวินิจฉัยเบื้องต้น', type: 'textarea', required: true },
  ]
  useEffect(() => {
    fetchPatientData()
  }, [patientId])
  const fetchPatientData = async () => {
    try {
      const response = await fetch('http://localhost:3340/patients')
      if (response.ok) {
        const data = await response.json()
        const foundPatient = data.find((p: any) => p.id === Number(patientId))
       
        if (foundPatient) {
          setInitialData(foundPatient)
        } else {
          alert('ไมพบขอมูลคนไขรหัสนี้')
          router.push('/admin/patients')
        }
      }
    } catch (error) {
      console.error('Error fetching patient:', error)
    } finally {
      setIsLoading(false)
    }
  }
  const handleUpdatePatient = async (formData: any) => {
    try {
      const response = await fetch(`http://localhost:3340/patients/${patientId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        alert('อัปเดตขอมูลคนไขสําเร็จ')
        router.push('/admin/patients')
      }
    } catch (error) {
      console.error('Error updating patient:', error)
    }
  }
  if (isLoading) {
    return <div className="text-center mt-20 text-xl font-bold">กําลังโหลดข้อมูล...</div>
  }
  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <ReusableForm
        title={`แก้ไขข้อมูลคนไข้รหัส ${patientId}`}
        fields={patientFields}
        initialData={initialData}
        onSubmit={handleUpdatePatient}
        onCancel={() => router.push('/admin/patients')}
      />
    </div>
  )
}