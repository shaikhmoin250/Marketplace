import mongoose, { Document, Schema} from "mongoose";

export interface Item extends Document {
    name: string;
    description:string;
    price:string;
    userId:string;
    image:string;
}

const ItemSchema:Schema = new Schema({
    name: { type: String, required: true },
    description : { type: String, required: true, unique: true},
    price : { type: String, required: true},
    userId: {type: String, required: true},
    image : { type: String}
});

ItemSchema.index({name:'text', description:'text'});

export default mongoose.model<Item>('Item', ItemSchema);