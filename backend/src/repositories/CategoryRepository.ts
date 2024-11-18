import { Category, ICategory } from "@/models/Category";

export class CategoryRepository {
  async create(categoryData: Partial<ICategory>): Promise<ICategory> {
    const category = new Category(categoryData);
    return category.save();
  }

  async list(): Promise<ICategory[]> {
    return await Category.find();
  }

  async batchDelete(): Promise<boolean> {
    try {
      await Category.deleteMany({});
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async batchCreate(categoriesData: ICategory[]): Promise<boolean> {
    try {
      await Category.insertMany(categoriesData);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
