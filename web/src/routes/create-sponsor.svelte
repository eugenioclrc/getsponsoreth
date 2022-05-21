<script context="module">
	export const prerender = true;
</script>
<script>
  import { onMount } from 'svelte';

  const backgroundImages = [
    "joshua-earle-Hn8N4I4eHA0-unsplash.jpg",
    "natalie-runnerstrom-SZlgOP7bSnI-unsplash.jpg",
    "oliver-spicer-NmPNw8w_a24-unsplash.jpg",
    "xan-griffin-eA2t5EvcxU4-unsplash.jpg",
  ];



  //function for getting a random string of backgroundImages

  let randomIndex = 0;
  onMount(() => {
    randomIndex = Math.floor(Math.random() * backgroundImages.length);
  });

  $: backgroundImage = backgroundImages[randomIndex];

</script>

<link
  rel="stylesheet"
  href="https://cdn.tailgrids.com/tailgrids-fallback.css"
/>

<div
  class="hero min-h-screen bg-base-200 bg-cover"
  style="background-image: url({backgroundImage});"
>
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left lg:ml-8 new-proposal-container">
      <h1 class="text-5xl font-bold shadow-text ">New proposal</h1>
      <p class="py-6  shadow-text">
        Create your own pledge proposal and get your own sponsor!
      </p>
    </div>
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 ">
      <div class="card-body flex flex-col p-6">
        <div class="logo-container">
          <a href="/"><img alt="sponsor.eth" /></a>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Let everybody know you"
            class="input input-bordered"
          />
        </div>
        <div class="flex flex-row align-baseline" style="    align-items: end;">
          <div class="form-control ">
            <label class="label">
              <span class="label-text">Time in hours</span>
            </label>
            <input
              type="number"
              placeholder="Duration of the pledge"
              class="input input-bordered"
            />
          </div>
          <!-- checkbox for persisting over time, text right to the checkbox-->
          <div class="form-control w-2/3 " style="align-items: end;">
            <label class="label justify-start">
              <input type="checkbox" class="input input-bordered mr-1" />
              <span class="label-text">Persist over time</span>
            </label>
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Pledge</span>
          </label>
          <textarea
            placeholder="Tell why you want to be a sponsored"
            class="h-24 input input-bordered pt-2"
          />
          <!-- <label class="label">
            <p href="#" class="label-text-alt">
              .md is available for formatting
            </p>
          </label> -->
        </div>

        <div class="form-control mt-6">
          <button class="button-charming">Create pledge</button>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .shadow-text {
    /* text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; */
    color: #1b1b1b !important;
  }

  .new-proposal-container {
    background: rgba(239, 223, 223, 0.55);
    box-shadow: 1 8px 32px 0 rgba(35, 35, 42, 0.37);
    backdrop-filter: blur(2.5px);
    -webkit-backdrop-filter: blur(15.5px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    padding: 2rem;
  }

  .button-charming {
    height: 3rem;
    border-radius: 1.5rem;
    padding: 0 2rem;
    background: linear-gradient(-45deg, #9925ea, #338aff, #9925ea);
    background-size: 400%;
    background-position: 90% 0;
    color: #fff;
    transition: background 0.8s;
  }

  .button-charming:hover {
    background-position: 185% 50%;
  }
</style>
