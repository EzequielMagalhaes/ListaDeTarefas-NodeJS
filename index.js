const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json()); // to suport JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended:true
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));

var tarefas = ['Arrumar o quarto','Fazer compras'];

app.post('/',(req,res)=>{
    tarefas.push(req.body.tarefa);
    res.render('index', {tarefasList:tarefas});
})


app.get('/',(req,res)=>{
    res.render('index', {tarefasList:tarefas});
});

app.get('/deletar/:id',(req,res)=>{
    tarefas = tarefas.filter((val,index)=>{ // fazendo um clone da variavel 'tarefas'
        if (index != req.params.id){ // fazendo essa validação
            return val; // irá retornar apenas os valores, nao o id;
        }
    })
    res.render('index', {tarefasList:tarefas});
})

app.listen(5000,()=>{ //5000 é a porta 
    console.log('Server rodando!');
})