const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statsSchema = new Schema({
    username: {type: String, required: true},
    goalsScored: {type: Number, required: true},
    assists: {type: Number, required: true},
    headers: {type: Number, required: true},
    date:{type: Date, required: true},
}, {
    timestamps: true,
});

const Stats = mongoose.model('Stats', statsSchema);

module.exports = Stats;