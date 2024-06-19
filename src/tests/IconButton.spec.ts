import { describe, test, expect } from 'vitest';
import IconButton from '../components/IconButton.vue';
import { mount } from '@vue/test-utils';

describe('IconButton', () => {
	test('renders correctly', async () => {
		const wrapper = mount(IconButton, {
			global: {
				stubs: {
					'rds-icon': true,
					'rds-tooltip': true,
				},
			},
			props: {
				size: 'lg',
				icon: 'trash-outline'
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
