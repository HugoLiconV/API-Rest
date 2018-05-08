import { Opening } from '.'
import { User } from '../user'

let user, opening

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  opening = await Opening.create({ user, title: 'test', location: 'test', salary: 'test', date: 'test', description: 'test', carreer: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = opening.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(opening.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.title).toBe(opening.title)
    expect(view.location).toBe(opening.location)
    expect(view.salary).toBe(opening.salary)
    expect(view.date).toBe(opening.date)
    expect(view.description).toBe(opening.description)
    expect(view.carreer).toBe(opening.carreer)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = opening.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(opening.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.title).toBe(opening.title)
    expect(view.location).toBe(opening.location)
    expect(view.salary).toBe(opening.salary)
    expect(view.date).toBe(opening.date)
    expect(view.description).toBe(opening.description)
    expect(view.carreer).toBe(opening.carreer)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
