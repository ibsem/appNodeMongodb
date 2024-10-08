const express = require('express');
const mongoose = require('mongoose');

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/meu_banco_de_dados', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Definir o modelo de dados com o Mongoose
const DadosSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  idade: { type: Number, required: true },
  cidade: { type: String, required: true }
});

const Dados = mongoose.model('Dados', DadosSchema);

// Inicializando o Express
const app = express();

// Middleware para processar JSON
app.use(express.json());

// Rota para adicionar um documento ao MongoDB
app.post('/adicionar_dados', async (req, res) => {
  try {
    const novoDocumento = new Dados({
      nome: req.body.nome,
      idade: req.body.idade,
      cidade: req.body.cidade
    });

    const resultado = await novoDocumento.save();
    res.status(201).json({ msg: 'Dados inseridos com sucesso', id: resultado._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para listar todos os documentos do MongoDB
app.get('/listar_dados', async (req, res) => {
  try {
    const documentos = await Dados.find();
    res.json(documentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rodando o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
