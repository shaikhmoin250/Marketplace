import Transaction, {
  Transaction as TransactionType,
} from "../models/Transaction";

export class TransactionService {
  async createTransaction(transactionData: {
    itemId: string;
    userId: string;
    sellerId: string;
    status: string;
  }) {
    const transaction = new Transaction(transactionData);
    return await transaction.save();
  }

  async updateTransaction(id: string, itemData: any) {
    const result = Transaction.findById(id);

    console.log('id ', id);
    console.log('item data ', itemData);
    return await Transaction.findByIdAndUpdate(id, itemData, { new: true });
  }

  async getTransactionByUserId(userId: string) {
    return await Transaction.find({ userId });
  }
}
