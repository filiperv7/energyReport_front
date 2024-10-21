# Energy Report | Dashboard de Consumo de energia

Esta é uma aplicação React e TypeScript; também utilizei Tailwind CSS, Axios e Recharts.

#### Aqui está o [Back-end](https://github.com/filiperv7/energyReport_back) desta aplicação.


Energy Report é um gerenciador de faturas de energia. Nele você pode:
- fazer o upload de faturas em PDF;
- vizualizar dashboard de uma fatura com os dados extraído do PDF;
- fazer download da fatura;
- buscar faturas por Nº de Cliente.

## Como rodar a aplicação
##### 1. Clone o projeto
```bash
git clone https://github.com/filiperv7/energyReport_front.git
```

##### 2. Acesse a pasta do projeto
```bash
cd energyReport_front/
```

##### 3. Faça a instalação dos pacotes
```bash
npm install
```

##### 4. Adicione as variáveis de ambiente usando o arquivo [.env.example](https://github.com/filiperv7/energyReport_front/blob/main/.env.example)
**IMPORTANTE**: Caso não faça a integração com o Amazon S3, certifique-se de que VITE_ENABLE_S3_DOWNLOAD esteja diferente de 'true' no .env

##### 5. Rode a aplicação
```bash
npm run dev
```

##### E pronto! A aplicação já está rodando
Agora é só acessar [http://localhost:5173/](http://localhost:5173/).

##### Obs.: para uma experiência completa, não deixe de rodar também o [Back-end](https://github.com/filiperv7/energyReport_back)
