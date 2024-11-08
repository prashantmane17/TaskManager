import mongoose, {Schema} from mongoose;

const NewUser = new Schema({
    name: {
        type:String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {type: String,
        required: true},
    phone: {
        type: Number,
        required: true,
        unique: true},
})

export const UserSchema = mongoose.model.UserSchema || mongoose.model("UserSchema", NewUser);