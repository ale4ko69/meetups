import Vue from 'vue';
import AppAlertDialog from './AlertDialog';
import AppAlert from './Alert';
import EditMeetupDetailsDialog from '@/components/Meetup/Edit/EditMeetupDetailsDialog';
import EditMeetupDateDialog from '@/components/Meetup/Edit/EditMeetupDate';
import VueDragDrop from 'vue-drag-drop';

Vue.component('app-alert-dialog', AppAlertDialog);
Vue.component('app-alert', AppAlert);
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog);
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog);

Vue.use(VueDragDrop);
