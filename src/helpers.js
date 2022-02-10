import mongoose from "mongoose";

/**
 * Checks if string is a valid ObjectId
 *
 * @author	Sebastian Wirkijowski <sebastian@wirkijowski.dev>
 * @since	0.0.0
 *
 * @param 	string		String	String to validate.
 *
 * @returns				Boolean	Validation result.
 */
const isObjectId = (string) => {
	return mongoose.Types.ObjectId.isValid(string);
}

export {
	isObjectId
}