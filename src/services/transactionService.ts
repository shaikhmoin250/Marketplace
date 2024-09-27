import Transaction, {
  Transaction as TransactionType,
} from '../models/Transaction';

export class TransactionService {
  async createTransaction(transactionData: {
    itemId: string;
    userId: string;
    sellerId: string;
    status: string;
    time: number;
  }) {
    const transaction = new Transaction(transactionData);
    return await transaction.save();
  }

  async updateTransaction(id: string, itemData: any) {
    itemData.time = Date.now();
    return await Transaction.findByIdAndUpdate(id, itemData, { new: true });
  }

  async getTransactionByUserId(userId: string) {
    return await Transaction.find({ userId });
  }
}
