import mongoose, { Schema } from 'mongoose'

const companySchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  RFC: {
    type: String
  },
  razon: {
    type: String
  },
  name: {
    type: String
  },
  description: {
    type: String
  }
}, {
  timestamps: true
})

companySchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      RFC: this.RFC,
      razon: this.razon,
      name: this.name,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Company', companySchema)

export const schema = model.schema
export default model
