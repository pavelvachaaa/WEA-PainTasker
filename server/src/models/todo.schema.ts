import { Schema, model, Document } from 'mongoose';

export interface ITodo extends Document {
    title: string;
    isDone: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const TodoSchema = new Schema<ITodo>({
    title: { type: String, required: true },
    isDone: { type: Boolean, required: true, default: false },
    createdAt: { type: Date },
    updatedAt: { type: Date },
});

TodoSchema.pre<ITodo>('save', async function (next) {
    const currentDate = new Date();
    this.updatedAt = currentDate;
    if (!this.createdAt) {
        this.createdAt = currentDate;
    }
    next();
});

TodoSchema.pre<ITodo>('findOneAndUpdate', function (next) {
    this.updateOne({}, { $set: { updatedAt: new Date() } });
    next();
});

const Todo = model<ITodo>("todos", TodoSchema);
export default Todo;