import mongoose, { Schema } from 'mongoose'

const openingSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String
  },
  location: {
    type: String
  },
  salary: {
    type: String
  },
  date: {
    type: String
  },
  description: {
    type: String
  },
  carreer: {
    type: String
  }
}, {
  timestamps: true
})

openingSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      title: this.title,
      location: this.location,
      salary: this.salary,
      date: this.date,
      description: this.description,
      carreer: this.carreer,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
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
