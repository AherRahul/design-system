import { describe, test, expect } from 'vitest';
import BarChart from '../components/BarChart.vue';
import { shallowMount } from '@vue/test-utils';

const mockedData = [
	{
		name: 'Echocardiogram',
		datasets: [
			{
				label: 'Accomplished',
				data: [50, 50, 50, 50, 50],
			},
			{
				label: 'Pending',
				data: [200, 180, 250, 190, 280],
			},
			{
				label: 'Unrealized',
				data: [38, 84, 120, 90, 185],
			}
		]
	},
	{
		name: 'X-ray',
		datasets: [
			{
				label: 'Accomplished',
				data: [120, 220, 180, 320, 150],
			},
			{
				label: 'Pending',
				data: [98, 145, 160, 190, 175],
			},
			{
				label: 'Unrealized',
				data: [49, 84, 120, 78, 130],
			}
		]
	},
	{
		name: 'Tomography',
		datasets: [
			{
				label: 'Accomplished',
				data: [55, 40, 33, 90, 120],
			},
			{
				label: 'Pending',
				data: [25, 30, 90, 45, 20],
			},
			{
				label: 'Unrealized',
				data: [38, 84, 120, 90, 45],
			}
		]
	}
];

describe('BarChart', () => {
	test('renders correctly', async () => {
		const wrapper = shallowMount(BarChart, {
			props: {
				labels: ['January', 'February', 'March', 'April', 'May'],
				variant: 'green',
				data: mockedData,
				barWidth: 1,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
