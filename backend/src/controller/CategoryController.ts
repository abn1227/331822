import { CategoryQueryHandlers } from "@/queries/category";
import { CategoryRepository } from "@/repositories/CategoryRepository";

export class CategoryController {
  private queryHandlers: CategoryQueryHandlers;

  constructor() {
    const categoryRepository = new CategoryRepository();
    this.queryHandlers = new CategoryQueryHandlers(categoryRepository);
  }

  async list(req: any, res: any) {
    try {
      const categories = await this.queryHandlers.listCategories();
      res.status(200).json({
        data: categories,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
