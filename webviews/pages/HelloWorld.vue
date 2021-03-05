<template>
  <div class="example">{{ messageToUpper }}</div>
</template>

<script>
import {getHelloWorld} from "./foo";
export default {
  data () {
    return {
      message: getHelloWorld()
    }
  },
  computed: {
    messageToUpper() { // Computed Property returns a string
      return this.message.toUpperCase();
    }
  }  
}
</script>