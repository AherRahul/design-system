import { describe, test, expect } from 'vitest';
import MobileNavigation from '../components/MobileNavigation.vue';
import { mount } from '@vue/test-utils';

const mockedData = [
	{
		label: 'Start',
		icon: 'home-outline',
		route: {
			path: '/home',
			name: 'home'
		},
	},
	{
		label: 'Health Surveillance',
		icon: 'shield-outline',
		route: {
			path: '/visa',
			name: 'visa'
		}
	},
	{
		label: 'Booking Center',
		icon: 'calendar-outline',
		route: {
			path: '/regulation',
			name: 'regulation'
		},
	},
];

describe('MobileNavigation', () => {
	test('renders correctly', async () => {
		const wrapper = mount(MobileNavigation, {
			global: {
				stubs: {
					'rds-icon': true,
					'rds-avatar': true,
				},
			},
			props: {
				items: mockedData,
				activeItem: mockedData[1],
				user: {
					name: 'Joana Mendes',
					role: 'Administrator',
				}
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
