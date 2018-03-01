<template>
  <v-container>
    <v-layout row wrap v-if="loading">  
          <v-flex xs12 class="text-xs-center"> 
              <v-progress-circular indeterminate 
              color="primary"
              :width="7"
              :size="70"
              ></v-progress-circular>     
          </v-flex>
      </v-layout>
      <v-layout row wrap v-else>
          <v-flex xs12 md8 offset-md2>
              <v-card>
                <v-card-title>
                   <h3 class="primary--text">{{meetup.title | uppercase}}</h3> 
                   <template v-if="userIsCreator">
                        <v-spacer></v-spacer>
                        <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
                   </template>
                </v-card-title>
                <v-card-media
                    :src="meetup.imageUrl"
                    height="400px"
                    @mouseover="showButtonUpload"
                    @mouseout="uploadButton = false"
                >
                <template v-if="uploadButton">
                    <v-btn
                    @click.native.stop="openDateDialog('image')"
                    >
                    <v-icon left>image</v-icon>
                    Change Image</v-btn>
                    <app-edit-meetup-date-dialog
                            v-if="editDateDialog"
                            @closeMeetupDateDialog="closeMeetupDateDialog"
                            :mode="modeDateDialog"
                            :meetup="meetup">
                    </app-edit-meetup-date-dialog>
                </template>
                </v-card-media>
                <v-card-text>
                    <v-list>
                        <template v-if="userIsCreator">
                            <v-list-tile>
                                <v-list-tile-action>
                                    <v-btn small 
                                    title="Click for change"
                                    @click.native.stop="openDateDialog('date')">
                                        <v-icon left>date_range</v-icon>
                                        {{meetup.date | cardGetDay}}
                                    </v-btn>                                 
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-btn small 
                                    @click.native.stop="openDateDialog('time')"
                                    title="Click for change">
                                        <v-icon left>access_time</v-icon>
                                        {{meetup.date | cardGetTime}}
                                    </v-btn>

                                </v-list-tile-content>
                            </v-list-tile>

                            <app-edit-meetup-date-dialog
                            v-if="editDateDialog"
                            @closeMeetupDateDialog="closeMeetupDateDialog"
                            :mode="modeDateDialog"
                            :meetup="meetup">
                            </app-edit-meetup-date-dialog>  


                        </template>  
                        <v-list-tile v-else>
                            <v-list-tile-content class="info--text">
                                {{meetup.date | cardMeetupDateTime}}
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>
                                Meetup location: {{meetup.location}}
                            </v-list-tile-content> 
                        </v-list-tile>                
                    </v-list> 
                    <div class="mx-3">
                        {{meetup.description}}
                    </div>
                </v-card-text>
                <v-card-actions>
                    <template v-if="userIsAuthenticated && !userIsCreator">
                        <v-spacer></v-spacer>
                        <v-btn class="primary">Register</v-btn>
                    </template>
                </v-card-actions>
              </v-card>
          </v-flex>
      </v-layout>
  </v-container>

</template>

<script>
export default {
	props: ['id'],
	data() {
		return {
			editDateDialog: false,
            modeDateDialog: null,
            uploadButton: false
		}
	},
	computed: {
		meetup() {
			return this.$store.getters.loadedMeetup(this.id);
		},
		userIsAuthenticated() {
			return (
				this.$store.getters.user !== null &&
				this.$store.getters.user !== undefined
			);
        },
		userIsCreator() {
			if (!this.userIsAuthenticated) {
				return false;
			}

			return this.$store.getters.user.id === this.meetup.creatorId;
		},
		loading() {
			return this.$store.getters.loading;
		}
	},
	methods: {
		openDateDialog(mode) {
			this.modeDateDialog = mode;
			this.editDateDialog = true;
		},
		closeMeetupDateDialog(arg) {
			this.editDateDialog = false;
			this.modeDateDialog = null;
        },
        showButtonUpload(){
            
            if(!this.userIsCreator){
                this.uploadButton = false;
                return;
            } 

            this.uploadButton = true;

        }
	}
}
</script>
