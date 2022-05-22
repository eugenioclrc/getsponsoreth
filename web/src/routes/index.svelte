<script context="module">
  export const prerender = true;
</script>

<script>
  import { connected, signerAddress } from "svelte-ethers-store";

  import SvgCheck from "$lib/svgCheck.svelte";
  import { onConnect, onDisconnect } from "$lib/web3";
</script>

<div class="">
  <div
    class="from-primary to-secondary text-primary-content -mt-[4rem] grid place-items-center items-end bg-gradient-to-br pt-20"
  >
    <div
      class="hero-content col-start-1 row-start-1 w-full max-w-7xl flex-col justify-between gap-10 pb-20 lg:flex-row lg:items-end lg:gap-0 xl:gap-20"
    >
      <div class="lg:px-10 lg:pb-12">
        <h1 class="font-title mb-2 py-4 font-extrabold lg:py-10">
          {#if $connected}
            <div class="floating-button-container btn btn-tertiary ">
              <!-- content -->
              <button class="floating-button-wallet" on:click={onDisconnect}>
                {$signerAddress.slice(0, 4)}...{$signerAddress.slice(-4)}
                <span class="floating-button-address" />
              </button>
            </div>
          {/if}
          <!-- <div class="logo-container  ">
            <a href="/"
              ><img
                class="logo-image"
                src="./sponsrethgold2.png"
                alt="sponsor.eth"
              /></a
            >
          </div> -->

          <div class="mb-2 text-5xl lg:text-7xl title_sponsoreth">
            get_sponsor.eth
          </div>
          <div class="text-2xl lg:text-3xl pt-4 subtitle_sponsoreth">
            Engage with the community to make your dreams come true!<br />
            <!-- somethnig more here??-->
          </div>
        </h1>
        <div
          class="flex w-full flex-col items-start space-y-10 lg:flex-row lg:space-x-4 lg:space-y-0"
        >
          <div
            class="my-2 flex max-w-sm flex-col gap-2 text-left padding-small-screen"
          >
            <div class="flex gap-2">
              <SvgCheck />
              Easy to use and made for everyone
            </div>
            <div class="flex gap-2">
              <SvgCheck />
              Directly sponsor causes with your funds
            </div>
            <div class="flex gap-2">
              <SvgCheck />
              Stake funds to generate passive income for a cause
            </div>
            <div class="flex gap-2">
              <SvgCheck />
              Compatible with a wide range of tokens
            </div>
          </div>
        </div>
        <div
          class="starting-buttons mt-4 flex flex-1 pt-6 justify-center space-x-2 sm:justify-start lg:mt-6 lg:justify-start"
        >
          {#if !$connected}
            <button
              on:click={onConnect}
              class="btn button-first-section btn-ghost btn-active lg:btn-lg normal-case"
            >
              Connect
            </button>
            <!-- <a href="#how" class="btn lg:btn-lg normal-case">How does it work?</a> -->
          {:else}
            <a
              href="/create-sponsor"
              class="btn button-first-section btn-ghost btn-active lg:btn-lg normal-case"
            >
              Create pledge
            </a>
            <a
              href="/your-pledges"
              class="btn button-first-section lg:btn-lg normal-case"
              >My pledges</a
            >
          {/if}
          <a
            href="/browse-causes"
            class="btn btn-tertiary button-first-section btn-active lg:btn-lg normal-case"
          >
            Pledge List
          </a>
        </div>
      </div>
    </div>
    <svg
      class="fill-secondary col-start-1 row-start-1 h-auto w-full"
      width="1600"
      height="595"
      viewBox="0 0 1600 595"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 338L53.3 349.2C106.7 360.3 213.3 382.7 320 393.8C426.7 405 533.3 405 640 359.3C746.7 313.7 853.3 222.3 960 189.2C1066.7 156 1173.3 181 1280 159.2C1386.7 137.3 1493.3 68.7 1546.7 34.3L1600 0V595H1546.7C1493.3 595 1386.7 595 1280 595C1173.3 595 1066.7 595 960 595C853.3 595 746.7 595 640 595C533.3 595 426.7 595 320 595C213.3 595 106.7 595 53.3 595H0V338Z"
      />
    </svg>
  </div>

  <!-- {$signerAddress} -->

  <div
    class="hero bg-base-100 text-base-content mx-auto min-h-screen max-w-md md:max-w-full"
  >
    <div class="hero-content px-4 text-center md:px-0">
      <div id="how">
        <h2 class="mt-32 mb-2 text-4xl font-extrabold md:text-6xl">
          How does it work?
        </h2>
        <h3 class="mb-5 text-3xl font-bold">
          As simple as a regular transaction
        </h3>
        <p class="mx-auto mb-5 w-full max-w-lg">
          getsponsor.eth aims to help devs and content creators to gather enough
          funds to make their projects blossom
        </p>

        <p />
        <div class="mt-10 mb-20 flex flex-col lg:flex-row">
          <div class="flex w-full flex-col text-left">
            <div class=" mx-auto w-full max-w-xs flex-grow sm:max-w-md">
              Users can both <b>create a cause</b> or <b>browse causes</b>
              available for sponsoring. To get sponsored, follow these steps:
              <ul class="steps steps-vertical">
                <li class="step"><b>Create your cause</b></li>
                <li class="step">
                  Update your main page in markdown format, upload to IPFS and
                  pin it with to Storj. Add as much detail as possible, as you
                  want to gather catch the attention of the community
                </li>
                <li class="step">
                  Share it with your community. There are people out there
                  wanting to help you!
                </li>
                <li class="step">
                  Make sure to keep the community updated about your project!
                </li>
              </ul>
            </div>
            <div class="mt-4 flex h-16 items-start justify-center">
              <a
                class="btn-what-is-a-cause inline-block cursor-pointer rounded-md bg-indigo-600 px-4 py-3 text-center text-sm
                     font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-indigo-700"
                href="#cause">What is a cause?</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="hero from-primary to-accent text-primary-content min-h-screen bg-gradient-to-br"
    id="private"
  >
    <div class="hero-content mx-auto max-w-md text-center md:max-w-full">
      <div id="cause">
        <h2 class="mt-20 mb-12 text-4xl font-extrabold md:text-6xl">
          What is a cause?
        </h2>
        <!-- <h3 class="mb-5 text-3xl font-bold">Lorem ipsum</h3> -->
        <p class="mx-auto mb-5 w-full regular-text lh-regular">
          A cause can be any project you can think off: an application, a trip
          to a Web3 developer event, a medical emergency, a present, etc...<br
          />

          It is in the hands of the community to sponsor your cause, so we
          recommend active engagement with your community and cause.
        </p>

        <div class="my-20 flex flex-col custom-button-centered">
          <a class="btn btn-tertiary  rounded-full" href="/create-sponsor"
            >Create your first cause!</a
          >
        </div>
      </div>
    </div>
  </div>

  <div
    class="hero from-primary to-accent text-primary-content min-h-screen bg-gradient-to-br"
    id="private"
  >
    <div class="hero-content mx-auto max-w-md text-center md:max-w-full">
      <div>
        <h2 class="mt-20 mb-8  text-4xl font-extrabold md:text-6xl">
          Browse causes
        </h2>
        <h3 class="mb-5 text-3xl font-bold regular-text-title">
          Looking for causes to sponsor? This is your place!
        </h3>
        <p class="mx-auto mb-5 w-full max-w-l regular-text-smaller">
          Search causes by means of their title, keywords or public address.<br
          />
          Additionally filter causes by category, publication date, expiry date or
          completion progress. Or explore a random uncompleted cause by means of
          the mistery button.
        </p>

        <div
          class="my-20 flex flex-col md:flex-row custom-button-centered space-between md:gap-4"
        >
          <a
            class="btn  btn-tertiary btn-outline rounded-full w-full md:w-1/2"
            href="/mistery-causes">Mistery button</a
          >
          <br />
          <a
            class="btn btn-primary rounded-full w-full md:w-1/2 "
            href="/browse-causes">Browse causes!</a
          >
        </div>
      </div>
    </div>
  </div>
  <!--
        <div class="hero bg-base-200 text-base-content min-h-screen py-10">
          <div class="hero-content mx-auto w-full max-w-md text-center md:max-w-full">
            <div class="w-full">
              <h2 class="mt-20 mb-2 text-4xl font-extrabold md:text-6xl">Try it online</h2>
              <p class="mx-auto mb-5 w-full md:max-w-lg">Use daisyUI file from CDN</p>
              <div class="mx-auto my-2 w-full max-w-sm md:max-w-md lg:max-w-2xl">
                <div
                  class="mockup-code bg-neutral-focus mx-auto w-full max-w-xs text-left text-sm shadow-lg sm:max-w-none">
                  <pre><code>
    <span class="text-neutral-content text-opacity-40">&lt;link href=&quot;</span>https://cdn.jsdelivr.net/npm/daisyui@2.13.6/dist/full.css<span class="text-neutral-content text-opacity-40">&quot; rel=&quot;stylesheet&quot; type=&quot;text/css&quot; /&gt;</span>
    <span class="text-neutral-content text-opacity-40">&lt;script src=&quot;</span>https://cdn.tailwindcss.com<span class="text-neutral-content text-opacity-40">&quot;&gt;&lt;/script&gt;</span>
  
  </code></pre>
                </div>
              </div>
              <p class="mx-auto mt-10 mb-5 max-w-lg">Or try it online:</p>
              <div class="flex flex-wrap justify-center gap-2"><a target="_blank" rel="noopener" href="/codepen"
                  class="btn-outline btn gap-3 normal-case"><svg class="h-4 w-4 stroke-current" viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg" fill="none" stroke-width="2.3" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path
                      d="M3.06 41.732L32 60.932l28.94-19.2V22.268L32 3.068l-28.94 19.2zm57.878 0L32 22.268 3.06 41.732m0-19.463L32 41.47l28.94-19.2M32 3.068v19.2m0 19.463v19.2"
                      stroke-width="6.05"></path>
                  </svg>
                  CodePen
                </a>
                <a href="/tailwindplay" class="btn-outline btn gap-3 normal-case" target="_blank" rel="noopener"><svg
                    class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 54 33">
                    <g clip-path="url(#prefix__clip0)">
                      <path fill="#38bdf8" fill-rule="evenodd"
                        d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
                        clip-rule="evenodd"></path>
                    </g>
                    <defs>
                      <clipPath id="prefix__clip0">
                        <path fill="#fff" d="M0 0h54v32.4H0z"></path>
                      </clipPath>
                    </defs>
                  </svg>
                  Tailwind Play
                </a>
                <a sveltekit:prefetch href="/docs/install/" class="btn-outline btn gap-3 normal-case">
                  <div class="flex"><img class="w-5" src="/logos/react.svg" alt="React" loading="lazy">
                    <img class="w-5" src="/logos/vue.svg" alt="Vue" loading="lazy">
                    <img class="w-5" src="/logos/svelte.svg" alt="Svelte" loading="lazy"></div>
                  More examples
                  <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path
                      d="M 18.71875 6.78125 L 17.28125 8.21875 L 24.0625 15 L 4 15 L 4 17 L 24.0625 17 L 17.28125 23.78125 L 18.71875 25.21875 L 27.21875 16.71875 L 27.90625 16 L 27.21875 15.28125 Z">
                    </path>
                  </svg>
                </a></div>
            </div>
          </div>
        </div>
        <div class="hero bg-base-100 text-base-content mx-auto min-h-screen max-w-md md:max-w-full">
          <div class="hero-content text-center">
            <div class="w-full max-w-md">
              <h2 class="mt-20 mb-2 text-4xl font-extrabold md:text-6xl">Install daisyUI</h2>
              <p class="mx-auto mt-5 w-full max-w-lg">Pure CSS. Works on all frameworks. daisyUI can be used as a Tailwind
                CSS plugin or as an independent CSS library</p>
              <p class="mx-auto mt-5 w-full max-w-lg text-left">1. Install daisyUI as a Node package:</p>
              <div class="mx-auto my-2 w-full max-w-md">
                <div class="mockup-code mx-auto w-full max-w-xs text-left shadow-lg sm:max-w-none">
                  <pre data-prefix="$"><code>npm i daisyui</code></pre>
                </div>
                <p class="mx-auto mt-5 w-full max-w-lg text-left">2. Add daisyUI to Tailwind CSS as a plugin:</p>
                <div class="my-2 w-full max-w-4xl">
                  <div class="mockup-code mx-auto w-full max-w-xs text-left text-sm shadow-lg sm:max-w-none">
                    <pre><code><span class="text-neutral-content text-opacity-40">// tailwind.config.js</span>
    </code></pre>
                  </div>
                </div>
                <a href="/docs/install" class="btn-primary btn btn-wide mt-4 mb-20 shadow-lg">Install guide</a>
              </div>
            </div>
          </div>
        </div>
        -->
</div>

<style>
  .step {
    text-align: left;
  }

  .custom-button-centered {
    max-width: 550px;
    margin-left: auto;
    margin-right: auto;
  }

  .floating-button-container {
    position: fixed;
    top: 1.5rem;
    right: 2rem;
    border-radius: 8px;
  }

  /* .floating-button-container:after {
    content: "x";
    font-size: 8px;
    position: relative;
    width: 0;
    height: 0;
    top: -22px;
    right: -4px;
  } */

  .btn-what-is-a-cause {
    padding: 1rem 4.2rem;
    font-size: 16px;
    border-radius: 35px;
    white-space: nowrap;
    /* min-height: 4rem; */
  }

  .lh-regular {
    line-height: 1.5;
  }

  .regular-text {
    font-size: 22px;
    max-width: 60%;
  }

  .regular-text-smaller {
    font-size: 20px;
    max-width: 60%;
  }

  .regular-text-title {
    font-size: 28px;
    max-width: 60%;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    font-weight: 500;
    margin-bottom: 2rem;
  }

  .logo-image {
    border-radius: 35px;
    max-width: 165px;
    /* margin-left: auto; */
    margin-right: auto;
    transition: ease 0.5s;
    margin-top: -2rem;
  }

  .starting-buttons {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .starting-buttons > * {
    margin: 0;
  }

  .button-charming {
    height: 3rem;
    border-radius: 8px;
    padding: 0 2rem;
    background: linear-gradient(-45deg, #9925ea, #338aff, #9925ea);
    background-size: 400%;
    background-position: 90% 0;
    color: #fff;
    transition: background 0.8s;
    border: none;
  }

  .button-charming:hover {
    background-position: 185% 50%;
  }

  .button-first-section {
    min-width: 250px;
    transition: 0.5s ease;
  }

  .button-first-section:hover {
    /*  */
    filter: brightness(0.8);
  }

  @media (max-width: 768px) {
    .max-w-md {
      max-width: 100%;
    }

    .custom-button-centered > button {
      max-width: 90%;
      margin-left: auto;
      margin-right: auto;
    }

    .regular-text-smaller,
    .regular-text-title,
    .regular-text {
      max-width: 90%;
    }

    .padding-small-screen {
      padding: 1rem 0;
    }

    button,
    a {
      min-width: 200px;
    }
  }

  @media (max-width: 576px) {
    .button-first-section {
      min-width: 180px;
    }

    button,
    a {
      min-width: auto;
    }

    .title_sponsoreth {
      /* font-size: 2rem; */
    }

    .subtitle_sponsoreth {
      /* font-size: 1.4rem; */
    }
  }

  @media (max-width: 426px) {
    .title_sponsoreth {
      font-size: 2rem;
    }

    .subtitle_sponsoreth {
      font-size: 1.4rem;
    }

    .stroke-current > path {
      min-width: 24px;
      min-height: 24px;
    }

    .button-first-section {
      min-width: 40%;
    }
  }
</style>
