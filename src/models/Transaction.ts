import mongoose, { Document, Schema } from 'mongoose';

export interface Transaction extends Document {
  itemId: string;
  buyerId: string;
  sellerId: string;
  status: string;
}

const TransactionSchema: Schema = new Schema({
  itemId: { type: String, required: true },
  userId: { type: String, required: true },
  sellerId: { type: String, required: true },
  status: { type: String, required: true },
  time: { type: Number },
});

export default mongoose.model<Transaction>('Transaction', TransactionSchema);
