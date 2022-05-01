<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Login</h1>

    <vee-form @submit="onLogin" :validation-schema="schema" class="space-y-4">
      <div>
        <vee-field type="email" name="email" placeholder="Email" />
        <vee-error-message name="email" class="block text-red-500" />
      </div>

      <div>
        <vee-field type="password" name="password" placeholder="Password" />
        <vee-error-message name="password" class="block text-red-500" />
      </div>

      <button
        type="submit"
        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 transition text-white font-bold rounded"
      >
        Login
      </button>
    </vee-form>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {
  Field as VeeField,
  Form as VeeForm,
  ErrorMessage as VeeErrorMessage,
} from "vee-validate";
import { useAuthStore } from "../stores/auth";

export default defineComponent({
  name: "LoginView",

  components: {
    VeeField,
    VeeForm,
    VeeErrorMessage,
  },

  setup() {
    const store = useAuthStore();

    const schema = {
      email: "required|email|min:8|max:100",
      password: "required|min:8|max:100",
    };

    function onLogin(values) {
      const data = {
        email: values.email,
        password: values.password,
      };

      store.login(data);
    }

    return { schema, onLogin };
  },
});
</script>
