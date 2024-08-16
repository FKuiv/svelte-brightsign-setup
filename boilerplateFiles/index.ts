import { addMessages, init } from "svelte-i18n";

import en from "./en.json";
import et from "./et.json";

addMessages("en", en);
addMessages("et", et);

export default init({
  fallbackLocale: "et",
  initialLocale: "et",
});
