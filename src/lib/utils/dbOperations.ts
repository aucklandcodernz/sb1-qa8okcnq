
import { prisma } from '../db';

export async function createRecord<T>(model: any, data: T) {
  try {
    return await model.create({ data });
  } catch (error) {
    console.error('Error creating record:', error);
    throw error;
  }
}

export async function getRecords<T>(model: any, query = {}) {
  try {
    return await model.findMany(query);
  } catch (error) {
    console.error('Error fetching records:', error);
    throw error;
  }
}

export async function updateRecord<T>(model: any, id: string, data: Partial<T>) {
  try {
    return await model.update({
      where: { id },
      data
    });
  } catch (error) {
    console.error('Error updating record:', error);
    throw error;
  }
}

export async function deleteRecord(model: any, id: string) {
  try {
    return await model.delete({
      where: { id }
    });
  } catch (error) {
    console.error('Error deleting record:', error);
    throw error;
  }
}
