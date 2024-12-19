
import { createMocks } from 'node-mocks-http'
import handler from '../employees'
import { prisma } from '../../../lib/db'

jest.mock('../../../lib/db', () => ({
  prisma: {
    employee: {
      findMany: jest.fn(),
      create: jest.fn()
    }
  }
}))

describe('Employee API', () => {
  it('creates an employee successfully', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        position: 'Developer'
      }
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(201)
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        success: true
      })
    )
  })
})
