<a name="top"></a>
# api-rest v1.0.0

API REST con NodeJS y Express

- [Movies](#movies)
	- [Eliminar película](#eliminar-película)
	- [Regresa una película en específico](#regresa-una-película-en-específico)
	- [Regresa las películas.](#regresa-las-películas.)
	- [Guarda una película](#guarda-una-película)
	- [Actualizar una película](#actualizar-una-película)
	


# Movies

## Eliminar película
[Back to top](#top)



	DELETE /movies/:id





### Success 204

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| 204 |  | <p>Sin contenido.</p>|

## Regresa una película en específico
[Back to top](#top)



	GET /movie/:id





### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| movie | Object | <p>Datos de la pelicula</p>|

## Regresa las películas.
[Back to top](#top)



	GET /movies





### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| movies | Object[] | <p>Lista de películas.</p>|

## Guarda una película
[Back to top](#top)



	POST /movies





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| title |  | <p>Nombre de la película.</p>|
| vote_average |  | <p>Puntuación promedio.</p>|
| release_date |  | <p>Fecha de estreno (año).</p>|
| poster_path |  | <p>URL del poster.</p>|
| overview |  | <p>Descripción o resumen.</p>|
| genres |  | <p>Géneros de la película.</p>|


### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| movie | Object | <p>Datos de la película.</p>|

## Actualizar una película
[Back to top](#top)



	PUT /movies/:id





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| title |  | <p>Nombre de la película.</p>|
| vote_average |  | <p>Puntuación promedio.</p>|
| release_date |  | <p>Fecha de estreno (año).</p>|
| poster_path |  | <p>URL del poster.</p>|
| overview |  | <p>Descripción o resumen.</p>|
| genres |  | <p>Géneros de la película.</p>|


### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| movie | Object | <p>Datos de la película.</p>|

