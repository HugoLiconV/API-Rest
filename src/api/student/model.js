import mongoose, {Schema} from 'mongoose'
const genres = ['hombre', 'mujer']

const studentSchema = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'User',
		required: true
	},
	genre: {
		type: String,
		lowercase: true,
		enum: genres,
	},
	education: {
		type: Object,
		degree: {
			type: String,
			trim: true,
			required: true
		},
		date: {
			type: String,
			trim: true,
		},
		grade: {
			type: String,
			trim: true,
		}
	},
	skills: {
		type: [String]
	},
	achievements: [{
		title: String,
		description: String,
		date: String,
	}]
}, {
	timestamps: true
})

studentSchema.methods = {
	view(full) {
		
		const view = {
			id: this.id,
			user: this.user.view(full),
			genre: this.genre,
			education: this.education,
			skills: this.skills,
			achievements: this.achievements,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt
		}
		
		return full ? {
			...view
		}: view
		
		// let view = {}
    //
		// let fields = ['id', 'genre', 'education', 'skills', 'achievements']
		// // view.user = this.user.view(full)
		//
		// if (full) {
		// 	fields = [...fields, 'createdAt']
		// }
		//
		// fields.forEach((field) => { view[field] = this[field] })
		//
		// return view
	}
}

studentSchema.statics = {
	genres
}

const model = mongoose.model('Student', studentSchema)

export const schema = model.schema
export default model
