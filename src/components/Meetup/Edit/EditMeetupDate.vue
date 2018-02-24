<template>
    <v-dialog persistent max-width="350" @keydown.native.esc="onClose" :value="true">
      <v-card>
        <v-toolbar class="info">
            <v-toolbar-title class="white--text">Edit Meetup {{mode | capitalize}}</v-toolbar-title>
        </v-toolbar>                     
        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-text>
                        <v-layout row>
                            <v-flex xs12>
                                <v-date-picker
                                v-model="editableDate"
                                style="width:100%"
                                color="green lighten-1"
                                actions
                                scrollable
                                v-if="mode == 'date'"
                                >
                                </v-date-picker>

                                <v-time-picker
                                style="width:100%" 
                                color="green lighten-1"
                                v-model="editableTime"
                                v-if="mode == 'time'" 
                                scrollable
                                format="24hr">
                                </v-time-picker>

                            </v-flex>
                        </v-layout>                        
                    </v-card-text>
                </v-flex>
            </v-layout>

            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="blue white--text" @click="onClose">Cancel</v-btn>
                        <v-btn color="blue white--text" @click="onSaveChanges">Save</v-btn>
                    </v-card-actions>
                </v-flex>
            </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
	name: 'EditMeetupDateDialog',
	props: ['meetup', 'mode'],
	data() {
		return {
			editableDate: null,
			editableTime: null
		};
	},
	methods: {
		onClose() {
			this.$emit('closeMeetupDateDialog', false);
			this.editableDate = null;
		},
		onSaveChanges() {
			const newDate = new Date(this.meetup.date);

			if (this.mode == 'date') {
				const newDay = new Date(this.editableDate).getUTCDate();
				const newMonth = new Date(this.editableDate).getUTCMonth();
				const newYear = new Date(this.editableDate).getUTCFullYear();

				newDate.setUTCDate(newDay);
				newDate.setUTCMonth(newMonth);
				newDate.setUTCFullYear(newYear);
			}

			if (this.mode == 'time') {
				const hours = this.editableTime.match(/^(\d+)/)[1];
				const minutes = this.editableTime.match(/:(\d+)/)[1];

				newDate.setHours(hours);
				newDate.setMinutes(minutes);
			}
			/** Save into Database */
			this.$store.dispatch('updateMeetupData', {
				id: this.meetup.id,
				date: newDate
			});
			/** Up event for close dialog */
			this.$emit('closeMeetupDateDialog', false);
			this.editableDate = null;
		}
	},
	created() {
		this.editableDate = this.$moment(this.meetup.date).format('YYYY-MM-DD');
		this.editableTime = this.$moment(this.meetup.date).format('HH:mm');
	}
};
</script>