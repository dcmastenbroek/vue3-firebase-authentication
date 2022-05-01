<template>
  <div>
    <h1>
      This is a secret page. It can only be viewed by authenticated users.
    </h1>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SecretView",
});
</script>
