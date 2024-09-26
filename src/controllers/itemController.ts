import { Request, Response } from "express";
import { ItemService } from "../services/itemService";

export class ItemController {
  private itemService: ItemService;

  constructor() {
    this.itemService = new ItemService();
  }

  async addItem(req: any, res: any) {
    try {
      const { name, description, price } = req.body;

      const image = req.file ? req.file.path : null;

      const userId = req.user.id;

      const itemData = {
        name,
        description,
        price,
        userId,
        image,
      };

      const item = await this.itemService.addItem(itemData);
      return res.status(201).json(item);
    } catch (error) {
      return res.status(400).json({ error: "Failed to add item " + error });
    }
  }

  async editItem(req: any, res: any) {
    const { id } = req.params;
    try {
      const item = await this.itemService.editItem(id, req.body);
      if (!item) return res.status(404).json({ error: "Item not found" });
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: "Failed to edit item " + error });
    }
  }

  async getItems(req: Request, res: Response) {
    const { search, sort } = req.query;
    const query: any = {};
    if (search) query.name = { $regrex: search, $options: "1" };

    const items = await this.itemService.getItems(query);
    res.json(items);
  }
}
