<template>
  <v-container fluid>
      <v-layout row wrap class="mb-2 hidden-xs-only">
          <v-flex xs12 :class="['text-xs-center', userIsAuthenticated ? 'sm6 text-sm-right' : '']">
              <v-btn large router to="/meetups" class="primary">
                  Explore Meetups
              </v-btn>
          </v-flex>

          <v-flex xs12 sm6 class="text-xs-center text-sm-left" v-if="userIsAuthenticated">
              <v-btn large router to="/meetup/new" class="primary">
                  Organize Meetup
              </v-btn>
          </v-flex>

      </v-layout>
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
        <template v-if="!loading">
        <v-layout row wrap>  
            <v-flex xs12 md8 offset-md2>
                <v-carousel style="cursor:pointer;">
                    <v-carousel-item 
                    v-for="meetup in meetups" 
                    v-bind:src="meetup.imageUrl" 
                    :key="meetup.id"
                    @click="onLoadMeetup(meetup.id)">
                        <div class="title text-xs-center">
                            {{meetup.title}}
                        </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>  
        <v-layout row wrap class="mt-4">
            <v-flex xs12 class="text-xs-center">
                <p>
                    This defines the ability for a flex item to grow if necessary. It accepts a unitless value that serves as a proportion. It dictates what amount of the available space inside the flex container the item should take up.
                </p>   
                <p> 
                    If all items have flex-grow set to 1, the remaining space in the container will be distributed equally to all children. If one of the children has a value of 2, the remaining space would take up twice as much space as the others (or it will try to, at least).
                </p>
            </v-flex>
        </v-layout> 
        </template> 
  </v-container>
</template>
<script>
export default {
	computed: {
		meetups() {
			return this.$store.getters.featuredMeetups;
		},
		loading() {
			return this.$store.getters.loading;
		},
		userIsAuthenticated() {
			return (
				this.$store.getters.user !== null &&
				this.$store.getters.user !== undefined
			)
		}
	},
	methods: {
		onLoadMeetup(id) {
			this.$router.push('/meetup/' + id);
		}
	}
};
</script>

<style scoped>
.title {
	background-color: rgba(0, 0, 0, 0.5);
	color: white;
	font-size: 2em;
	padding: 20px;
}
</style>

