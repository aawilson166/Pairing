const express = require('express')
const cars = express.Router()

const Car = require('../models/cars.js')

cars.get('/', (req, res) => {
    Car.find({}, (err, foundCars) => {
        res.json(foundCars)
    })
})

cars.post('/', (req, res) => {
    Car.create(req.body, (err, createdCar) => {
        Car.find({}, (err, foundCars) => {
            res.json(foundCars)
        })
    })
})

cars.put('/:id', (req, res) => {
    Car.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedCar) => {
        if(err) {
            res.send(err)
        }else{
            Car.find({}, (err, foundCars) => {
                res.json(foundCars)
            })
        }
    })
})

cars.delete('/:id', (req, res) => {
    Car.findByIdAndRemove(req.params.id, (err, deletedCar) => {
        Car.find({}, (err, foundCars) => {
            res.json(foundCars)
        })
    })
})

module.exports = cars