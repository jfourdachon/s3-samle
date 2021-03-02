<template>
  <div class="container mt-5">
    <b-form-file type="file" class="mb-3" v-model="file"></b-form-file>
    <b-button variant="primary" @click="handleFile">Valider</b-button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      file: null,
    }
  },
  methods: {
    async handleFile() {},
    async fetchdata() {
      try {
        const data = await axios.get('http://localhost:4000/')
        console.log({ data })
      } catch (error) {
        console.log({ error })
      }
    },
  },
  mounted() {
    this.fetchdata()
  },
}
</script>
