<template>
    <v-alert color="error" icon="warning" dismissible @input="onClose" :value="true">
      {{message}}
    </v-alert>
</template>
<script>
export default {
	props: ['message'],
	methods: {
		onClose() {
			this.$emit('dismissed')
		}
	}
}
</script>
