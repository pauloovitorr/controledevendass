const express = require('express')
const app = express()
const porta = 8080
const handlebars = require('express-handlebars')
const mysql = require('mysql')


// arquivos estaticos
app.use(express.static('public'))

// tornando acessivel arquivo da url
app.use(express.urlencoded(
    {
        extended: true
    }
))

app.use(express.json())

// views dinamicas com handlebars
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')

// conectando banco de dados 
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'produtos'
    }
)

connection.connect((err)=>{

    if(err){
        console.log(err)
        return
    }
    else{
        // Iniciando servidor
        app.listen(porta, ()=>{
        console.log(' Banco de dados conectado e servidor rodando na porta:'+ porta)
})
    }
})

// rotas
app.get('/', (req,res)=>{
    const sql = 'SELECT * FROM itens'
    connection.query(sql, (err,dados)=>{
        if(err){
            console.log(err)
            return
        }
        else{
            res.render('home', {dados})
            
        }
    })

})

app.get('/cadastrar', (req,res)=>{
    res.render('cadastrar')
})


app.get('/editar/:id', (req,res)=>{
    const id = req.params.id
    const sql = `SELECT * FROM itens WHERE id = '${id}'`

    connection.query(sql, (err, date)=>{

        if(err){
            console.log(err)
            return
        }
        else{
            res.render('editar', {date})
        }

    })

})

app.post('/itens/editar/:id', (req,res)=>{

    
    const id = req.params.id
    const nome = req.body.nome
    const valor = parseFloat(req.body.valor)
    const quantidade = req.body.quantidade


    const sql = `UPDATE itens SET nome = '${nome}', valor = '${valor}', quantidade = '${quantidade}' WHERE id='${id}'`
    
    connection.query(sql, (err)=>{
        if(err){
            console.log(err)
        }
        else{
            res.redirect('/')
        }
    })
})


app.post('/itens/postar' , (req,res)=>{

    const nome = req.body.nome
    const quantidade = req.body.quantidade
    const vendido = req.body.vendido
    const valor = parseFloat(req.body.valor)

    const sql = `INSERT INTO itens (nome,quantidade,vendido,valor) VALUES ('${nome}','${quantidade}','${vendido}','${valor}')`

    connection.query(sql, function(err){
        if(err){
            console.log(err)
            return
        }
        else{

            res.redirect('/')


        }
    })
    
})

app.post('/itens/post/:id' , (req,res)=>{

    const id = req.params.id

    const sql = `DELETE FROM itens WHERE id = ${id}`

    connection.query(sql, (err)=>{
        if(err){
            console.log(err)
            return
        }

        res.redirect('/')
    })
    })

