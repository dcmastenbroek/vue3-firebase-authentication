import { defineRule } from "vee-validate";
import { required, email, min, max, confirmed } from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("confirmed", confirmed);
