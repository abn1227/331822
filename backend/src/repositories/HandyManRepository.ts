import { HandyMan, IHandyMan } from "@/models/HandyMan";

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
