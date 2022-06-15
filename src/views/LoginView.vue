<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Login</h1>

    <div v-if="showAlert" class="mb-4">{{ alertMessage }}</div>

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
import { defineComponent, ref } from "vue";
import {
  Field as VeeField,
  Form as VeeForm,
  ErrorMessage as VeeErrorMessage,
} from "vee-validate";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LoginView",

  components: {
    VeeField,
    VeeForm,
    VeeErrorMessage,
  },

  setup() {
    const store = useAuthStore();
    const router = useRouter();

    const schema = {
      email: "required|email|min:8|max:100",
      password: "required|min:8|max:100",
    };

    let showAlert = ref(false);
    let alertMessage = ref("");

    function onLogin(values, { setFieldValue, resetForm }) {
      const data = {
        email: values.email,
        password: values.password,
      };

      store
        .login(data)
        .then((userCredentials) => {
          alertMessage.value =
            "Logged in successfully. You will be redirected to the home page.";
          showAlert.value = true;
          store.user = userCredentials.user;
          resetForm();

          setTimeout(() => {
            router.push({ name: "home" });
          }, 2000);
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              alertMessage.value = "Invalid email";
              setFieldValue("email", "");
              break;
            case "auth/user-not-found":
              alertMessage.value = "No account with that email was found";
              setFieldValue("email", "");
              break;
            case "auth/wrong-password":
              alertMessage.value = "Incorrect password";
              break;
            default:
              alertMessage.value = "Email or password was incorrect";
              break;
          }
          showAlert.value = true;
          setFieldValue("password", "");
        });
    }

    return { schema, showAlert, alertMessage, onLogin };
  },
});
</script>
