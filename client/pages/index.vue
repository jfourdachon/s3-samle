<template>
  <div class="container mt-5">
    <b-form-file type="file" class="mb-3" v-model="file"></b-form-file>
    <b-button variant="primary" @click="uploadFile">Valider</b-button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      file: null,
      baseUrl: 'http://localhost:4000'
    }
  },
  methods: {
        async getSignedRequest (fileType, path, isPrivate) {
            return axios.get(this.baseUrl + '/file/get-signed-request-put?fileName=' + path + '&fileType=' + fileType + '&bucket=' + isPrivate, {
                headers: {
                    'Content-Type': fileType,
                    // 'Authorization': 'JWT ' + $cookies.get('token')
                }
            });
        },
        async uploadFile () {
            try {
                // create file in api
                const path = 'recettes/' + this.file.name + '/' + Date.now() + 'img.png';
                const signature = await this.getSignedRequest(this.file.type, path, false);
                if(!signature.status) {
                    //return error
                }
                console.log({signature})
                await axios.put(signature.data.data, this.file, {
                    headers: {
                        'Content-Type': this.file.type
                    }
                });
                console.log('ca passe')
            } catch (err) {
                return this.$nuxt.error({ statusCode: 500, message: err.message });
            }
        },
    },
//   mounted() {
//     this.fetchdata()
//   },
}
</script>
