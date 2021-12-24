const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    fooditem:{
        type:String,
        required:true,
        unique:true
    },
    link:{
        type:String,
        default:""
    },
    preparation:{
        type:String,
        default:""
    },
    pic:{
        type:String
    },
    category:{
        type:String,
        default:""
    },
});

const food = mongoose.model('food',foodSchema);

module.exports = food;