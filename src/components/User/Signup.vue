<template>
<v-container>
  <v-layout row v-if="error">
    <v-flex xs12 sm6 offset-sm3 mb-3>
      <app-alert @dismissed="onDismissed" :message="error.message"></app-alert>
    </v-flex>
  </v-layout>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-toolbar class="cyan">
          <v-toolbar-title class="white--text">User Registration</v-toolbar-title>
      </v-toolbar> 
      <v-card>
        <v-card-text>
          <v-container>
            <form @submit.prevent="onSignup('signup')" data-vv-scope="signup">
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
                  v-validate="'required|confirmed:#confirmPassword'"
                  data-vv-name="password"
                  ></v-text-field>
                </v-flex>
              </v-layout>  
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                  name="confirmPassword"
                  label="Confirm Password"
                  id="confirmPassword"
                  type="password"
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
                  Sign Up</v-btn>
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
			confirmPassword: '',
			dlgMessages: null,
			dlgTitle: 'Form Errors'
		}
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
			if (value !== null && value !== undefined) {
				this.$router.push('/')
			}
		}
	},
	methods: {
		onSignup() {
			var component = this;
			this.$validator.validateAll().then(() => {
				if (!component.vverrors.any()) {
					//alert('Form Submitted!');
					this.$store.dispatch('signUserUp', {
						email: component.email,
						password: component.password
					})
				} else {
					component.dlgMessages = component.vverrors.all();
				}
			})
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

