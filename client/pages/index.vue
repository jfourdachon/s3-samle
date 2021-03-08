<template>
  <div class="container mt-5 d-flex flex-column">
    <b-form-file type="file" class="mb-3" v-model="file"></b-form-file>
    <div class="d-flex flex-row mb-5">
      <b-button variant="primary" @click="uploadFile">Valider</b-button>
      <b-button variant="success" class="ml-4" @click="getS3FileContent">getImage</b-button>
    </div>
    <b-img v-if="imageUrl" :src="`data:${mimeType};base64,${imageUrl}`"></b-img>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      file: null,
      baseUrl: 'http://localhost:4000',
      path: null,
      imageUrl: null,
      mimeType: 'image/png',
    }
  },
  methods: {
    async getSignedRequest(fileType, path, isPrivate) {
      return axios.get(this.baseUrl + '/file/get-signed-request-put?fileName=' + path + '&fileType=' + fileType + '&bucket=' + isPrivate, {
        headers: {
          'Content-Type': fileType,
          // 'Authorization': 'JWT ' + $cookies.get('token')
        },
      })
    },
    async uploadFile() {
      try {
        // create file in api
        this.path = 'recettes/' + this.file.name + '/' + Date.now() + 'img.png'
        const signature = await this.getSignedRequest(this.file.type, this.path, false)
        if (!signature.status) {
          //return error
        }
        await axios.put(signature.data.data, this.file, {
          headers: {
            'Content-Type': this.file.type,
          },
        })
        return true
      } catch (err) {
        return this.$nuxt.error({ statusCode: 500, message: err.message })
      }
    },
    async getS3FileContent() {
      const response = await axios.get(this.baseUrl + '/file/get-file-content?key=' + this.path)
      this.imageUrl = new Buffer.from(response.data.file.data).toString('base64')
    },
  },
  //   mounted() {
  //     this.fetchdata()
  //   },
}
</script>
