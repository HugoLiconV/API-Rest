import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Opening } from '.'

const app = () => express(routes)

let userSession, anotherSession, opening

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  opening = await Opening.create({ user })
})

test('POST /openings 201 (user)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: userSession, title: 'test', location: 'test', salary: 'test', date: 'test', description: 'test', carreer: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.location).toEqual('test')
  expect(body.salary).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.carreer).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /openings 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /openings 200 (user)', async () => {
  const { status, body } = await request(app())
    .get('/')
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /openings 401', async () => {
  const { status } = await request(app())
    .get('/')
  expect(status).toBe(401)
})

test('GET /openings/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`/${opening.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(opening.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /openings/:id 401', async () => {
  const { status } = await request(app())
    .get(`/${opening.id}`)
  expect(status).toBe(401)
})

test('GET /openings/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /openings/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`/${opening.id}`)
    .send({ access_token: userSession, title: 'test', location: 'test', salary: 'test', date: 'test', description: 'test', carreer: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(opening.id)
  expect(body.title).toEqual('test')
  expect(body.location).toEqual('test')
  expect(body.salary).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.carreer).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /openings/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`/${opening.id}`)
    .send({ access_token: anotherSession, title: 'test', location: 'test', salary: 'test', date: 'test', description: 'test', carreer: 'test' })
  expect(status).toBe(401)
})

test('PUT /openings/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${opening.id}`)
  expect(status).toBe(401)
})

test('PUT /openings/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: anotherSession, title: 'test', location: 'test', salary: 'test', date: 'test', description: 'test', carreer: 'test' })
  expect(status).toBe(404)
})

test('DELETE /openings/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${opening.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /openings/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`/${opening.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /openings/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${opening.id}`)
  expect(status).toBe(401)
})

test('DELETE /openings/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
