<script context="module">
  export const prerender = true;
</script>

<script>
  import { onMount } from "svelte";

  import { contracts } from "svelte-ethers-store";

  let loading = false;

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

  async function onSubmit(e) {
    if (loading) {
      return;
    }
    loading = true;
    const formData = new FormData(e.target);

    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }

    const rawResponse = await fetch("/pindata", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: data.pledgeContent,
        filetype: "text/plain",
        filename: "content.md",
      }),
    });
    const content = await rawResponse.json();
    console.log(content);

    console.log(content);
    console.log(data);
    // 1 upload file data and get the ipfs hash
    // 2 submit data using ethers
    // const tx = await $contracts.GetSponsortETH.create(data.username, $signerAddress, data.signature);
    loading = false;
  }
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
    <div
      class="text-center lg:text-left lg:ml-8 new-proposal-container max-w-sm"
    >
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
        <form on:submit|preventDefault={onSubmit}>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input
              type="text"
              name="pledgeName"
              placeholder="Tell your sponsors who are you"
              class="input input-bordered"
            />
          </div>
          <div class="flex flex-row align-baseline" style="   ">
            <div class="form-control ">
              <label class="label">
                <span class="label-text">Duration of the pledge</span>
              </label>
              <input
                type="number"
                name="pledgeDuration"
                placeholder="Time in hours"
                class="input input-bordered"
                min="0"
              />
            </div>
          </div>

          <!-- checkbox for persisting over time, text right to the checkbox-->
          <div class="form-control  flex flex-row items-center" style="">
            <!-- <label class="label justify-start">
                          <input
                            type="checkbox"
                            name="pledgeForever"
                            class="input input-bordered mr-1"
                          />
                          <span class="label-text">Persist over time</span>
                        </label> -->
            <label
              class="material-checkbox-container label  "
              style="    min-width: 30px;"
            >
              <input type="checkbox" name="pledgeForever" />
              <span class="material-checkbox" />
            </label>
            <span class="label-text ml-1"
              >The sponsoring period never expires</span
            >
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Pledge</span>
            </label>
            <textarea
              name="pledgeContent"
              placeholder="Tell why you want to be sponsored. {'\n'}Note: You can use Markdown"
              class="h-24 input input-bordered pt-2"
            />
            <!-- <label class="label">
            <p href="#" class="label-text-alt">
              .md is available for formatting
            </p>
          </label> -->
          </div>

          <div class="form-control mt-6">
            <button class="button-charming btn" class:loading
              >Create pledge</button
            >
          </div>
        </form>
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
    max-width: none; /* remove max-width on 1000px or more TODO*/
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

  .material-checkbox-container {
    cursor: pointer;
    /* padding: 0 1rem; */
  }

  .material-checkbox-container > input {
    position: absolute;
    transform: scale(0);
  }

  .material-checkbox-container > .material-checkbox {
    display: block;
    width: 21px;
    height: 21px;
    border: 2px solid rgba(255, 255, 255, 0.175);
    transition: all 0.35s;
  }

  .material-checkbox-container > input:checked ~ .material-checkbox {
    transform: rotate(45deg) translate(2px, -2px);
    width: 7.5px;
    border-color: #1ac0a2;
    border-top-color: transparent;
    border-left-color: transparent;
  }

  .form-control {
    padding: 0.4rem 0;
  }
</style>
