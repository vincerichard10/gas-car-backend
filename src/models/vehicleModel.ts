import mongoose, { Schema, Document } from 'mongoose';

const UserSchema: Schema = new Schema({
    // car details 
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    vin: { type: String },
    make: { type: String },
    mod: { type: String },
    year: { type: Number },
    color: { type: String },
    license_plate: { type: String },
    registration_state: { type: String },
    owner_name: { type: String },
    owner_contact: { type: String },
    insurance_details: {
        type: {
            policyNumber: { type: String },
            coverage: { type: String }
        }
    },
    odometer_reading: { type: Number },
    fuel_type: { type: String },
    engine_size: { type: String },
    transmission_type: { type: String },
    has_tracking_device: { type: Boolean },

});

export default mongoose.model('User', UserSchema);