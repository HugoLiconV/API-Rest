import mongoose, {Schema} from 'mongoose'

const companySchema = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'User',
		required: true
	},
	name: {
		type: String,
		// required: true
	},
	rfc: {
		type: String,
		// unique: false,
		// required: true
	},
	razon: {
		type: String,
		// required: true,
		// unique: false
		//	TODO: verificar que la razon y el rfc sean unicos
	},
	description: {
		type: String
	},
	openings: {
		type: [{type: Schema.ObjectId, ref: 'Opening'}]
	},
}, {
	timestamps: true
})

companySchema.methods = {
	view(full) {
		const view = {
			// simple view
			id: this.id,
			user: this.user.view(full),
			name: this.name,
			rfc: this.rfc,
			razon: this.razon,
			description: this.description,
			openings: this.openings
			// createdAt: this.createdAt,
			// updatedAt: this.updatedAt
		}

		// this.openings.map((opening, index) => this.openings[index] = opening.view(full))
		
		return full ? {
			...view
		} : view
	}
}
//		.then((openings) => openings.map((opening) => opening.view()))
const model = mongoose.model('Company', companySchema)

export const schema = model.schema
export default model
