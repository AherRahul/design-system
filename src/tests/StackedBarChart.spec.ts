import { describe, test, expect } from 'vitest';
import StackedBarChart from '../components/StackedBarChart.vue';
import { shallowMount } from '@vue/test-utils';

const mockedData = [
	{
		name: 'Echocardiogram',
		datasets: [
			{
				label: 'Accomplished',
				date: [50, 50, 50, 50, 50],
			},
		]
	},
	{
		name: 'X-Ray',
		datasets: [
			{
				label: 'Not done',
				date: [49, 84, 120, 78, 130],
			}
		]
	},
	{
		name: 'Tomography',
		datasets: [
			{
				label: 'Not done',
				date: [38, 84, 120, 90, 45],
			}
		]
	}
];

describe('StackedBarChart', () => {
	test('renders correctly', async () => {
		const wrapper = shallowMount(StackedBarChart, {
			props: {
				labels: ['January','February','March', 'April', 'May'],
				variant: 'green',
				data: mockedData,
				barWidth: 1,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
