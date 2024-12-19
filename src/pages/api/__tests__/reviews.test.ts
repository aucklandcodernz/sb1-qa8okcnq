
import { createMocks } from 'node-mocks-http';
import handler from '../reviews';
import { prisma } from '../../../lib/db';

jest.mock('../../../lib/db', () => ({
  prisma: {
    performanceReview: {
      create: jest.fn(),
      findMany: jest.fn()
    }
  }
}));

describe('Reviews API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a new review', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        employeeId: '1',
        reviewerId: '2',
        reviewDate: '2024-03-20',
        rating: 4,
        comments: 'Great performance'
      }
    });

    const mockReview = {
      id: '1',
      employeeId: '1',
      reviewerId: '2',
      rating: 4
    };

    (prisma.performanceReview.create as jest.Mock).mockResolvedValue(mockReview);

    await handler(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(JSON.parse(res._getData())).toEqual(mockReview);
  });
});
