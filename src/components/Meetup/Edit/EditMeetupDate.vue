<template>
    <v-dialog persistent max-width="350" @keydown.esc="onClose" :value="true">
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
								<!-- Date Picker Component-->
                                <v-date-picker
                                v-model="editableDate"
                                style="width:100%"
                                color="green lighten-1"
                                actions
                                scrollable
                                v-if="mode == 'date'"
                                >
                                </v-date-picker>

								<!-- Time Picker Component-->
                                <v-time-picker
                                style="width:100%" 
                                color="green lighten-1"
                                v-model="editableTime"
                                v-if="mode == 'time'" 
                                scrollable
                                format="24hr">
                                </v-time-picker>

								<!-- Image Picker Component-->
								<template
								v-model="editableImage"
                                v-if="mode == 'image'" 
								>
								<v-layout row>
									<v-flex xs12 text-xs-center>
									<v-btn
										@click.native="onPickFile"
										color="blue-grey"
										class="white--text"
										raised
									>
										Select New Image
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
									<v-flex xs12 text-xs-center>
									<img :src="imageUrl" alt="" height="150" />
									</v-flex>
								</v-layout>									
								</template>								
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
	    <app-alert-dialog 
			v-if="vShow"
			:dlgTitle="dlgTitle"
			:dlgMessages="dlgMessages" 
			@closeAlertDialog="closeAlertDialog">
		</app-alert-dialog>
    </v-dialog>
</template>

<script>
export default {
	name: 'EditMeetupDateDialog',
	props: ['meetup', 'mode'],
	data() {
		return {
			editableDate: null,
			editableTime: null,
			image: null,
			imageUrl: '',
			dlgTitle: '',
			dlgMessages: null
		}
	},
	methods: {
		onClose() {
			//alert(this.zindex);
			this.$emit('closeMeetupDateDialog', false)
			this.clearData()
		},
		onSaveChanges() {
			const newDate = new Date(this.meetup.date)

			if (this.mode == 'date') {
				const newDay = new Date(this.editableDate).getUTCDate()
				const newMonth = new Date(this.editableDate).getUTCMonth()
				const newYear = new Date(this.editableDate).getUTCFullYear()

				newDate.setUTCDate(newDay)
				newDate.setUTCMonth(newMonth)
				newDate.setUTCFullYear(newYear)
			}

			if (this.mode == 'time') {
				const hours = this.editableTime.match(/^(\d+)/)[1]
				const minutes = this.editableTime.match(/:(\d+)/)[1]

				newDate.setHours(hours)
				newDate.setMinutes(minutes)
			}

			/** Save Date into Database */
			if (this.mode == 'time' || this.mode == 'date') {
				this.$store.dispatch('updateMeetupData', {
					id: this.meetup.id,
					date: newDate
				})
			}

			if (this.mode == 'image') {
				this.$store.dispatch('updateMeetupImage', {
					id: this.meetup.id,
					image: this.image
				})
			}

			/** Up event for close dialog */
			this.$emit('closeMeetupDateDialog', false)
			this.clearData()
		},
		clearData() {
			this.editableDate = null
			this.editableTime = null
			this.image = null
			this.imageUrl = ''
		},
		onPickFile() {
			this.$refs.fileInput.click()
		},
		onFilePiked(event) {
			const files = event.target.files
			let filename = files[0].name
			if (filename.lastIndexOf('.') <= 0) {
				this.dlgTitle = 'Upload Image'
				this.dlgMessages = ['Please add a valid Image File']
			}

			const fileReader = new FileReader()
			fileReader.addEventListener('load', () => {
				this.imageUrl = fileReader.result
			})

			fileReader.readAsDataURL(files[0])
			this.image = files[0]
		}
	},
	computed: {
		zindex() {
			var dialogs = document.getElementsByClassName('dialog__content__active')
			var zIndexMax = 0

			for (let i = 0; i < dialogs.length; i++) {
				let item = dialogs[i]
				if (item.style.zIndex > zIndexMax) {
					zIndexMax = item.style.zIndex
				}
			}
			return zIndexMax
		},
		vShow() {
			return this.dlgMessages ? true : false;
		},
	},
	created() {
		this.editableDate = this.$moment(this.meetup.date).format('YYYY-MM-DD')
		this.editableTime = this.$moment(this.meetup.date).format('HH:mm')
		this.imageUrl = this.meetup.imageUrl
	}
}
</script>