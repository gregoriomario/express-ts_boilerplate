/**
 *
 * Check if phone number is valid Indonesian phone number
 *
 * @param phone Indonesia phone number
 * @returns  true if valid
 */
export function checkPhoneNumber(phone: string) {
	return RegExp(
		/(\+62 ((\d{3}([ -]\d{3,})([- ]\d{4,})?)|(\d+)))|(\(\d+\) \d+)|\d{3}( \d+)+|(\d+[ -]\d+)|\d+/
	).test(phone);
}

/**
 *
 * Validate password with several rules
 * 1. At least one uppercase letter
 * 2. At least one lowercase letter
 * 3. At least one number
 * 4. At least one special character
 * 5. At least 8 characters
 *
 * @param password 8 characters or more password
 * @returns  true if valid
 */
export function checkPassword(password: string) {
	return RegExp(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
	).test(password);
}
