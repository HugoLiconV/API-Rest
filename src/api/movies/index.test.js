import request from 'supertest-as-promised'
import express from '../../services/express'
import routes, { Movie } from '.'

const app = () => express(routes);

let movie;
// title, vote_average, release_date, poster_path, overview, genres
const movieObject = {
	title: "Coco",
	vote_average: 87,
	release_date: "2017",
	poster_path: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/oburjHqzOrTtDLYbLunKLwUHhk1.jpg",
	overview: "¿Qué pasaría si pudiéramos reencontrarnos con nuestros familiares fallecidos hace tiempo? A partir de la colorida celebración mexicana del Día de los Muertos, Coco nos descubre el misterio de compartir la reunión familiar más extraordinaria y sorprendente, incluso con aquellos antepasados que murieron muchos años atrás. La historia sigue a un niño de doce años de edad llamado Miguel, que vive con su familia en una zona rural de México, y cuyo sueño es la música y tocar la guitarra. Miguel desencadenará una serie de acontecimientos extraordinarios relacionados con un misterio centenario. La festividad del Día de los Muertos servirá como telón de fondo para que nuestro protagonista se pregunte de dónde viene, cuál es su lugar dentro de su familia, y cómo se han entretejido las relaciones familiares a través del tiempo. Una celebración de la vida, de la familia, los recuerdos y la conexión a través de diversas generaciones.",
	genres: ["Aventura", "Animacion", "Comedia"]
};

beforeEach(async () =>{
		movie = await Movie.create(movieObject);
});

test('POST /movies 201', async () => {
	const { status, body } = await request(app())
		.post('/api')
		.send(movieObject);
	expect(status).toBe(201);
	expect(typeof body).toEqual('object');
	checkAllFields(body);
});



test('GET /movies 200', async () => {
	const { status, body } = await request(app())
		.get('/api');
	expect(status).toBe(200);
	expect(Array.isArray(body)).toBe(true);
});


test('GET /movies/:id 200', async () => {
	const { status, body } = await request(app())
		.get(`/api/${movie.id}`);
	expect(status).toBe(200);
	expect(typeof body).toEqual('object');
	expect(body.id).toEqual(movie.id)
})

test('GET /movies/:id 404', async () => {
	const { status } = await request(app())
		.get('/api/123456789098765432123456');
	expect(status).toBe(404)
});

test('PUT /movies/:id 200', async () => {
	const { status, body } = await request(app())
		.put(`/api/${movie.id}`)
		.send(movieObject);
	expect(status).toBe(200);
	checkAllFields(body);
});


test('DELETE /movies/:id 204', async () => {
	const { status } = await request(app())
		.delete(`/api/${movie.id}`);
	expect(status).toBe(204)
});

test('DELETE /users/:id 404', async () => {
	const { status } = await request(app())
		.delete('/123456789098765432123456');
	expect(status).toBe(404)
});

function checkAllFields(body) {
	expect(body.title).toEqual(movieObject.title);
	expect(body.vote_average).toEqual(movieObject.vote_average);
	expect(body.release_date).toEqual(movieObject.release_date);
	expect(body.poster_path).toEqual(movieObject.poster_path);
	expect(body.overview).toEqual(movieObject.overview);
	expect(Array.isArray(body.genres)).toEqual(true);
	expect(body.genres[0]).toEqual(movieObject.genres[0]);
	expect(body.genres[1]).toEqual(movieObject.genres[1]);
}
