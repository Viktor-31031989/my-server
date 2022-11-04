const express = require('express')
const app = express()
const port = 3000;
const Joi = require('joi')

const cars = [
    {id: 1, pic: "🚙", brand: "BMW", year: 2017, price: 20000, color: "blue", title: "used"},
    {id: 2, pic: "🚗", brand: "audi", year: 2015, price: 30232, color: "red", title: "used"},
    {id: 3, pic: "🚚", brand: "opel", year: 2010, price: 32435, color: "green", title: "used"},
    {id: 4, pic: "🏎", brand: "lada", year: 2002, price: 500, color: "red", title: "used"},
    {id: 5, pic: "🚘", brand: "lexus", year: 2022, price: 74000, color: "white", title: "new"}
]

app.use(express.json())

//VALIDATE FUNCTION
function validateCar(car) {
    const schema = Joi.object({
        brand: Joi.string().min(3).required(),
        year: Joi.number().min(4).required(),
        price: Joi.number().min(3).required(),
        pic: Joi.string().required(),
        color: Joi.string().required(),
        title: Joi.string().required()
    });

    return schema.validate(car);
}

//GET CARS
app.get('/cars', (req, res) => {
    res.send(cars)
})

//ADD CAR
app.post('/cars', (req, res) => {

    //Validate with Joi npm i joi
    const {error} = validateCar(req.body)

    if (error) return res.status(400).send(error.details[0].message);

    const car = {
        id: cars.length + 1,
        brand: req.body.brand,
        year: req.body.year,
        price: req.body.price,
        pic: req.body.pic,
        color: req.body.color,
        title: req.body.title
    };
    cars.push(car);
    res.send(car)
});

//UPDATE
app.put('/cars/:id', (req, res) => {
    //Look up the cars
    const car = cars.find(c => c.id === parseInt(req.params.id));
    if (!car) return res.status(404).send('The course with the given ID was not found')

    //Validate
    const {error} = validateCar(req.body)

    if (error) return res.status(400).send(error.details[0].message);

    //Update cars

    car.brand = req.body.brand
    car.pic = req.body.pic
    car.price = req.body.price
    car.year = req.body.year
    car.color = req.body.color
    car.title = req.body.title
    res.send(car)
})

//DELETE
app.delete('/cars/:id', (req, res) =>{
    const car = cars.find(c => c.id === parseInt(req.params.id));
    if (!car) return  res.status(404).send('The course with the given ID was not found')

    //Delete
    const index = cars.indexOf(car);
    cars.splice(index, 1);

    res.send(car);

})


app.listen(port, () => {
    console.log(`listening on port ${port}`)
})