
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { authMiddleware, AuthenticatedRequest } from '../../lib/middleware/authMiddleware'
import { handleDatabaseError } from '../../lib/middleware/errorHandler'
import { employeeSchema } from '../../lib/validations/employee'
import { redis } from '../../lib/db'
import { WebSocket } from 'ws'

const wss = new WebSocket.Server({ port: 8080 })
const prisma = new PrismaClient()

export default async function handler(
  req: AuthenticatedRequest,
  res: NextApiResponse
) {
  try {
    await authMiddleware(req, res, async () => {
      switch (req.method) {
        case 'GET':
          const cacheKey = `employees:${req.user?.organizationId}`
          const cachedData = await redis.get(cacheKey)
          
          if (cachedData) {
            return res.status(200).json(JSON.parse(cachedData))
          }

          const employees = await prisma.employee.findMany({
            where: { organizationId: req.user?.organizationId }
          })
          
          await redis.setex(cacheKey, 300, JSON.stringify(employees))
          return res.status(200).json(employees)

        case 'POST':
          const validated = employeeSchema.parse(req.body)
          const employee = await prisma.employee.create({
            data: {
              ...validated,
              organizationId: req.user?.organizationId!,
              employeeId: `EMP${Date.now()}`
            }
          })

          wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                type: 'EMPLOYEE_CREATED',
                data: employee
              }))
            }
          })

          await redis.del(`employees:${req.user?.organizationId}`)
          return res.status(201).json(employee)

        default:
          return res.status(405).json({ message: 'Method not allowed' })
      }
    })
  } catch (error) {
    const handledError = handleDatabaseError(error)
    console.error('API Error:', handledError)
    return res.status(500).json({
      success: false,
      message: handledError.message || 'Internal server error'
    })
  }
}
