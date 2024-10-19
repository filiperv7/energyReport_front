import React, { useState } from 'react'
import { FileUpload } from '../components/FileUpload'

export const HomePage: React.FC = () => {
  const [clientNumber, setClientNumber] = useState('')

  const navigateToInvoice = async () => {
    window.location.href = `/client/${clientNumber}/invoices`
  }

  return (
    <div className="flex justify-center items-center px-6 h-screen bg-gradient-to-br from-[#002C1F] to-[#00C26A]">
      <div className="bg-white p-10 rounded-xl text-center shadow-lg flex flex-col gap-5 max-[425px]:px-6">
        <div className="text-2xl font-bold">Energy Report</div>
        <div className="flex items-center gap-1 pb-1">
          <input
            type="number"
            placeholder="Nº do Cliente"
            value={clientNumber}
            onChange={e => setClientNumber(e.target.value)}
            className="w-3/4 p-2 border border-gray-300 rounded"
          />

          <button
            onClick={navigateToInvoice}
            className="bg-[#00C26A] text-white px-4 py-2 rounded hover:bg-[#008F55]"
          >
            Buscar
          </button>
        </div>

        <FileUpload />
      </div>
    </div>
  )
}
