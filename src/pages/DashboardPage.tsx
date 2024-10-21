import { DownloadSimple, Flag } from '@phosphor-icons/react'
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import InvoiceService from '../services/InvoiceService'

ChartJS.register(
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface DashboardData {
  id: number
  reference_date: string
  distributor_name: string
  client_name: string
  client_number: string
  flag_color: string
  electricity_consumption: number
  total_without_GD: number
  total_to_pay: number
  average_daily_spending: number
  average_daily_spending_in_reais: number
  economy: number
  compensated_energy: number
  path: string
}

const DashboardPage: React.FC = () => {
  const { id_invoice } = useParams<{ id_invoice: string }>()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  const enableS3Download = import.meta.env.VITE_ENABLE_S3_DOWNLOAD === 'true'

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await InvoiceService.getDashboardData(
          Number(id_invoice)
        )

        setDashboardData(response.data.dashboardData)
      } catch {
        alert('Erro ao buscar dados do dashboard!')
        window.location.href = '/'
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [id_invoice])

  if (loading) {
    return <Loading withBackground />
  }

  const {
    reference_date,
    client_name,
    client_number,
    electricity_consumption,
    total_without_GD,
    total_to_pay,
    average_daily_spending,
    average_daily_spending_in_reais,
    economy,
    compensated_energy,
    path,
    flag_color
  } = dashboardData!

  const energyData = {
    labels: ['Consumo', 'Compensado'],
    datasets: [
      {
        data: [electricity_consumption, compensated_energy],
        backgroundColor: ['#3498db', '#1abc9c']
      }
    ]
  }

  const financialData = {
    labels: ['Valor Total', 'Total a Pagar'],
    datasets: [
      {
        data: [total_without_GD, total_to_pay],
        backgroundColor: ['#e74c3c', '#f39c12']
      }
    ]
  }

  const chartOptions = {
    plugins: {
      legend: {
        display: false
      }
    }
  }

  return (
    <div className="w-screen max-md:h-full h-screen py-10 px-6 text-white bg-gradient-to-br from-[#002C1F] to-[#00C26A]">
      <Header />
      <div className="h-full flex flex-col items-center justify-center max-sm:pt-6">
        <div className="flex flex-col gap-4 max-xs:text-sm">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold max-xs:text-xl">
              Dashboard da Fatura
            </h1>
            <button
              onClick={() => enableS3Download && window.open(path, '_blank')}
              className={`bg-blue-500 text-xl text-white px-2 py-1 rounded max-[404px]:px-1 max-[404px]:text-sm ${
                !enableS3Download
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-blue-600 cursor-pointer'
              }`}
              disabled={!enableS3Download}
            >
              <DownloadSimple weight="bold" />
            </button>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p>
                <span>Referente a: </span>
                <span className="font-bold">{reference_date}</span>
              </p>
              <Flag size={20} weight="fill" color={flag_color ?? '#ffffff00'} />
            </div>
            <p>
              Nº do Cliente: <span className="font-bold">{client_number}</span>
            </p>
            <p>
              Cliente: <span className="font-bold">{client_name}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-black text-2xl max-xs:text-xl">
            <div className="p-4 bg-white rounded-md shadow flex-1 max-w-48 min-w-44">
              <h3 className="text-xs font-bold mb-2">Energia Compensada</h3>
              <div className="flex justify-between items-center gap-3">
                <p className="flex flex-col font-semibold">
                  <span className="text-sm">kWh</span>
                  <span>{compensated_energy.toLocaleString('pt-br')}</span>
                </p>
                <span className="h-5 border-l border-gray-500"></span>{' '}
                <p className="flex flex-col font-semibold">
                  <span className="text-sm">R$</span>
                  <span>{economy.toLocaleString('pt-br')}</span>
                </p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-md shadow flex-1 max-w-48 min-w-44">
              <h3 className="text-xs font-bold mb-2">Consumo Total</h3>
              <div className="flex justify-between items-center gap-3">
                <p className="flex flex-col font-semibold">
                  <span className="text-sm">kWh</span>
                  <span>{electricity_consumption.toLocaleString('pt-br')}</span>
                </p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-md shadow flex-1 max-w-48 min-w-44">
              <h3 className="text-xs font-bold mb-2">Gasto por Dia</h3>
              <div className="flex justify-between items-center gap-3">
                <p className="flex flex-col font-semibold">
                  <span className="text-sm">kWh</span>
                  <span>{average_daily_spending.toLocaleString('pt-br')}</span>
                </p>
                <span className="h-5 border-l border-gray-500"></span>{' '}
                {/* Separador */}
                <p className="flex flex-col font-semibold">
                  <span className="text-sm">R$</span>
                  <span>
                    {average_daily_spending_in_reais.toLocaleString('pt-br')}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-black">
            <div className="bg-white p-4 max-[400px]:p-1 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                Resultados de Energia (kWh)
              </h3>
              <Bar data={energyData} options={chartOptions} />
            </div>

            <div className="bg-white p-4 max-[400px]:p-1 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                Resultados Financeiros (R$)
              </h3>
              <Bar data={financialData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
