<script lang="ts">
  import { onMount } from "svelte";
  import { isSaver } from "./store";

  const INTERACTIVE_EVENTS = ["touchstart", "pointerdown", "pointerup"];
  const SCREENSAVER_TIMEOUT = 1000 * 60 * 5; // 5 minutes
  let screensaverTimeoutId;

  function screenSaver() {
    isSaver.set(true);
  }

  function resetScreenSaver() {
    isSaver.set(false);
    clearTimeout(screensaverTimeoutId); // Clear existing timeout
    screensaverTimeoutId = setTimeout(screenSaver, SCREENSAVER_TIMEOUT); // Set a new timeout
  }

  onMount(() => {
    INTERACTIVE_EVENTS.forEach((e) =>
      window.addEventListener(e, resetScreenSaver)
    );

    // Initialize the screensaver function
    screensaverTimeoutId = setTimeout(screenSaver, SCREENSAVER_TIMEOUT);

    return () => {
      // Cleanup event listeners on component unmount
      INTERACTIVE_EVENTS.forEach((e) =>
        window.removeEventListener(e, resetScreenSaver)
      );
    };
  });
</script>

<h1>Hello motherfker</h1>
