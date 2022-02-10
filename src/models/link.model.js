import mongoose from 'mongoose';

export default mongoose.model('Link', new mongoose.Schema({
	type: {
		type: String,
		required: true
	},
	target: {
		type: String,
		required: true
	},
	code: {
		type: String,
		required: true,
		unique: true
	},
	description: String,
	notes: String,
	version: {
		type: Number,
		required: true,
		default: 1
	},
	createdAt: {
		type: Date,
		required: true
	},
	createdBy: {
		type: mongoose.ObjectId,
		ref: 'User',
		required: true
	},
	updatedAt: Date,
	updatedBy: {
		type: mongoose.ObjectId,
		ref: 'User'
	}
}, {
	id: false,
	versionKey: false
}));