<template>
  <v-container>
      <v-layout row>  
          <v-flex xs12 class="text-xs-center"> 
              <v-progress-circular indeterminate 
              color="primary"
              :width="7"
              :size="70"
               v-if="loading"
              ></v-progress-circular>     
          </v-flex>
      </v-layout>
      <v-layout row wrap class="mb-2" v-if="!loading">
          <v-flex xs12 sm10 md8 offset-sm1 offset-md2 v-for="meetup in meetups" :key="meetup.id" class="mb-2">
            <v-card class="light-blue accent-1" >
              <v-container fluid>
                <v-layout row wrap>
                  <v-flex xs5 sm4 md3>
                    <v-card-media
                      :src="meetup.imageUrl"
                      height="130px">
                    </v-card-media>
                  </v-flex>
                  <v-flex xs7 sm8 md9>
                      <v-card-title class="py-0">
                        <h3 class="mb-0">{{meetup.title}}</h3>
                      </v-card-title>
                      <v-card-text class="py-1">
                        <div>{{meetup.location}} | {{meetup.date | cardMeetupDate}}</div>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn flat :to="'/meetup/' + meetup.id">
                          <v-icon left>arrow_forward</v-icon>
                          <h5>View Meetup</h5>
                        </v-btn>
                      </v-card-actions>
                  </v-flex>

                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.loadedMeetups
    },
		loading() {
			return this.$store.getters.loading
		}
  }
};
</script>
