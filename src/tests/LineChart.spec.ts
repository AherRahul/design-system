import { describe, test, expect } from 'vitest';
import LineChart from '../components/LineChart.vue';
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
				label: 'Accomplished',
				date: [120, 220, 180, 320, 150],
			},
		]
	},
	{
		name: 'Tomography',
		datasets: [
			{
				label: 'Accomplished',
				date: [55, 40, 33, 90, 120],
			},
		]
	}
];

describe('LineChart', () => {
	test('renders correctly', async () => {
		const wrapper = shallowMount(LineChart, {
			props: {
				labels: ['January','February','March', 'April', 'May'],
				variant: 'green',
				showLabelName: true,
				data: mockedData,
				fill: false,
				isDashed: false,
				borderDash: [5,5],
				smoothing: 0.6,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
