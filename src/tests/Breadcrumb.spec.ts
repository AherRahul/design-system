// @vitest-environment jsdom
import { describe, test, expect } from 'vitest';
import Breadcrumb from '../components/Breadcrumb.vue';
import { mount } from '@vue/test-utils';

const items = [
	{
		label: 'Reports',
		route: {
			path: '/reports',
			name: 'reports'
		},
	},
	{
		label: 'Individualized reports',
		route: {
			path: '/individualized-reports',
			name: 'individualized'
		},
	},
	{
		label: 'User Report',
		route: {
			path: '/users-reports',
			name: 'users'
		},
	},
];

describe('Breadcrumb snapshot test', () => {
	test('renders correctly', () => {
		const wrapper = mount(Breadcrumb, {
			props: {
				items: items,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
