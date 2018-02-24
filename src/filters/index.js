import Vue from 'vue';
import moment from 'vue-moment';
import Vue2Filters from 'vue2-filters';

Vue.use(Vue2Filters);
Vue.use(moment);

const MeetupDate = function(str) {
	if (!str) return '';
	str = str.toString();
	return Vue.moment(str).format('Do MMMM, YYYY');
};

const MeetupDateTime = function(str) {
	if (!str) return '';
	str = str.toString();
	return Vue.moment(str).format('Do MMMM,  YYYY HH:mm');
};

const GetMeetupDay = function(str) {
	if (!str) return '';
	str = str.toString();
	return Vue.moment(str).format('Do MMMM, YYYY');
};

const GetMeetupTime = function(str) {
	if (!str) return '';
	str = str.toString();
	return Vue.moment(str).format('HH:mm');
};

const PickupDateFormat = function(str) {
	if (!str) return '';
	str = str.toString();
	return Vue.moment(str).format('YYYY-MM-DD');
};

Vue.filter('cardMeetupDate', MeetupDate);

Vue.filter('cardMeetupDateTime', MeetupDateTime);

Vue.filter('cardGetDay', GetMeetupDay);

Vue.filter('cardGetTime', GetMeetupTime);

Vue.filter('pickupDate', PickupDateFormat);
