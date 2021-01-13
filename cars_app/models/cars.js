const mongoose = require('mongoose')
const carSchema = new mongoose.Schema(

   {
    make: String,
    model: String,
    year: String,
    image: {type: String, default: 'https://via.placeholder.com/150' },
    
  })

  const Car = mongoose.model('Car', carSchema)
  module.exports = Car
