import { handler } from '../array-push';

const arrayPush = async (
	bodyToSend,
	options = { onlyRespondWithBody: true }
) => {
	const { statusCode, headers, body } = await handler({
		httpMethod: 'POST',
		body: JSON.stringify(bodyToSend),
	});

	const parsedBody = JSON.parse(body);

	if (options.onlyRespondWithBody) {
		return parsedBody;
	} else {
		return {
			statusCode,
			headers,
			body: parsedBody,
		};
	}
};

describe('array-push', () => {
	it('should add an element to an empty array', async () => {
		const result = await arrayPush({ array: [], elements: 1 });

		expect(result).toEqual([1]);
	});

	it('should add an element to an array with existing elements', async () => {
		const result = await arrayPush({ array: ['something'], elements: 1 });

		expect(result).toEqual(['something', 1]);
	});

	it('should return the array if no elements were passed', async () => {
		const result = await arrayPush({ array: [1, 2] });

		expect(result).toEqual([1, 2]);
	});

	it('should add an array of elements to an array', async () => {
		const result = await arrayPush({ array: [1, 2], elements: [3, 4] });

		expect(result).toEqual([1, 2, 3, 4]);
	});

	it('should convert a string to an array before pushing', async () => {
		const result = await arrayPush({ array: '[1, 2]', elements: [3, 4] });

		expect(result).toEqual([1, 2, 3, 4]);
	});

	it('should convert elements to an array if it’s an array as a string', async () => {
		const result = await arrayPush({ array: [1, 2], elements: '[3, 4]' });

		expect(result).toEqual([1, 2, 3, 4]);
	});

	it.skip('should push the array as a string if an option is passed', async () => {
		const result = await arrayPush({
			array: [1, 2],
			elements: '[3, 4]',
		});

		expect(result).toEqual([1, 2, '[3, 4]']);
	});

	it('should instantiate a new array if one wasn’t given', async () => {
		const result = await arrayPush({ elements: [3, 4] });

		expect(result).toEqual([3, 4]);
	});

	describe('error handling', () => {
		it('should return a 406 Not Acceptable if not passed an array or elements', async () => {
			const result = await arrayPush({}, { onlyRespondWithBody: false });

			expect(result.statusCode).toEqual(406);
			expect(result.body).toEqual({
				error:
					'You must provide at least one of an `array` or `elements` property.',
			});
		});

		it.each([
			'GET',
			'HEAD',
			'PUT',
			'DELETE',
			'CONNECT',
			'OPTIONS',
			'TRACE',
			'PATCH',
		])(
			'should return a 405 Method Not Allowed for a %s request',
			async method => {
				const { statusCode, headers, body } = await handler({
					httpMethod: method,
					body: JSON.stringify({ array: [], elements: 1 }),
				});

				const parsedBody = JSON.parse(body);

				expect(statusCode).toEqual(405);
				expect(parsedBody).toEqual({ error: 'Method Not Allowed' });
			}
		);
	});
});
