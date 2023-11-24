import { Schema, model, Document } from 'mongoose';
import { hash, compare } from 'bcrypt';
import logger from '../vendor/pavel_vacha/logger/logger';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
});

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    try {
        return await compare(candidatePassword, this.password);
    } catch (err) {
        logger.error(`Couldn't compare passowrds for user ${this.name ?? "UNKNOWN"} ${err} `)
        return false;
    }
};

UserSchema.pre<IUser>('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    if (user.isModified('email')) {
        user.email = user.email.toLowerCase(); 
    }

    try {
        const hashedPassword = await hash(user.password, 10);
        user.password = hashedPassword;

        next();
    } catch (err: any) {
        logger.error(`Couldn't hash password for user ${user?.name ?? "UNKNOWN"} `)
        return next(err);
    }
});

const User = model<IUser>("users", UserSchema);

export default User;