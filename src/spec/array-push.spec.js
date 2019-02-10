import { handler } from '../array-push';

describe('array-push', () => {
	it('should add an element to an empty array', async () => {
		const response = await handler({
			httpMethod: 'POST',
			body: JSON.stringify({ array: [], elements: 1 }),
		});
		const result = JSON.parse(response.body);
		expect(result).toEqual([1]);
	});

	it('should add an element to an array with existing elements', async () => {
		const response = await handler({
			httpMethod: 'POST',
			body: JSON.stringify({ array: ['something'], elements: 1 }),
		});
		const result = JSON.parse(response.body);
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
