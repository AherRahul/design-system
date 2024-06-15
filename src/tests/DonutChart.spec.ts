import { describe, test, expect } from 'vitest';
import DonutChart from '../components/DonutChart.vue';
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

describe('DonutChart', () => {
	test('renders correctly', async () => {
		const wrapper = shallowMount(DonutChart, {
			props: {
				labels: ['January','February','March', 'April', 'May'],
				variant: 'green',
				data: mockedData,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});

	test('it accepts valid colors', () => {
		const validator = DonutChart.props.colors.validator;
		const invalidColors = [...mockedColors, 'silver'];
		expect(validator(mockedColors)).toBe(true);
		expect(validator(invalidColors)).toBe(false);
	});
});
