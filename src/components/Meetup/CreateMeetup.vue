<template>
<v-container fluid grid-list-md>
  <app-alert-dialog 
    v-if="vShow"
    :dlgTitle="dlgTitle"
    :dlgMessages="dlgMessages" 
    @closeAlertDialog="closeAlertDialog">
  </app-alert-dialog>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <h2 class="primary--text">Create New Meetup</h2>
    </v-flex>
  </v-layout>
  <v-layout row>
    <v-flex xs12>
      <form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
              name="title"
              label="Title"
              id="title"
              v-model="title"
              :error-messages="vverrors.collect('title')"
              v-validate="'required'"
              data-vv-name="title"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
              name="location"
              label="Location"
              id="location"
              v-model="location"
              :error-messages="vverrors.collect('location')"
              v-validate="'required'"
              data-vv-name="location"              
              ></v-text-field>
            </v-flex>
          </v-layout>  
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                @click.native="onPickFile"
                color="blue-grey"
                class="white--text"
                raised
              >
                Upload Image
              <v-icon right dark>cloud_upload</v-icon>
              </v-btn>           
              <input 
              type="file" 
              ref="fileInput" 
              @change="onFilePiked"
              style="display:none;" 
              accept="image/*">
            </v-flex>
          </v-layout>   
          <v-layout row mt-3 mb-1 v-if="imageUrl">
            <v-flex xs12 sm6 offset-sm3 text-xs-center>
              <img :src="imageUrl" alt="" height="150" />
            </v-flex>
          </v-layout>           
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
              name="description"
              label="Description"
              id="description"
              v-model="description"
              :error-messages="vverrors.collect('description')"
              v-validate="'required'"
              data-vv-name="description"              
              multi-line
              rows="3"
              ></v-text-field>
            </v-flex>
          </v-layout> 
          <v-layout row wrap mb-2>
            <v-flex xs12 text-xs-center sm6 offset-sm3 text-md-left>
              <h2>Choose a Date & Time</h2>
            </v-flex>
          </v-layout>              
          <v-layout row wrap mb-2>
            <v-flex xs12 :class="[isMdAndDown ? 'd-flex sm8 md7' : 'lg4 offset-lg3']">
                  <v-date-picker 
                  v-model="date" 
                  :landscape="isSmAndUp" 
                  >
                  </v-date-picker>
            </v-flex>
          </v-layout>
          <v-layout row wrap mb-2>          
            <v-flex xs12 :class="[isMdAndDown ? 'd-flex sm8 md7' : 'lg4 offset-lg3']">
                  <v-time-picker 
                  v-model="time" 
                  :landscape="isSmAndUp" 
                  format="24hr">
                  </v-time-picker>
            </v-flex>              
          </v-layout>            
           
          <v-layout row mt-3>
            <v-flex xs12 :class="[isSmAndDown ? 'sm8 offset-sm2 text-xs-center' : 'sm6 offset-sm3']">
              <v-btn class="primary" 
              :disabled="vverrors.any()" 
              type="submit"
              :block="$vuetify.breakpoint.mdAndDown"
              >Create Meetup</v-btn>
            </v-flex>
          </v-layout>                                 
      </form>

    </v-flex>
  </v-layout>  
</v-container>
</template>

<script>
export default {
	data() {
		return {
			title: '',
			location: '',
			imageUrl: '',
			image: '',
			description: '',
			date: this.$moment(new Date()).format('YYYY-MM-DD'),
			time: this.$moment(new Date()).format('HH:mm'),
			dlgTitle: '',
			dlgMessages: null
		};
	},
	computed: {
		submittableDateTime() {
			const date = new Date(this.date);
			if (typeof this.time === 'string') {
				const hours = this.time.match(/^(\d+)/)[1];
				const minutes = this.time.match(/:(\d+)/)[1];
				date.setHours(hours);
				date.setMinutes(minutes);
			} else {
				date.setHours(this.time.getHours());
				date.setMinutes(this.time.getMinutes());
			}
			return date;
		},
		vShow() {
			return this.dlgMessages ? true : false;
		},
		isSmAndUp() {
			console.log('breakpoint', this.$vuetify.breakpoint);
			return this.$vuetify.breakpoint.smAndUp;
		},
		isSmAndDown() {
			return this.$vuetify.breakpoint.smAndDown;
		},
		isMdAndDown() {
			return this.$vuetify.breakpoint.mdAndDown;
		}
	},
	methods: {
		onCreateMeetup() {
			var self = this
			this.$validator.validateAll().then(() => {
				if (!self.vverrors.any() && self.image) {
					const meetupDate = {
						title: self.title,
						location: self.location,
						// imageUrl: self.imageUrl,
						image: self.image,
						description: self.description,
						// id: self.$moment(new Date()).unix(),
						date: self.submittableDateTime
					}
					self.$store.dispatch('createMeetup', meetupDate);
					self.$router.push('/meetups');
				} else {
          var imgErrors = [];
          var vvErrors  = [];
          var dlgTitle = '';
          var dlgMessages = [];

          if (!self.image) {
            dlgTitle = 'Upload Image';
            imgErrors.push('Please add a valid Image File');
          }

          if(self.vverrors.any()){
            dlgTitle = 'Form Errors';
            vvErrors = self.vverrors.all();
            imgErrors.concat(vvErrors);
          }

          dlgMessages = imgErrors.concat(vvErrors);

          self.dlgTitle = dlgTitle;
				  self.dlgMessages = dlgMessages;
					return false;
				}
			});
		},
		onPickFile() {
			this.$refs.fileInput.click();
		},
		onFilePiked(event) {
			const files = event.target.files;
			let filename = files[0].name;
			if (filename.lastIndexOf('.') <= 0) {
				this.dlgTitle = 'Upload Image';
				this.dlgMessages = ['Please add a valid Image File'];
			}

			const fileReader = new FileReader();
			fileReader.addEventListener('load', () => {
				this.imageUrl = fileReader.result;
			});

			fileReader.readAsDataURL(files[0]);
			this.image = files[0];
		},
		closeAlertDialog() {
			this.dlgTitle = '';
			this.dlgMessages = null;
		}
	},
	created() {
    //this.date = this.$moment(new Date()).format('YYYY-MM-DD');
	}
}
</script>
