import { IHandyMan } from "@/models/HandyMan";
import { HandyManRepository } from "@/repositories/HandyManRepository";

export class GetHandyManByIdQuery {
  constructor(public readonly id: string) {}
}

export class GetHandyManByServiceQuery {
  constructor(public readonly service: string) {}
}

export class HandyManQueryHandlers {
  constructor(private handyManRepository: HandyManRepository) {}

  async getHandyManById(query: GetHandyManByIdQuery): Promise<IHandyMan> {
    const { id } = query;

    const handyMan = await this.handyManRepository.findById(id);

    if (!handyMan) {
      throw new Error(`HandyMan not found with id: ${id}`);
    }

    return handyMan;
  }

  async getHandyManByService(
    query: GetHandyManByServiceQuery
  ): Promise<IHandyMan> {
    const { service } = query;

    const handyMan = await this.handyManRepository.findByService(service);
    if (!handyMan) {
      throw new Error(`HandyMan not found with service: ${service}`);
    }

    return handyMan;
  }
}
