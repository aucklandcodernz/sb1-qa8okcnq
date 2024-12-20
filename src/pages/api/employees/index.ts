
import { NextApiRequest, NextApiResponse } from 'next';
import { dbUtils } from '../../../lib/utils/dbUtils';
import { handleError } from '../../../lib/middleware/errorHandler';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET':
        const employees = await dbUtils.findMany('employee');
        return res.status(200).json(employees);

      case 'POST':
        const newEmployee = await dbUtils.create('employee', req.body);
        return res.status(201).json(newEmployee);

      case 'PUT':
        const { id, ...data } = req.body;
        const updatedEmployee = await dbUtils.update('employee', id, data);
        return res.status(200).json(updatedEmployee);

      case 'DELETE':
        const deletedEmployee = await dbUtils.delete('employee', req.query.id as string);
        return res.status(200).json(deletedEmployee);

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    handleError(error, res);
  }
}
