import { describe, test, expect } from 'vitest';
import SideBar from '../components/SideBar.vue';
import { mount } from '@vue/test-utils';

const mockedData = [
	{
		label: 'Dashboard',
		icon: 'dashboard-outline',
		route: {
			path: '/dashboard',
			name: 'dashboard'
		},
	},
	{
		label: 'Links',
		icon: 'link-outline',
		items: [
			{
				label: 'Panel (Tv)',
				path: '/tv-link',
				name: 'panel-tv'
			},
			{
				label: 'Totem',
				path: '/totem-link',
				name: 'totem'
			},
		]
	},
	{
		label: 'Reports',
		icon: 'printer-outline',
		route: {
			path: '/reports',
			name: 'page2'
		},
	},
];

describe('SideBar', () => {
	test('renders correctly', async () => {
		const wrapper = mount(SideBar, {
			global: {
				stubs: {
					'cds-icon': true,
				},
			},
			props: {
				items: mockedData,
				activeItem: mockedData[4],
				userName: 'Joana Mendes',
				userRole: 'Administrator',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
