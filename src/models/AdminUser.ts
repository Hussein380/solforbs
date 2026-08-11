import { Schema, model, models } from 'mongoose';

const AdminUserSchema = new Schema({
  email: { type: String, required: true, unique: true, index: true },
  role:  { type: String, enum: ['owner', 'editor'], required: true },
}, { timestamps: true });

export default models.AdminUser || model('AdminUser', AdminUserSchema);
