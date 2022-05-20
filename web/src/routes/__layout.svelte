<script>
  import "../app.css";

  import { onMount } from 'svelte';
import { init } from "$lib/web3";

  onMount(() => {
    init();
  })
</script>

<svelte:head>
  <!-- this is for the web3modal -->
  <script type="text/javascript" src="https://unpkg.com/web3modal@1.9.0/dist/index.js"></script>
  <script type="text/javascript" src="https://unpkg.com/@walletconnect/web3-provider@1.2.1/dist/umd/index.min.js"></script>
</svelte:head>
<slot />
