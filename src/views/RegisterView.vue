<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Create an Account</h1>

    <vee-form
      @submit="onRegister"
      :validation-schema="schema"
      class="space-y-4"
    >
      <div>
        <vee-field type="email" name="email" placeholder="Email" />
        <vee-error-message name="email" class="block text-red-500" />
      </div>

      <div>
        <vee-field type="password" name="password" placeholder="Password" />
        <vee-error-message name="password" class="block text-red-500" />
      </div>

      <div>
        <vee-field
          type="password"
          name="password_confirm"
          placeholder="Confirm password"
        />
        <vee-error-message name="password_confirm" class="block text-red-500" />
      </div>

      <button
        type="submit"
        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 transition text-white font-bold rounded"
      >
        Register
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
  name: "RegisterView",

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
      password_confirm: "confirmed:@password",
    };

    function onRegister(values) {
      const data = {
        email: values.email,
        password: values.password,
      };

      store.register(data);
    }

    return { schema, onRegister };
  },
});
</script>
