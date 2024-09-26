import Item, { Item as ItemType } from "../models/Item";

export class ItemService {
  async addItem(itemData: any) {
    const newItem = new Item(itemData);
    return await newItem.save();
  }

  async editItem(id: string, itemData: any) {
    const result = Item.findById(id);
    return await Item.findByIdAndUpdate(id, itemData, { new: true });
  }

  async getItems(req: any) {
    const query = req.query;
    console.log("query ", query);
    return await Item.find({
      $text: {
        $search: query.search,
      },
    });
  }
}
