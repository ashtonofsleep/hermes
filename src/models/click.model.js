import mongoose from 'mongoose';

export default mongoose.model('Click', new mongoose.Schema({
	link: {
		type: mongoose.ObjectId,
		ref: 'Link',
		required: true,
	},
	referer: String,
	userAgent: String,
	clientHints: [String],
	country: String,
	ipAddress: String,
	timestamp: Date
}, {
	id: false,
	versionKey: false
}));