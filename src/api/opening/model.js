import mongoose, { Schema } from 'mongoose'

const carreers = [
	'Ingeniería en Informática', 
	'Ingeniería en Diseño Industrial', 
	'Ingeniería en Gestión Empresarial', 
	'Ingeniería en Industrial', 
	'Ingeniería en Sistemas Computacionales',
	'Arquitectrua',
	'Licenciatura en administración'];

const openingSchema = new Schema({
  company: {
    type: Schema.ObjectId,
    ref: 'Company',
    required: true
  },
  title: {
    type: String,
		required: true
  },
  location: {
		type: Object,
		city: {
			type: String,
			trim: true
		},
		state: {
			type: String,
			trim: true
		}
  },
  salary: {
    type: String
  },
  date: {
    type: Date,
		default: Date.now()
  },
  description: {
    type: String,
		required: true
  },
  carreer: {
    type: [String],
		required: true,
		enum: carreers
  }
}, {
  timestamps: true
})

openingSchema.statics = {
	carreers
}


openingSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      location: this.location,
      salary: this.salary,
      date: this.date,
      description: this.description,
      carreer: this.carreer,
			company: this.company.view(full),
      // createdAt: this.createdAt,
      // updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Opening', openingSchema)

export const schema = model.schema
export default model
