import { IHandyManStats } from "@/models/HandyMan";
import { IJobStats, JobStats } from "@/models/JobStats";

export class JobStatsRepository {
  async create(data: Partial<IJobStats>): Promise<IJobStats> {
    const jobStats = new JobStats(data);
    return jobStats.save();
  }

  async findById(id: string): Promise<IJobStats | null> {
    return await JobStats.findById(id);
  }

  async findByJobPetitionId(jobPetitionId: string): Promise<IJobStats | null> {
    return await JobStats.findOne({ jobPetitionId });
  }

  async list(): Promise<IJobStats[]> {
    return await JobStats.find();
  }

  async update(
    id: string,
    data: Partial<IJobStats>
  ): Promise<IJobStats | null> {
    return await JobStats.findByIdAndUpdate(id, data, { new: true });
  }

  async getHandyManStats(handyManId: string): Promise<IJobStats[]> {
    return await JobStats.aggregate([
      {
        $group: {
          _id: "$handyManId",
          count: { $sum: 1 },
          rating: { $avg: "$rating" },
        },
      },
      { $match: { _id: handyManId } },
    ]);
  }

  async getHandyMenStats(handyMenIds: string[]): Promise<IHandyManStats[]> {
    const stats = await JobStats.aggregate([
      {
        $match: {
          handyManId: { $in: handyMenIds },
          rating: { $exists: true }, // Aseguramos que solo incluya documentos con rating
        },
      },
      {
        $group: {
          _id: "$handyManId",
          totalJobs: { $sum: 1 },
          averageRating: {
            $avg: "$rating",
          },
        },
      },
      {
        $project: {
          _id: 0,
          handyManId: "$_id",
          totalJobs: 1,
          averageRating: { $round: ["$averageRating", 2] }, // Redondeamos a 2 decimales
        },
      },
    ]);

    return stats;
  }
}
