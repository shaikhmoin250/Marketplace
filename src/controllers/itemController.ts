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

//   async getItems(req: any, res: any) {
//     try {
//       const { search, sortBy, order } = req.query as any;

//       console.log('search ', typeof(search));

//       let query: any = {};

//       if (search) {
//         query = {
//           $or: [
//             {
//               name: { $regrex: search, $options: 'i' },
//             },
//             {
//               description: { $regrex: search, $options: 'i' },
//             }
//           ],
//         };
//       }
//       let sortOptions: any = {};
//       if (sortBy) {
//         sortOptions[sortBy as string] = order === "desc" ? -1 : 1;
//       }

//       const items = await this.itemService.getItems(query);
//       if (!items) return res.status(404).json({ error: "Item not found" });
//       res.json(items);
//     } catch (err) {
//       console.log(err);
//     }
//   }

  async getItems(req:any, res:any){
    try {
      const item = await this.itemService.getItems(req);
      if (!item) return res.status(404).json({ error: "Item not found" });
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: "Item not found " + error });
    }
  }
}
