import { HandyManFilters, IHandyMan } from "@/models/HandyMan";
import { HandyManRepository } from "@/repositories/HandyManRepository";
import { Pagination } from "@/types/commons";

export class GetHandyManQuery {
  constructor(
    public readonly id?: string,
    public readonly service?: string
  ) {}
}

export class ListHandyMenQuery {
  constructor(
    public readonly limit?: number,
    public readonly offset?: number,
    public readonly filters?: HandyManFilters
  ) {}
}

export class HandyManQueryHandlers {
  constructor(private handyManRepository: HandyManRepository) {}

  async getHandyMan(query: GetHandyManQuery): Promise<IHandyMan> {
    const { id, service } = query;

    let handyMan: IHandyMan | null = null;

    if (id) {
      handyMan = await this.handyManRepository.findById(id);
    }

    if (service) {
      handyMan = await this.handyManRepository.findByService(service);
    }

    if (!handyMan) {
      throw new Error(`HandyMan not found with id: ${id}`);
    }

    return handyMan;
  }

  async listHandyMen(query: ListHandyMenQuery): Promise<{
    data: IHandyMan[];
    pagination: Pagination;
  }> {
    const { limit, offset, filters } = query;
    return this.handyManRepository.list(limit || 10, offset || 0, filters);
  }
}
