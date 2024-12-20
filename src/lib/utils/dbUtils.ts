
import { prisma } from '../db';
import { Prisma } from '@prisma/client';

export const dbUtils = {
  // Create
  async create<T extends keyof Prisma.ModelName>(
    model: T,
    data: any
  ): Promise<any> {
    try {
      return await (prisma[model] as any).create({ data });
    } catch (error) {
      throw new Error(`Create operation failed: ${error.message}`);
    }
  },

  // Read
  async findMany<T extends keyof Prisma.ModelName>(
    model: T,
    options?: Prisma.Args<any, any>
  ): Promise<any[]> {
    try {
      return await (prisma[model] as any).findMany(options);
    } catch (error) {
      throw new Error(`Find operation failed: ${error.message}`);
    }
  },

  // Update
  async update<T extends keyof Prisma.ModelName>(
    model: T,
    id: string,
    data: any
  ): Promise<any> {
    try {
      return await (prisma[model] as any).update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new Error(`Update operation failed: ${error.message}`);
    }
  },

  // Delete
  async delete<T extends keyof Prisma.ModelName>(
    model: T,
    id: string
  ): Promise<any> {
    try {
      return await (prisma[model] as any).delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Delete operation failed: ${error.message}`);
    }
  }
};
