import { handler } from '../array-push';

const arrayPush = async body => {
	const response = await handler({
		httpMethod: 'POST',
		body: JSON.stringify(body),
	});

	return JSON.parse(response.body);
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

	it.todo('should return the array if no elements were passed');
	it.todo('should add an array of elements to an array');
	it.todo('should accept an array as a string');

	describe('error handling', () => {
		it.todo(
			'should return a 405 Method Not Allowed for anything other than GET or POST'
		);
		it.todo(
			'should throw an error if the array property is not an array or array string'
		);
		it.todo(
			'should return a 405 Method Not Allowed for anything other than GET or POST'
		);
	});
});
