<template>
	<nav>
		<ul class="breadcrumb">
			<li
				v-for="(item, index) in items"
				:key="`${index}-${item.name}-item`"
				role="presentation"
			>
				<rds-clickable
					v-if="index === 0"
					clickable
				>
					<router-link
						:to="routerPushTo(item)"
						class="breadcrumb__link"
					>
						<rds-icon
							v-if="items.length <= 2"
							height="16"
							width="16"
							name="arrow-left-outline"
						/>

						<rds-icon
							v-else
							height="15"
							width="15"
							name="home-outline"
						/>

						<rds-spacer margin-left="2">
							{{ item.label }}
						</rds-spacer>
					</router-link>
				</rds-clickable>

				<rds-spacer
					v-else
					class="breadcrumb__item"
					margin-right="1"
					margin-left="1"
				>
					<rds-icon
						height="16"
						width="16"
						name="caret-right-outline"
						class="breadcrumb__separator"
					/>

					<router-link
						:to="routerPushTo(item)"
						class="breadcrumb__link"
					>
						<rds-clickable clickable>
							{{ item.label }}
						</rds-clickable>
					</router-link>
				</rds-spacer>
			</li>
		</ul>
	</nav>
</template>

<script>
import RdsIcon from './Icon.vue';
import RdsSpacer from './Spacer.vue';
import RdsClickable from './Clickable.vue';
import isEmpty from 'lodash.isempty';

export default {
	components: {
		RdsIcon,
		RdsSpacer,
		RdsClickable,
	},
	props: {
		/**
		 * Defines the list of Breadcrumb items to be
		 * shown. The list items must be
		 * objects with path or route, and with a label.
		 */
		items: {
			type: Array,
			default: () => ([]),
			required: true,
		},
	},

	methods: {
		resolveRoute({ route, path }) {
			const to = isEmpty(route) ? path : route;
			return to instanceof String ? { path: to } : to;
		},

		routerPushTo(item) {
			return this.resolveRoute(item) ? this.resolveRoute(item).path : null;
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.breadcrumb {
	display: flex;
	align-items: center;
	padding: pa(0);

	&__item {
		@extend .breadcrumb;
	}

	&__link {
		@extend .breadcrumb;
		@include caption;
		color: $n-600;
		border-radius: $border-radius-lil;
		padding: pa(1);
		transition: $hover;

		&:hover,
		&:hover svg {
			background-color: $bn-50;
			color: $bn-600;
			transition: $hover;
		}
	}

	&__separator {
		color: $n-600;
	}
}
</style>
