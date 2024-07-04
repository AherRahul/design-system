import ActionBar from './ActionBar.vue';
import ActionsList from './ActionsList.vue';
import Alert from './Alert.vue';
import AlertCard from './AlertCard.vue';
import AppBar from './AppBar.vue';
import Avatar from './Avatar.vue';
import AvatarGroup from './AvatarGroup.vue';
import Badge from './Badge.vue';
import BarChart from './BarChart.vue';
import LineChart from './LineChart.vue';
import PieChart from './PieChart.vue';
import PolarAreaChart from './PolarAreaChart.vue';
import StackedBarChart from './StackedBarChart.vue';
import Box from './Box.vue';
import Breadcrumb from './Breadcrumb.vue';
import RichTooltip from './RichTooltip.vue';
import Button from './Button.vue';
import Card from './Card.vue';
import CalloutCard from './CalloutCard.vue';
import CarouselController from './CarouselController.vue';
import Checkbox from './Checkbox.vue';
import Chevron from './Chevron.vue';
import Clickable from './Clickable.vue';
import CollapsibleContainer from './CollapsibleContainer.vue';
import ColorPicker from './ColorPicker.vue';
import DashboardCard from './DashboardCard.vue';
import DateInput from './DateInput.vue';
import DialogModal from './DialogModal.vue';
import Divider from './Divider.vue';
import Dropdown from './Dropdown.vue';
import DonutChart from './DonutChart.vue';
import EmptyState from './EmptyState.vue';
import FileInput from './FileInput.vue';
import FlatButton from './FlatButton.vue';
import FloatingAssistant from './FloatingAssistant.vue';
import GaugeChart from './GaugeChart.vue';
import Highlight from './Highlight.vue';
import Icon from './Icon.vue';
import IconButton from './IconButton.vue';
import InlineDateInput from './InlineDateInput.vue';
import InnerTabs from './InnerTabs.vue';
import Image from './Image.vue';
import Link from './Link.vue';
import LoadingBar from './LoadingBar.vue';
import MobileNavigation from './MobileNavigation.vue';
import Modal from './Modal.vue';
import Multiselect from './Multiselect.vue';
import NavBar from './NavBar.vue';
import NumberInput from './NumberInput.vue';
import OverlayLoader from './OverlayLoader.vue';
import PageContainer from './PageContainer.vue';
import PageLayout from './PageLayout.vue';
import PageHeader from './PageHeader.vue';
import Pagination from './Pagination.vue';
import PanelCard from './PanelCard.vue';
import PinInput from './PinInput.vue';
import Popover from './Popover.vue';
import ProgressBar from './ProgressBar.vue';
import ProgressCircular from './ProgressCircular.vue';
import Pulsar from './Pulsar.vue';
import Radio from './Radio.vue';
import RadioButtonGroup from './RadioButtonGroup.vue';
import Spacer from './Spacer.vue';
import Scrollable from './Scrollable.vue';
import SearchInput from './SearchInput.vue';
import SegmentedControl from './SegmentedControl.vue';
import Select from './Select.vue';
import SideBar from './SideBar.vue';
import SideSheet from './SideSheet.vue';
import Skeleton from './Skeleton.vue';
import SkeletonText from './SkeletonText.vue';
import Slider from './Slider.vue';
import Spinner from './Spinner.vue';
import Stepper from './Stepper.vue';
import StepperInput from './StepperInput.vue';
import Switch from './Switch.vue';
import Table from './Table.vue';
import Tabs from './Tabs.vue';
import TextArea from './TextArea.vue';
import TextInput from './TextInput.vue';
import TimeInput from './TimeInput.vue';
import Timeline from './Timeline.vue';
import TimelineItem from './TimelineItem.vue';
import Tooltip from './Tooltip.vue';
import Truncate from './Truncate.vue';
import PasswordInput from './PasswordInput.vue';
import Wizard from './Wizard.vue';
import RdsGrid from './Grid.vue';
import RdsCol from './Col.vue';
import RdsRow from './Row.vue';
import BottomSheet from './BottomSheet.vue';
import FileViewer from './FileViewer.vue';
import RadialBarChart from './RadialBarChart.vue';

import Rdstip from '../utils/directives/rdstip';
import RdsFloatify from "../utils/directives/rdsFloatify";

export default {
	install: (app: any, options: any) => {
		app.directive('rdstip', Rdstip);
		app.directive("rds-floatify", RdsFloatify);

		app.component('RdsActionBar', ActionBar); //NOTE: Tested in SB
		app.component('RdsActionsList', ActionsList); //NOTE: Tested in SB
		app.component('RdsAlert', Alert); //NOTE: Tested in SB
		app.component('RdsAlertCard', AlertCard);
		app.component('RdsAppBar', AppBar); //NOTE: Tested in SB
		app.component('RdsAvatar', Avatar); //NOTE: Tested in SB
		app.component('RdsAvatarGroup', AvatarGroup); //NOTE: Tested in SB
		app.component('RdsBadge', Badge); //NOTE: Tested in SB
		app.component('RdsBarChart', BarChart);
		app.component('RdsBox', Box);
		app.component('RdsBreadcrumb', Breadcrumb);
		app.component('RdsRichTooltip', RichTooltip);
		app.component('RdsInlineDateInput', InlineDateInput);
		app.component('RdsButton', Button); //NOTE: Tested in SB
		app.component('RdsCard', Card);
		app.component('RdsCalloutCard', CalloutCard); //NOTE: Tested in SB
		app.component('RdsCarouselController', CarouselController);
		app.component('RdsCheckbox', Checkbox); //FIXME: Style SB issue
		app.component('RdsChevron', Chevron); //NOTE: Tested in SB
		app.component('RdsClickable', Clickable); //NOTE: Tested in SB
		app.component('RdsCollapsibleContainer', CollapsibleContainer); //NOTE: Tested in SB. !Reactive!
		app.component('RdsColorPicker', ColorPicker); //NOTE: Tested in SB.
		app.component('RdsDashboardCard', DashboardCard);
		app.component('RdsDateInput', DateInput); //NOTE: Tested in SB
		app.component('RdsDialogModal', DialogModal); //NOTE: Tested in SB
		app.component('RdsDivider', Divider); //NOTE: Tested in SB
		app.component('RdsDropdown', Dropdown); //NOTE: Tested in SB
		app.component('RdsDonutChart', DonutChart); //NOTE: Tested in SB
		app.component('RdsEmptyState', EmptyState); //NOTE: Tested in SB
		app.component('RdsFileInput', FileInput); //NOTE: Tested in SB
		app.component('RdsFlatButton', FlatButton); //NOTE: Tested in SB
		app.component('RdsFloatingAssistant', FloatingAssistant);
		app.component('RdsGaugeChart', GaugeChart); //NOTE: Tested in SB
		app.component('RdsHighlight', Highlight); //NOTE: Tested in SB
		app.component('RdsIcon', Icon); //NOTE: Tested in SB
		app.component('RdsIconButton', IconButton); //NOTE: Tested in SB
		app.component('RdsImage', Image);
		app.component('RdsInnerTabs', InnerTabs); //NOTE: Tested in SB
		app.component('RdsLineChart', LineChart);
		app.component('RdsLink', Link); //NOTE: Tested in SB
		app.component('RdsLoadingBar', LoadingBar); //NOTE: Tested in SB
		app.component('RdsMobileNavigation', MobileNavigation); //NOTE: Tested in SB
		app.component('RdsModal', Modal); //NOTE: Tested in SB
		app.component('RdsMultiselect', Multiselect); //FIXME: Problema no SB
		app.component('RdsNavBar', NavBar); //NOTE: Tested in SB
		app.component('RdsNumberInput', NumberInput); //NOTE: Tested in SB. !Reactive!
		app.component('RdsPageContainer', PageContainer); //NOTE: Tested in SB
		app.component('RdsPageLayout', PageLayout); //NOTE: Tested in SB
		app.component('RdsPageHeader', PageHeader); //NOTE: Tested in SB
		app.component('RdsPagination', Pagination); //NOTE: Tested in SB. !Reactive!
		app.component('RdsPanelCard', PanelCard); //NOTE: Tested in SB
		app.component('RdsPinInput', PinInput); //NOTE: Tested in SB. !Reactive!
		app.component('RdsPopover', Popover);
		app.component('RdsProgressBar', ProgressBar); //NOTE: Tested in SB
		app.component('RdsOverlayLoader', OverlayLoader); 
		app.component('RdsProgressCircular', ProgressCircular); //NOTE: Tested in SB
		app.component('RdsPulsar', Pulsar);
		app.component('RdsRadio', Radio); //NOTE: Tested in SB
		app.component('RdsRadioButtonGroup', RadioButtonGroup); //NOTE: Tested in SB
		app.component('RdsSpacer', Spacer);
		app.component('RdsScrollable', Scrollable); //FIXME: Problema no SB
		app.component('RdsSearchInput', SearchInput);
		app.component('RdsSegmentedControl', SegmentedControl);
		app.component('RdsSelect', Select); //NOTE: Tested in SB. !Reactive!
		app.component('RdsSideBar', SideBar);
		app.component('RdsSideSheet', SideSheet);
		app.component('RdsSkeleton', Skeleton);
		app.component('RdsSkeletonText', SkeletonText); //NOTE: Tested in SB
		// app.component('RdsSlider', Slider);
		app.component('RdsSpinner', Spinner); //NOTE: Tested in SB
		app.component('RdsStackedBarChart', StackedBarChart);
		app.component('RdsStepper', Stepper);
		app.component('RdsStepperInput', StepperInput); //NOTE: Tested in SB. !Reactive!
		app.component('RdsSwitch', Switch); //NOTE: Tested in SB
		app.component('RdsTable', Table); //NOTE: Tested in SB
		app.component('RdsTabs', Tabs); //NOTE: Tested in SB
		app.component('RdsTextArea', TextArea); //NOTE: Tested in SB. !Reactive!
		app.component('RdsTextInput', TextInput); //NOTE: Tested in SB. !Reactive!
		app.component('RdsTimeInput', TimeInput); //NOTE: Tested in SB. !Reactive!
		app.component('RdsTooltip', Tooltip); //NOTE: Tested in SB
		app.component('RdsTimeline', Timeline);
		app.component('RdsTimelineItem', TimelineItem);
		app.component('RdsTruncate', Truncate); //NOTE: Tested in SB
		app.component('RdsPasswordInput', PasswordInput);
		app.component('RdsPieChart', PieChart);
		app.component('RdsPolarAreaChart', PolarAreaChart);
		app.component('RdsWizard', Wizard);
		app.component('RdsGrid', RdsGrid);
		app.component('RdsRow', RdsRow);
		app.component('RdsCol', RdsCol);
		app.component('RdsBottomSheet', BottomSheet);
		app.component('RdsFileViewert', FileViewer);
		app.component('RdsRadialBarChart', RadialBarChart);
	},
}
