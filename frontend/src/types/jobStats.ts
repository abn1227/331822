export interface IJobStats {
  handyManId: string;
  jobPetitionId: string;
  rating: number;
}

export interface IJobStatsRecord extends IJobStats {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
