import Vue from 'vue';
import AppAlertDialog from './AlertDialog';
import AppAlert from './Alert';
import EditMeetupDetailsDialog from '@/components/Meetup/Edit/EditMeetupDetailsDialog';
import EditMeetupDateDialog from '@/components/Meetup/Edit/EditMeetupDate';

Vue.component('app-alert-dialog', AppAlertDialog);
Vue.component('app-alert', AppAlert);
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog);
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog);
