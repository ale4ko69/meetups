<template>
  <v-app>
      <v-navigation-drawer 
      app 
      temporary 
      enable-resize-watcher
      fixed
      v-model="sideNav">
        <v-list>
          <v-list-tile to="/" exact>
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              Home
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile 
          v-for="item in menuItems" 
          :key="item.title"
          :to="item.link"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              {{ item.title }}
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile 
          v-if="userIsAuthenticated"
          @click="onLogout">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              Logout
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>    
      <v-toolbar 
      app 
      dark 
      :clipped-left=false
      class="primary">
        <v-toolbar-side-icon 
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up"
        ></v-toolbar-side-icon>
        <v-toolbar-title>
         <router-link to="/" tag="span" style="cursor:pointer;">DevMeetup</router-link> 
          </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
            <v-btn flat 
            v-for="item in menuItems" 
            :key="item.title"
            :to="item.link"
            >
              <v-icon left>{{ item.icon }}</v-icon>
              {{ item.title }}
            </v-btn>
            <v-btn flat
            v-if="userIsAuthenticated"
            @click="onLogout">
              <v-icon left>exit_to_app</v-icon>
              Logout
              </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-content>
        <v-slide-x-reverse-transition>
            <router-view/>
        </v-slide-x-reverse-transition>
        
      </v-content>

      <v-footer app>
        <div class="ml-3">&copy; {{nowDate | moment("YYYY")}}</div>
      </v-footer>
  </v-app>
</template>

<script>
export default {
	data() {
		return {
			sideNav: false
		};
	},
	name: 'App',
	computed: {
		nowDate() {
			return new Date();
		},
		menuItems() {
			let menuItems = [
				{
					icon: 'supervisor_account',
					title: 'View Meetups',
					link: '/meetups'
				},
				{
					icon: 'face',
					title: 'Sign Up',
					link: '/signup'
				},
				{
					icon: 'lock_open',
					title: 'Sign In',
					link: '/signin'
				}
			];

			if (this.userIsAuthenticated) {
				menuItems = [
					{
						icon: 'supervisor_account',
						title: 'View Meetups',
						link: '/meetups'
					},
					{
						icon: 'room',
						title: 'Organize Meetup',
						link: '/meetup/new'
					},
					{
						icon: 'person',
						title: 'Profile',
						link: '/profile'
					}
				];
			}
			return menuItems;
		},
		userIsAuthenticated() {
			return (
				this.$store.getters.user !== null &&
				this.$store.getters.user !== undefined
			)
		}
	},
	methods: {
		onLogout() {
			this.$store.dispatch('logout');
    },
    handleDrop(){
      console.log("Dropped")
    }
	}
}
</script>
