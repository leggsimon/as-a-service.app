const generateResponsePayload = (result, overrides) => {
	return {
		statusCode: 200,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(result),
		...overrides,
	};
};

const generateErrorPayload = (statusCode, message) => {
	return generateResponsePayload({ error: message }, { statusCode });
};

export async function handler(event, context) {
	const { httpMethod, body } = event;

	if (httpMethod.toUpperCase() !== 'POST') {
		return generateErrorPayload(405, 'Method Not Allowed');
	}

	const { array, elements } = JSON.parse(body);

	if (!array && !elements) {
		return generateErrorPayload(
			406,
			'You must provide at least one of an `array` or `elements` property.'
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
