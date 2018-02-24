<template>
  <v-layout row justify-center>
    <v-dialog :value="true" persistent max-width="400">
      <v-card>
        <v-toolbar class="info">
            <v-toolbar-title class="white--text">{{dlgTitle}}</v-toolbar-title>
        </v-toolbar> 
        <v-card-text>
            <v-list class="dialog__alert">
                <template v-for="(item, index) in dlgMessages">
                <v-list-tile :key="index">
                    <v-list-tile-content>
                    <v-list-tile-title>- {{item}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                </template>
            </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue white--text" @click.native="closeAlertDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
	name: 'AlertDialog',
	props: ['dlgTitle', 'dlgMessages'],
	data() {
		return {
			editDialog: false
		}
	},
	computed: {},
	methods: {
		closeAlertDialog() {
			this.$emit('closeAlertDialog', false)
		}
	}
}
</script>


