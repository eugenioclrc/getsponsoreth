<script>
  import { onMount } from "svelte";
  import { initClient, operationStore, query } from "@urql/svelte";

  //user_image: "https://avatars0.githubusercontent.com/u/1234?s=460&v=4",
  //name: "John Doe",

  var pledge = {
    title: "Pledge reason",
    description: "Svelte demo app",
    user_image: "https://avatars0.githubusercontent.com/u/1234?s=460&v=4",
    name: "John Doe",
    url: "/pledge-view",
  };
  // var pledges = [];

  $: searched = false;

  const backgroundImages = [
    "joshua-earle-Hn8N4I4eHA0-unsplash.jpg",
    "natalie-runnerstrom-SZlgOP7bSnI-unsplash.jpg",
    "oliver-spicer-NmPNw8w_a24-unsplash.jpg",
    "xan-griffin-eA2t5EvcxU4-unsplash.jpg",
  ];

  //function for getting a random string of backgroundImages

  let randomIndex = 0;

  let pledges = [];

  const client = initClient({
    url: "https://api.thegraph.com/subgraphs/name/eugenioclrc/getsponsoreth",
  });

  onMount(async () => {
    randomIndex = Math.floor(Math.random() * backgroundImages.length);

    const { data } = await client
      .query(
        `query {     
          pledges(first: 10) {
            id
            backCount
            author
            pledge
            reason
          }
        }`
      )
      .toPromise();
    pledges = data.pledges;
    console.log({ pledges });
  });

  $: backgroundImage = backgroundImages[randomIndex];
</script>

<div
  class="pt-16 pb-12 min-h-screen"
  style="background-image: url({backgroundImage});
background-repeat: no-repeat;
background-size: cover;
"
>
  <!-- container with 2 responsives columns -->
  <div class="container mx-auto px-4 ">
    <div class="logo-container ">
      <a href="/"
        ><img
          class="logo-image"
          src="./sponsrethgold2.png"
          alt="sponsor.eth"
        /></a
      >
    </div>
    <!-- centered image -->
    <div
      class="flex flex-col lg:flex-row mt-4"
      style="column-count: 2; flex-wrap: wrap;"
    >
      <div class="lg:w-2/3 mt-2">
        <!-- title Message -->

        <div class="  flex flex-col ">
          <!-- title -->
          <div
            class="card flex-shrink-0 w-full pledge-card shadow-2xl bg-base-100 flex flex-row items-center  mb-4 mt-4"
          >
            <h2 class="p-8 pt-6 pb-6 Messages_Title">Search for pledges</h2>
          </div>

          <!-- searchbar -->
          <div
            class="mb-4 card flex-shrink-0 w-full pledge-card shadow-2xl bg-base-100 flex flex-row items-center "
          >
            <!-- <label class="label">
                  <span class="label-text">Search</span>
                </label> -->
            <input
              type="text"
              name="pledgeName"
              placeholder="Search for pledges"
              class="input input-bordered w-100"
            />
          </div>

          {#if searched}
            <div
              class="card mb-4 flex-shrink-0 w-full pledge-card shadow-2xl bg-base-100 flex flex-row items-center "
            >
              <div class="message pt-8 pb-8 pr-8 ">
                <div class="message-content flex flex-row ">
                  <div class="message-header">
                    <h1 class="text-2xl font-bold pb-2 pl-8">
                      No data founded
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          {/if}
          <!-- Start of component -->
          {#each pledges as p}
            <!-- card that contains lorem ipsum -->
            <div
              class="card flex-shrink-0 mb-4 w-full pledge-card shadow-2xl bg-base-100 flex sm:flex-row items-center "
            >
              <!-- avatar -->
              <div class="avatar p-4 md:p-8">
                <div class="w-24 mask mask-circle">
                  <img src="https://api.lorem.space/image/face?hash=53273" />
                </div>
              </div>

              <!-- message -->
              <div class="message md:pt-8 md:pb-8 md:pr-8">
                <div class="message-content flex flex-row ">
                  <div class="message-header">
                    <h1 class="text-2xl font-bold pb-2">{p.reason}</h1>
                    <h2 class="text-sm font-bold pb-4">
                      {p.backCount} backers
                    </h2>
                    <!-- <div class="pledge-content-details">
                      {data.description}
                    </div> -->
                  </div>
                </div>
              </div>
              <div class="mt-4 md:mt-0 md:ml-auto md:pr-8 buttons mb-6 md:mb-0">
                <!-- button claim -->
                <!-- <button class="btn button-charming ">Go details</button> -->
                <a
                  class="btn btn-reverse btn-custom-arrow btn-charming"
                  href="/pledge-view?id={p.id}"
                >
                  <span
                    >Go details<svg
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 36.1 25.8"
                      enable-background="new 0 0 36.1 25.8"
                      xml:space="preserve"
                      ><g
                        ><line
                          fill="none"
                          stroke="#FFFFFF"
                          stroke-width="3"
                          stroke-miterlimit="10"
                          x1="0"
                          y1="12.9"
                          x2="34"
                          y2="12.9"
                        /><polyline
                          fill="none"
                          stroke="#FFFFFF"
                          stroke-width="3"
                          stroke-miterlimit="10"
                          points="22.2,1.1 34,12.9 22.2,24.7   "
                        /></g
                      ></svg
                    ></span
                  >
                </a>
              </div>
            </div>

            <!-- End of component -->
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .custom-card {
    /* border: 1px solid #ccc; */
  }

  .pledge-card {
    max-width: 80%;
    height: 80%;
  }

  .payment-card {
    max-height: 450px;
  }

  .content-column {
    margin-top: 3rem;
  }

  .logo-container {
    position: relative;
    top: 1rem;
    /* left: 1rem; */
  }

  .avatar-container {
    padding: 2rem;
    padding-bottom: 1rem;
  }

  .Messages_Title {
    font-size: 2rem;
    font-weight: bold;
    margin-left: 2rem;
  }

  .Pledge_Title {
    font-size: 36px;
  }

  .logo-image {
    border-radius: 35px;
    max-width: 200px;
    /* margin-left: auto; */
    margin-right: auto;
    transition: ease 0.5s;
  }

  .logo-image:hover {
    transform: translateX(10px);
  }

  .buttons > a {
    min-width: 150px;
  }

  /* button arrow */
  .btn-custom-arrow {
    position: relative;
    transition: background-color 300ms ease-out;
    background: linear-gradient(-45deg, #9925ea, #338aff, #9925ea);
    background-size: 400%;
    background-position: 90% 0;
    color: #fff;
    transition: background 0.8s;
    border: none;
  }

  .btn-custom-arrow:hover {
    background-position: 185% 50%;
  }
  .btn-custom-arrow span {
    display: inline-block;
    position: relative;
    transition: all 300ms ease-out;
    will-change: transform;
  }
  .btn-custom-arrow:hover span {
    transform: translate3d(-1rem, 0, 0);
  }
  .btn-custom-arrow svg {
    position: absolute;
    width: 1.1em;
    right: 0px;
    right: 0rem;
    opacity: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: all 300ms ease-out;
    will-change: right, opacity;
  }
  .btn-custom-arrow svg * {
    stroke-width: 5;
    stroke-color: transparent;
  }
  .btn-custom-arrow:hover svg {
    opacity: 1;
    right: -2rem;
  }

  .button-charming {
    height: 3rem;
    /* border-radius: 0.rem; */
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

  .pledge-content-details {
    max-height: 150px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 300px;
  }

  @media (max-width: 768px) {
    .Pledge_Title {
      font-size: 26px;
    }
  }

  @media (max-width: 1000px) {
    .card {
      margin-left: auto;
      margin-right: auto;
      width: 100%;
      max-width: 100%;
    }

    .logo-container {
      margin-right: auto;
      margin-left: auto;
      justify-content: center;
      text-align: center;
      display: flex;
      left: initial;
    }
  }
</style>
