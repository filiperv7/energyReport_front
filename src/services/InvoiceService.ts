import axios from 'axios'

class InvoiceService {
  private baseUrl: string
  private port = import.meta.env.SERVER_PORT || 3100

  constructor() {
    this.baseUrl = `http://localhost:${this.port}`
  }

  async uploadInvoice(formData: FormData) {
    try {
      const response = await axios.post(`${this.baseUrl}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      return response
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
      throw error
    }
  }

  async getInvoicesByClient(clientNumber: string) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/invoices_by_client/${clientNumber}`
      )

      return response
    } catch (error) {
      console.error('Error ao buscar faturas:', error)
      throw error
    }
  }

  async getDashboardData(idInvoice: number) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/invoice/${idInvoice}/dashboard`
      )

      return response
    } catch (error) {
      console.error('Error ao buscar esta fatura:', error)
      throw error
    }
  }
}

export default new InvoiceService()
