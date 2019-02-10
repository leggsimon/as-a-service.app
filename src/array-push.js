const isValidMethod = method => ['GET', 'POST'].includes(method.toUpperCase());

export async function handler(event, context) {
	const { httpMethod: method } = event;

	if (!isValidMethod(method)) {
		return {
			statusCode: 405,
			body: JSON.stringify({
				message: `Method Not Allowed`,
			}),
		};
	}

	return {
		statusCode: 200,
		body: JSON.stringify({
			message: `Hello world ${Math.floor(Math.random() * 10)}`,
			method,
		}),
	};
}
