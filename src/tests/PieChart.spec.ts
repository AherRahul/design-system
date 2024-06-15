import { describe, test, expect } from 'vitest';
import PieChart from '../components/PieChart.vue';
import { shallowMount } from '@vue/test-utils';

const mockedData =[
	{
		name: 'Echocardiogram',
		datasets: [
			{
				label: 'Exams performed',
				date: [120, 220, 180, 320, 150],
			},
		]
	},
];

const mockedColors = ['teal', 'violet', 'amber', 'blue', 'red'];

describe('PieChart', () => {
	test('renders correctly', async () => {
		const wrapper = shallowMount(PieChart, {
			props: {
				labels: ['January','February','March', 'April', 'May'],
				variant: 'green',
				data: mockedData,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('it accepts valid colors', () => {
		const validator = PieChart.props.colors.validator;
		const invalidColors = [...mockedColors, 'silver'];
		expect(validator(mockedColors)).toBe(true);
		expect(validator(invalidColors)).toBe(false);
	});
});
