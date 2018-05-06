import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Student } from '.'

const app = () => express(routes)

let userSession, anotherSession, adminSession, student

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  adminSession = signSync(admin.id)
  student = await Student.create({ user })
})

test('POST /students 201 (user)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: userSession, genre: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.genre).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /students 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /students 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get('/')
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /students 401 (user)', async () => {
  const { status } = await request(app())
    .get('/')
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /students 401', async () => {
  const { status } = await request(app())
    .get('/')
  expect(status).toBe(401)
})

test('GET /students/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`/${student.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(student.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /students/:id 401', async () => {
  const { status } = await request(app())
    .get(`/${student.id}`)
  expect(status).toBe(401)
})

test('GET /students/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /students/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`/${student.id}`)
    .send({ access_token: userSession, genre: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(student.id)
  expect(body.genre).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /students/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`/${student.id}`)
    .send({ access_token: anotherSession, genre: 'test' })
  expect(status).toBe(401)
})

test('PUT /students/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${student.id}`)
  expect(status).toBe(401)
})

test('PUT /students/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: anotherSession, genre: 'test' })
  expect(status).toBe(404)
})

test('DELETE /students/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${student.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /students/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`/${student.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /students/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${student.id}`)
  expect(status).toBe(401)
})

test('DELETE /students/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
