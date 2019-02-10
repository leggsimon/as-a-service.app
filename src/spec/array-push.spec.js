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
