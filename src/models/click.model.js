import mongoose from 'mongoose';

export default mongoose.model('Click', new mongoose.Schema({
	link: {
		type: mongoose.ObjectId,
		ref: 'Link',
		required: true,
	},
	host: String,
	referer: String,
	userAgent: String,
	idAddress: String,
	timestamp: Date
}, {
	id: false,
	versionKey: false
}));