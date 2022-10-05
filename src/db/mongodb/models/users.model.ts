import { model, Schema, Document, Types } from 'mongoose';

export interface IUser {
	id?: string, // if you use mongodb remove this
	_id?: Types.ObjectId | string, // if you use sql remove this
	name: string,
	email: string,
	password: string
}
export type UserDocument = IUser & Document

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	}
});

export default model('User', UserSchema);