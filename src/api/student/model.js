import mongoose, {Schema} from 'mongoose'
const genres = ['hombre', 'mujer']
const carreers = [
	'Ingeniería en Informática',
	'Ingeniería en Diseño Industrial',
	'Ingeniería en Gestión Empresarial',
	'Ingeniería en Industrial',
	'Ingeniería en Sistemas Computacionales',
	'Arquitectura',
	'Licenciatura en administración'];

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
	favorites: {
		type: [{type: Schema.ObjectId, ref: 'Opening'}]
	},
	education: {
		type: Object,
		degree: {
			type: String,
			trim: true,
			required: true,
			enum: carreers
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
	skills: [{type: String}],
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
		//
		const view = {
			id: this.id,
			genre: this.genre,
			education: this.education,
			skills: this.skills,
			achievements: this.achievements,
			user: this.user.view(full),
			favorites: this.favorites
		}

		view.favorites.map((favorite, index) => {
			// console.log(favorite)
			if (typeof favorite.view === "function") {
				view.favorites[index] = favorite.view(full)
			}
		});
		return full ? {
			...view,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt
		}: view
	}
}

studentSchema.statics = {
	genres,
	carreers
}

const model = mongoose.model('Student', studentSchema)

export const schema = model.schema
export default model
