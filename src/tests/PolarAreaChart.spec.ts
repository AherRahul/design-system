import { describe, test, expect } from 'vitest';
import PolarAreaChart from '../components/PolarAreaChart.vue';
import { shallowMount } from '@vue/test-utils';

const mockedData = [
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

describe('PolarAreaChart', () => {
	test('renders correctly', async () => {
		const wrapper = shallowMount(PolarAreaChart, {
			props: {
				labels: ['January','February','March', 'April', 'May'],
				variant: 'green',
				data: mockedData,
				isVisiblePointNames: true,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
