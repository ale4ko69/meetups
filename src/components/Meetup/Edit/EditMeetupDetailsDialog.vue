<template>
    <v-dialog 
    persistent 
    lazy
    max-width="500" 
    @keydown.esc="onClose" 
    v-model="editDialog">
        <v-btn fab accent slot="activator">
            <v-icon>edit</v-icon>
        </v-btn>
      <v-card>
        <v-toolbar class="info">
            <v-toolbar-title class="white--text">Edit Meetup Information</v-toolbar-title>
        </v-toolbar>                     
        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-text>
                        <v-layout row>
                            <v-flex xs12>
                                <v-text-field
                                name="title"
                                label="Title"
                                id="title"
                                v-model="editedTitle"
                                :error-messages="vverrors.collect('title')"
                                v-validate="'required'"
                                data-vv-name="title"
                                ></v-text-field>

                                <v-text-field
                                name="location"
                                label="Location"
                                id="location"
                                v-model="editedLocation"
                                :error-messages="vverrors.collect('location')"
                                v-validate="'required'"
                                data-vv-name="location"
                                ></v-text-field>

                                <v-text-field
                                name="description"
                                label="Description"
                                id="description"
                                v-model="editedDescription"
                                :error-messages="vverrors.collect('description')"
                                v-validate="'required'"
                                data-vv-name="description"              
                                multi-line
                                rows="4"
                                ></v-text-field>
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
  name: "EditMeetupDetailsDialog",
  props: ["meetup"],
  components: {
  },
  data() {
    return {
      editDialog: false,
      editedTitle: this.meetup.title,
      editedLocation: this.meetup.location,
      editedDescription: this.meetup.description
    };
  },
  methods: {
    onClose() {
      this.editDialog = false;
      this.editedTitle = this.meetup.title;
      this.editedLocation = this.meetup.location;
      this.editedDescription = this.meetup.description;
    },
    onSaveChanges() {
      var component = this;
      this.$validator.validateAll().then(() => {
        if (!component.vverrors.any()) {
          component.editDialog = false;
          component.$store.dispatch("updateMeetupData", {
            id: component.meetup.id,
            title: component.editedTitle,
            location: component.editedLocation,
            description: component.editedDescription
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
