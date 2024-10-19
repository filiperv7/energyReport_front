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
}

export default new InvoiceService()
