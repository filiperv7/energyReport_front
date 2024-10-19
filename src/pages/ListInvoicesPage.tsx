import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { InvoiceList } from '../components/InvoiceList'

export const ListInvoicePage: React.FC = () => {
  const { client_number } = useParams<{ client_number: string }>()
  const [clientName, setClientName] = useState<string | null>(null)

  const handleSetClientName = (name: string) => {
    setClientName(name)
  }

  return (
    <div className="py-10 px-6 flex flex-col items-center w-screen h-screen bg-gradient-to-br from-[#002C1F] to-[#00C26A]">
      <div className="flex flex-col gap-5 max-w-3xl">
        <div
          className={`text-2xl font-bold text-white max-md:text-xl ${
            !clientName && 'hidden'
          }`}
        >
          <h1>Listagem de Faturas</h1>
          <h3 className="text-xl max-md:text-base">Cliente: {clientName}</h3>
        </div>

        <InvoiceList
          clientNumber={client_number!}
          setClientName={handleSetClientName}
        />
      </div>
    </div>
  )
}