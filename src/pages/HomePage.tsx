import React, { useState } from 'react'
import { FileUpload } from '../components/FileUpload'

export const HomePage: React.FC = () => {
  const [clientNumber, setClientNumber] = useState('')

  const navigateToInvoice = async () => {
    if (clientNumber.length >= 10) {
      window.location.href = `/client/${clientNumber}/invoices`
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && clientNumber.length >= 10) {
      navigateToInvoice()
    }
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
            onKeyDown={handleKeyPress}
            className="w-3/4 p-2 border border-gray-300 rounded"
          />

          <button
            onClick={navigateToInvoice}
            disabled={clientNumber.length < 10}
            className={`px-4 py-2 rounded font-semibold transition-all duration-300 ${
              clientNumber.length < 10
                ? 'bg-green-200 cursor-not-allowed'
                : 'bg-[#00C26A] text-white hover:bg-[#008F55]'
            }`}
          >
            Buscar
          </button>
        </div>

        <FileUpload />
      </div>
    </div>
  )
}
