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

	const generateResponsePayload = (result, overrides) => {
		return {
			statusCode: 200,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(result),
			...overrides,
		};
	};

	if (method === 'POST') {
		const { array, elements } = JSON.parse(body);

		if (!array && !elements) {
			return generateResponsePayload(
				{
					error:
						'You must provide at least one of an `array` or `elements` property.',
				},
				{ statusCode: 406 }
			);
		}

		const result = array
			? Array.isArray(array)
				? array
				: JSON.parse(array)
			: [];

		if (!elements) {
			// send back the array
			return generateResponsePayload(result);
		}

		if (Array.isArray(elements)) {
			result.push(...elements);
			return generateResponsePayload(result);
		}

		// If elements is a string and looks like an array, try and parse it first
		if (typeof elements === 'string' && elements.startsWith('[')) {
			result.push(...JSON.parse(elements));
			return generateResponsePayload(result);
		}

		result.push(elements);
		return generateResponsePayload(result);
	}

	return {
		statusCode: 200,
		body: JSON.stringify({
			message: `Hello world ${Math.floor(Math.random() * 10)}`,
			method,
		}),
	};
}
