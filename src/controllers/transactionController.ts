import { Request, Response } from "express";
import { TransactionService } from "../services/transactionService";

export class TransactionController {
  private transactionService: TransactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  async createTransaction(req: any, res: any) {
    try {
      const { itemId, sellerId, status } = req.body;
      const userId = req.user.id;

      console.log(req.user.id);

      const itemData = {
        itemId,
        sellerId,
        userId,
        status,
      };

      const transaction = await this.transactionService.createTransaction(
        itemData
      );
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ error: "Transaction failed" + error });
    }
  }

  async updateTransaction(req: any, res: any) {
    const { id } = req.params;
    try {
      const item = await this.transactionService.updateTransaction(id, req.body);
      if (!item) return res.status(404).json({ error: "Item not found" });
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: "Failed to update transaction " + error });
    }
  }

  async getTransactions(req: Request, res: Response) {
    const { userId } = req.params;
    const transactions = await this.transactionService.getTransactionByUserId(
      userId
    );
    res.json(transactions);
  }
}
