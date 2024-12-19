
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
import { createMocks } from 'node-mocks-http';
import { createEmployee, getEmployees, updateEmployee, deleteEmployee } from '../employees';
import { prisma } from '../../../lib/db';

jest.mock('../../../lib/db', () => ({
  prisma: {
    employee: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn()
    },
    auditLog: {
      create: jest.fn()
    }
  }
}));

describe('Employee API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates an employee successfully', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        position: 'Developer',
        organizationId: 'org1',
        employmentType: 'FULL_TIME',
        status: 'ACTIVE'
      }
    });

    (prisma.employee.create as jest.Mock).mockResolvedValue({
      id: '1',
      ...req.body
    });

    await createEmployee(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        id: '1',
        firstName: 'John'
      })
    );
  });

  // Add more tests as needed
});
