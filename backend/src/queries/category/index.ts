import { ICategory } from "@/models/Category";
import { CategoryRepository } from "@/repositories/CategoryRepository";

export class CategoryQueryHandlers {
  constructor(private categoryRepository: CategoryRepository) {}

  async listCategories(): Promise<ICategory[]> {
    return this.categoryRepository.list();
  }
}
