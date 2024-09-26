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

  async getItems(query: any) {
    return await Item.find(query);
  }
}
