/* eslint-disable @typescript-eslint/no-explicit-any */
import { HandyMan, HandyManFilters, IHandyMan } from "@/models/HandyMan";
import { Pagination } from "@/types/commons";

export class HandyManRepository {
  async create(handyManData: Partial<IHandyMan>): Promise<IHandyMan> {
    const handyMan = new HandyMan(handyManData);
    return handyMan.save();
  }

  async findById(id: string): Promise<IHandyMan | null> {
    return await HandyMan.findById(id);
  }

  async findByService(service: string): Promise<IHandyMan | null> {
    return await HandyMan.findOne({ services: service });
  }

  async list(
    limit: number,
    offset: number,
    filters?: HandyManFilters
  ): Promise<{
    data: IHandyMan[];
    pagination: Pagination;
  }> {
    const query: any = {};

    if (filters) {
      if (filters.search) {
        query.$or = [
          { firstName: { $regex: filters.search, $options: "i" } },
          { lastName: { $regex: filters.search, $options: "i" } },
          { phone: { $regex: filters.search, $options: "i" } },
        ];
      }

      if (filters.expertise) {
        query.expertise = { $eq: filters.expertise };
      }

      if (filters.services?.length) {
        query.services = { $in: filters.services };
      }

      if (filters.availability?.length) {
        query.availability = { $in: filters.availability };
      }

      if (filters.dateRange?.start || filters.dateRange?.end) {
        query.createdAt = {};
        if (filters.dateRange.start) {
          query.createdAt.$gte = filters.dateRange.start;
        }
        if (filters.dateRange.end) {
          query.createdAt.$lte = filters.dateRange.end;
        }
      }
    }

    const data = await HandyMan.find(query)
      .limit(limit)
      .skip(offset)
      .sort({ createdAt: -1 });

    const total = await HandyMan.countDocuments(query);

    return {
      data,
      pagination: {
        total,
        totalPages: Math.ceil(total / limit),
        limit,
        offset,
      },
    };
  }

  async update(
    id: string,
    handyManData: Partial<IHandyMan>
  ): Promise<IHandyMan | null> {
    return await HandyMan.findByIdAndUpdate(id, handyManData, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await HandyMan.findByIdAndDelete(id);

    return !!result;
  }
}
