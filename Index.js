const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const cars = [
    {id:1, brand: "BMW", year: "2017", price: "20000" },
    {id:2, brand: "audi", year: "2015", price: "30232"},
    {id:3, brand: "opel", year: "2010" , price: "32435"},
    {id:3, brand: "lada", year: "2019", price: "500" },
]

app.use(express.json())

app.get('/api/cars', (req,res) =>{
    res.send(cars)
})

app.post('/api/cars', (req, res)=>{
    const car = {
        id: cars.length + 1,
        brand: req.body.brand
    };
    cars.push(car);
    res.send(car)
})


app.listen(port, () => {
    console.log(`listening on port ${port}`)
})