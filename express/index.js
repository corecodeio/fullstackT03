const express = require('express');
const app = express();
//middelware

const middelware = (req, res, next) => {
    console.log('m1');
    if(auth){
        next()
    } 
    res.status(500).json({error:'fallo mapa'})
}

app.get('/message', middelware, (req, res, next) => {
    console.log('aqui')
})

app.use((req, res, next) => {
    console.log('m4');
    res.status(200).json({ message: 'hola' })
})
app.listen(8000, () => {
    console.log('servidor escuchando en el puerto:8000');
})