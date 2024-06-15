import { describe, test, expect } from 'vitest';
import DialogModal from '../components/DialogModal.vue';
import { mount } from '@vue/test-utils';

describe('DialogModal', () => {
	test('renders correctly', async () => {
		const wrapper = mount(DialogModal, {
			props: {
				modelValue: true,
				title: 'Hello world!',
				description: 'This action will affect the system and associated files.',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
