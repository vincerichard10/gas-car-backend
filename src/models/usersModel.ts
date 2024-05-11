import mongoose, { Schema, Document } from 'mongoose';

const UserSchema: Schema = new Schema({
    // auth staff 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // personal details
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    postal_code: { type: String, required: true },

});

export default mongoose.model('User', UserSchema);