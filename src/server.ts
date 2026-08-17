import express from 'express'

const app = express()

app.use(express.json())

const jogos = [
{ id: 1, nome: "Minecraft", genero: "Sandbox", anoLancamento: 2011 },
{ id: 2, nome: "Hades", genero: "Roguelike", anoLancamento: 2020 },
{ id: 3, nome: "Stardew Valley", genero: "Simulação", anoLancamento: 2016 }
];

app.get('/jogos', (req, res) =>{
    return res.json(jogos)
})

app.get('/jogos/:id', (req, res) =>{
    const id = Number(req.params.id)

    const jogo = jogos.find(j => j.id === id)

    if(!jogo){
        return res.status(404).json('Jogo não encontrado')
    }

    return res.json(jogo)
})

app.post('/jogos', (req, res) =>{
    const {id, nome, genero, anoLancamento} = req.body

    if(!id || !nome || !genero || !anoLancamento){
        return res.status(404).json({"mensagem": "Jogo nao encontrado"})}

    const novoJogo = {id, nome, genero, anoLancamento}
    jogos.push(novoJogo)
    return res.status(201).json(`Jogo ${nome} add com sucesso`)
})

app.delete('/jogos/:id', (req, res) =>{
    const id = Number(req.params.id)

    const jogoIndex = jogos.findIndex(j => j.id === id)

    if(jogoIndex === -1){
        return res.status(404).json({"mensagem": "Jogo nao encontrado"})
    }

    jogos.splice(jogoIndex, 1)
    return res.status(200).json({"mensagem": `Jogo ${id} rmv com sucesso`})
})

app.put('/jogos/:id', (req, res) => {
    const id = Number(req.params.id)
    const { nome, genero, anoLancamento } = req.body

    const jogo = jogos.find(jogo => jogo.id === id);

    if (!jogo) {
        return res.status(404).json({mensagem: "Produto não encontrado!"});
    }
    if(jogo.nome == "" || jogo.genero == ""){
        return res.status(404).json({mensagem: "coloca as info ai pow"});
    }
    jogo.nome = nome
    jogo.genero = genero
    jogo.anoLancamento = anoLancamento

    return res.status(200).json({mensagem: `Jogo ${id} atz com sucesso`, jogo})
})

app.listen(3000, () => console.log("Servidor rodando..."))