import { Schema, model, models } from 'mongoose';

const GalleryImageSchema = new Schema({
  url: { type: String, required: true },
  alt: { type: String, required: true },
}, { _id: false });

const FeatureSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  subtitle: { type: String, required: true },
  image: { type: String, required: true }
}, { _id: false });

const ProjectSchema = new Schema({
  slug:         { type: String, required: true, unique: true, index: true }, 
  name:         { type: String, required: true },                            
  status:       { type: String, enum: ['live', 'in_development', 'planned'], required: true },
  industry:     { type: String, required: true },                            
  summary:      { type: String, required: true },                            
  description:  { type: String },                                            
  features:     [FeatureSchema],                                         
  heroImageUrl: { type: String },                                            
  gallery:      [GalleryImageSchema],
  liveUrl:      { type: String },
  subdomain:    { type: String },
  videoUrl:     { type: String },
  launchDate:   { type: Date },
  featured:     { type: Boolean, default: false },                          
  sortOrder:    { type: Number, default: 0 },                                
}, { timestamps: true });

export default models.Project || model('Project', ProjectSchema);
