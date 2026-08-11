import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    brand: {type: String, required: true},
    model: {type: String, required: true},
    year: { type: Number, required: true},
    price: { type: Number, required: true},
    mileage: { type: Number, required: true},
    status: { type: String, enum: ['available', 'reserved', 'sold'], default: 'available'}
}, {
    timestamps: true
});

export default mongoose.model('Car', carSchema);
