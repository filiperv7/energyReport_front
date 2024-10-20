import { X } from '@phosphor-icons/react'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import InvoiceService from '../services/InvoiceService'

export const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file)
      setLoading(true)

      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await InvoiceService.uploadInvoice(formData)

        if (response?.status === 200) {
          window.location.href = `dashboard/invoice/${response.data.data.invoice.id}`
        }
      } catch {
        alert('Falha ao enviar o arquivo.')
      } finally {
        setLoading(false)
      }
    } else {
      alert('Por favor, selecione um arquivo PDF.')
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  })

  return (
    <div className="border-2 border-dashed p-6 text-center cursor-pointer rounded-lg hover:bg-gray-100">
      <div
        {...getRootProps()}
        className="flex justify-center items-center select-none"
      >
        <input {...getInputProps()} />
        <p className="flex items-center">
          {loading ? (
            <div className="spinner"></div>
          ) : selectedFile ? (
            <span className="flex items-center gap-2">
              {selectedFile.name}
              <X
                onClick={removeFile}
                size={22}
                weight="bold"
                className="text-red-500 cursor-pointer hover:text-red-700"
              />
            </span>
          ) : (
            'Arraste ou clique para escolher um PDF'
          )}
        </p>
      </div>
    </div>
  )
}
