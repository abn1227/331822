import { HandyManFilters, IHandyMan } from "@/models/HandyMan";
import { HandyManRepository } from "@/repositories/HandyManRepository";
import { JobStatsRepository } from "@/repositories/JobStatsRepository";
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
  constructor(
    private handyManRepository: HandyManRepository,
    private jobStatsRepository: JobStatsRepository
  ) {}

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
    const list = await this.handyManRepository.list(
      limit || 10,
      offset || 0,
      filters
    );

    if (list.data.length) {
      const handyMenIds = list.data.map((handyMan) => handyMan._id.toString());

      const jobStats =
        await this.jobStatsRepository.getHandyMenStats(handyMenIds);

      list.data.forEach((handyMan) => {
        const stats = jobStats.find(
          (stats) => stats.handyManId === handyMan._id.toString()
        );
        if (stats) {
          handyMan.rating = stats.averageRating;
          handyMan.jobsCount = stats.totalJobs;
        }
      });
    }

    return {
      data: list.data.map(
        (e) =>
          ({
            _id: e._id,
            firstName: e.firstName,
            lastName: e.lastName,
            phone: e.phone,
            expertise: e.expertise,
            availability: e.availability,
            services: e.services,
            rating: e.rating,
            jobsCount: e.jobsCount,
          }) as IHandyMan
      ),
      pagination: list.pagination,
    };
  }
}
