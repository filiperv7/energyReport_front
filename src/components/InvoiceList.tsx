import { ChartLine, DownloadSimple, Flag } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
import InvoiceService from '../services/InvoiceService'
import { Loading } from './Loading'

export type ResponseListInvoicesType = {
  id: number
  reference_date: string
  client_name: string
  total: number
  economy: number
  flag_color: string
  path: string
}

export const InvoiceList: React.FC<{
  clientNumber: string
  setClientName: (name: string) => void
}> = ({ clientNumber, setClientName }) => {
  const [invoices, setInvoices] = useState<ResponseListInvoicesType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true)
      try {
        const response = await InvoiceService.getInvoicesByClient(clientNumber)

        if (response.status === 200) {
          setInvoices(response.data.invoices)

          setClientName(response.data.invoices[0].client_name)
        }
      } catch {
        alert('Falha ao buscar faturas.')
        window.location.href = '/'
      } finally {
        setLoading(false)
      }
    }

    fetchInvoices()
  }, [clientNumber])

  const navigateToInvoice = (idInvoice: number) => {
    window.location.href = `/dashboard/invoice/${idInvoice}`
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <table className="w-full bg-white border border-gray-300 max-md:text-sm max-sm:text-xs">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase">
            <th className="py-3 px-4 text-left max-[504px]:px-2 max-[368px]:px-1">
              Mês/Ano
            </th>
            <th className="py-3 px-4 text-left max-[504px]:px-2 max-[368px]:px-1">
              Total
            </th>
            <th className="py-3 px-4 text-left max-[504px]:px-2 max-[368px]:px-1">
              Economia
            </th>
            <th className="py-3 px-4 text-left w max-[550px]:hidden"></th>
            <th className="py-3 px-4 text-left max-[504px]:px-2 max-[368px]:px-1">
              Ações
            </th>
          </tr>
        </thead>

        <tbody>
          {invoices.map(invoice => (
            <tr key={invoice.id} className="border-b">
              <td className="py-3 px-4 max-[504px]:px-2 max-[368px]:px-1">
                {invoice.reference_date}
              </td>
              <td className="py-3 px-4 max-[504px]:px-2 max-[368px]:px-1">
                R$ {invoice.total.toFixed(2)}
              </td>
              <td className="py-3 px-4 max-[504px]:px-2 max-[368px]:px-1">
                R$ {invoice.economy.toFixed(2)}
              </td>
              <td className="py-3 px-2 max-[550px]:hidden">
                <Flag
                  size={30}
                  weight="fill"
                  color={invoice.flag_color ?? '#ffffff00'}
                />
              </td>
              <td className="flex items-center gap-1 py-3 px-4 max-[504px]:px-2 max-[368px]:px-1">
                <button
                  onClick={() => window.open(invoice.path, '_blank')}
                  className="bg-blue-500 text-xl text-white px-2 py-1 rounded hover:bg-blue-600 max-[404px]:px-1 max-[404px]:text-sm"
                >
                  <DownloadSimple weight="bold" />
                </button>
                <button
                  onClick={() => navigateToInvoice(invoice.id)}
                  className="bg-green-500 text-xl text-white px-2 py-1 rounded hover:bg-green-600 max-[404px]:px-1 max-[404px]:text-sm"
                >
                  <ChartLine weight="bold" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
