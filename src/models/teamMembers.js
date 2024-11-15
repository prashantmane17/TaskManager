import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      
      email: {
        type: String,
        required: true,
        unique: true,
      },
      role:{
        type: String,
        required: true,
      },
      password: {
        type: String,
        default:"abcd@123",
      },
});

export default mongoose.models.TeamMember || mongoose.model('TeamMember', teamMemberSchema);
