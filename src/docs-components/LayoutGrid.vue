<template>
	<div>
		<copy-token
			:target="target"
			:value="target"
		/>

		<rds-table
			:items="items"
			:fields="fields"
			hover
		>
			<template #table-item="{ data, field, rowIndex }">
				<div
					v-if="field === 'token'"
					:id="data.token"
					class="copy-clip"
					@click="target = data.token"
				>
					<rds-icon
						height="20"
						width="20"
						name="copy-outline"
						class="copy-clip__icon"
					/>

					<div> {{ data.token }} </div>
				</div>

				<div
					v-if="field === 'value'"
				>
					{{ data.value }}
				</div>

				<div
					v-if="field === 'example'"
					:class="shadowClass(rowIndex)"
				>
					AÀÃÂÁBCÇDẼÊÉFGHIÍJKLMNOÕÔÓPQRSTUÚÜV 
					WXYZ aàãâábcçdeẽêéfghiíjklmnoõôópqrstuúüvwxyz
					1234567890!@#$%*()_-+?/&lt>"'
				</div>
			</template>
		</rds-table>
	</div>
</template>

<script>
import RdsIcon from '../components/Icon.vue';
import RdsTable from '../components/Table.vue';
import CopyToken from '../docs-components/CopyToken.vue';

export default {
	components: {
		RdsIcon,
		CopyToken,
		RdsTable,
	},

	data() {
		return {
			target: '',
			fields: [
				{
					key: 'token',
					label: 'Token',
				},
				{
					key: 'value',
					label: 'Value',
				},
				{
					key: 'example',
					label: 'Example',
				},
			],
			fontWeightVariables: [
				'$font-weight-regular',
				'$font-weight-semibold',
				'$font-weight-bold',
			],
			fontWeightTokenValues: [
				'430',
				'600',
				'800',
			],
		};
	},

	computed: {
		items() {
			let items = [];
			for (let n = 0; n < 3; n++) {
				items.push({
					token: this.fontWeightVariables[n],
					value: this.fontWeightTokenValues[n],
				});
			}

			return items;
		},
	},

	methods: {
		shadowClass(index) {
			return this.fontWeightVariables[index].replace('$font-weight-', '');
		},
	},
};
</script>

<style lang="scss" scoped>
@import './../assets/sass/tokens.scss';

@each $fontWeight-name, $fontWeight-token in $fontWeight {
	.#{$fontWeight-name} {
		font-weight: $fontWeight-token;
	}
}

.copy-clip {
	width: fit-content;
	padding: pYX(2, 3);
	border-radius: 16px;
	border: 1px solid $n-0;
	transition: all .15s ease-in-out;
	display: flex;
	align-items: center;

	&__icon {
		margin: mr(3);
		color: $n-500;
	}
}

.copy-clip:hover {
	border: 1px solid $gp-300;
	cursor: pointer;
	transition: all .15s ease-in-out;
}
</style>
