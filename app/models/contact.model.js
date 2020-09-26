const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    name: String,
    birthDate: String,
    gender: String,
    email: String,
    _address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Contact', ContactSchema);

// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var IngredientSchema = new Schema({
//     name: String
// });

// module.exports = mongoose.model('Ingredient', IngredientSchema);


// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var RecipeSchema = new Schema({
//     name: String,
//     ingredients:[
//       {type: Schema.Types.ObjectId, ref: 'Ingredient'}
//     ]
// });

// module.exports = mongoose.model('Recipe', RecipeSchema);

// var r = new Recipe();

// r.name = 'Blah';
// r.ingredients.push('mongo id of ingredient');

// r.save();