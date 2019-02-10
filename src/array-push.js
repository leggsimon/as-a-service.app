const isValidMethod = method => ['GET', 'POST'].includes(method.toUpperCase());

export async function handler(event, context) {
	const { httpMethod: method, body } = event;

	if (!isValidMethod(method)) {
		return {
			statusCode: 405,
			body: JSON.stringify({
				message: `Method Not Allowed`,
			}),
		};
	}

	if (method === 'POST') {
		const { array, elements } = JSON.parse(body);

		if (elements) {
			array.push(elements);
		}

		return {
			statusCode: 200,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(array),
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
