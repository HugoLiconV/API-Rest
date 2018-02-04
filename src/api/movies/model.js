import mongoose, { Schema } from 'mongoose'

// title, vote_average, release_date, poster_path, overview, genres
const MovieSchema = new Schema({
	title: { type: String },
	vote_average:{ type: Number },
	release_date:{ type:String },
	poster_path:{ type: String },
	overview:{ type: String },
	genres: {
		type: [String]
	}
}, {
		timestamps: false
	})

// id, [Transaction], total, fecha
MovieSchema.methods = {
	view(full) {
		const view = {
			//simple view
			id: this.id,
			title: this.title,
			vote_average: this.vote_average,
			release_date: this.release_date,
			poster_path: this.poster_path,
			overview: this.overview,
			genres: this.genres
		};

		return full ? {
			...view
		} : view
	}
}

const model = mongoose.model('Movie', MovieSchema)

export const schema = model.schema
export default model
