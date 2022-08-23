const mongoose = require('mongoose')

const newsSchema = mongoose.Schema({
    author:{
        type: String
    },
    title:{
        type: String
    },
    content:{
        type: String
    },
    url:{
        type:String
    },
    newsImage:{
        type: String,
        required: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    views:{
        type: Number,
        default: 0
    },
    comments : [],
    addToSlider : {
        type: Boolean,
        default: false
    },
    comments:[{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        comment:{
            type: String
        }
    }],

    addedAt: {
        type: Date
    }
})


module.exports = mongoose.model('News',newsSchema);