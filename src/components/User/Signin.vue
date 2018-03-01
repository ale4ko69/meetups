<template>
<v-container>
  <v-layout row v-if="error" >
    <v-flex xs12 sm6 offset-sm3 mb-3>
      <app-alert @dismissed="onDismissed" :message="error.message"></app-alert>
    </v-flex>
  </v-layout>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-toolbar class="cyan">
          <v-toolbar-title class="white--text">User Sign In</v-toolbar-title>
      </v-toolbar> 
      <v-card>
        <v-card-text>
          <v-container>
            <form @submit.prevent="onSignin('signin')" data-vv-scope="signin">
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                  name="email"
                  label="E-Mail"
                  id="email"
                  v-model="email"
                  :error-messages="vverrors.collect('email')"
                  v-validate="'required|email'"
                  data-vv-name="email"
                  data-vv-delay="500"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                  name="password"
                  label="Password"
                  id="password"
                  type="password"
                  v-model="password"
                  :error-messages="vverrors.collect('password')"
                  v-validate="'required'"
                  data-vv-name="password"
                  ></v-text-field>
                </v-flex>
              </v-layout>  
              <v-layout row>
                <v-flex xs12>
                  <v-btn 
                  type="submit" 
                  class="cyan"
                  :loading="loading"
                  :disabled="loading">
                  Sign In</v-btn>
                </v-flex>              
              </v-layout>

              <app-alert-dialog 
              v-if="vShow"
              :dlgTitle="dlgTitle"
              :dlgMessages="dlgMessages" 
              @closeAlertDialog="closeAlertDialog">
              </app-alert-dialog>

            </form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
	data() {
		return {
			email: '',
			password: '',
			dlgMessages: null,
			dlgTitle: 'Form Errors'
		};
	},
	computed: {
		user() {
			return this.$store.getters.user
		},
		error() {
			return this.$store.getters.error
		},
		loading() {
			return this.$store.getters.loading
		},
		vShow() {
			return this.dlgMessages ? true : false
		}
	},
	watch: {
		user(value) {
			var query = this.$router.currentRoute.query;
			var redirectPath = '/';

			if (value !== null && value !== undefined) {
				if (query.redirect) {
					redirectPath = query.redirect;
				}

				this.$router.push(redirectPath);
			}
		}
	},
	methods: {
		onSignin() {
			var component = this;
			this.$validator.validateAll().then(() => {
				if (!component.vverrors.any()) {
					component.$store.dispatch('signUserIn', {
						email: component.email,
						password: component.password
					})
				} else {
					component.dlgMessages = component.vverrors.all();
				}
			});
		},
		closeAlertDialog(dialog) {
			this.dlgMessages = null;
		},
		onDismissed() {
			this.$store.dispatch('clearError');
		}
	}
}
</script>

