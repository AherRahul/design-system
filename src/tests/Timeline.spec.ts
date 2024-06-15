import { describe, test, expect } from 'vitest';
import Timeline from '../components/Timeline.vue';
import { mount } from '@vue/test-utils';

const history = [
	{
		date: '09/22/2022',
		title: 'Lock level 1',
		text: 'User: Uncle Bob',
		_dotStyle: 'hollowed',
	},
	{
		date: '05/15/2022',
		title: 'Lock level 2',
		text: 'User: Linus Torvalds',
		_dotStyle: 'hollowed',
	},
	{
		date: '02/18/2022',
		title: 'Lock level 1',
		text: 'User: Don Norman',
	},
	{
		date: '12/20/2021',
		title: 'Lock level 3',
		text: 'User: Richard Stallman',
		_dotStyle: 'filled',
	},
	{
		date: '04/11/2021',
		title: 'Lock level 1',
		text: 'User: Dennis Ritchie',
	},
];

describe('Timeline', () => {
	test('renders correctly', async () => {
		const wrapper = mount(Timeline, {
			props: {
				history,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
