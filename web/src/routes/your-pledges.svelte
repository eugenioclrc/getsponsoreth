<script>
  import { onMount } from "svelte";

  import { initClient, operationStore, query } from "@urql/svelte";
import { signerAddress } from "svelte-ethers-store";

  const client = initClient({
    url: "https://api.thegraph.com/subgraphs/name/eugenioclrc/getsponsoreth",
  });

  var data = {
    title: "Pledge reason",
    description: "Svelte demo app",
    user_image: "https://avatars0.githubusercontent.com/u/1234?s=460&v=4",
    name: "John Doe",
  };

  const backgroundImages = [
    "joshua-earle-Hn8N4I4eHA0-unsplash.jpg",
    "natalie-runnerstrom-SZlgOP7bSnI-unsplash.jpg",
    "oliver-spicer-NmPNw8w_a24-unsplash.jpg",
    "xan-griffin-eA2t5EvcxU4-unsplash.jpg",
  ];
  let pledges = []

  //function for getting a random string of backgroundImages

  let randomIndex = 0;
  onMount(async () => {
    const GET_MYPROFILE = `
    query ($id: String!) {
      users( id: $id){
        pledges {
          id,backCount,reason,author
        }
      }
    }`;
    const { data } = await client
      .query(GET_MYPROFILE, {
        id: $signerAddress,
      })
      .toPromise();

      pledges = (data && data.users && data.users[0] && data.users[0].pledges) || [];

    randomIndex = Math.floor(Math.random() * backgroundImages.length);
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
      class="flex flex-col xl:flex-row mt-4"
      style="column-count: 2; flex-wrap: wrap;"
    >
    <div class="xl:w-2/3 mt-2">
      <!-- title Message -->

      <div class="  flex flex-col ">
        <!-- title -->
        <div
          class="card flex-shrink-0 w-full pledge-card shadow-2xl bg-base-100 flex flex-row items-center  mb-4 mt-4"
        >
          <h2 class="p-8 pt-6 pb-6 Messages_Title">Your pledges</h2>
        </div>
        {#each pledges as p}
    
        <!-- Start of component -->
        <!-- card that contains lorem ipsum -->
        <div
          class="card mb-1 flex-shrink-0 w-full content-card pledge-card shadow-2xl bg-base-100 flex flex-row items-center "
        >
          <!-- avatar -->
          <div class="avatar  p-8">
            <div class="w-24 mask mask-circle">
              <img src="https://api.lorem.space/image/face?hash=53273" />
            </div>
          </div>

          <!-- message -->
          <div class="message pt-8 pb-8 pr-8">
            <div class="message-content flex flex-row ">
              <a href="/pledge-view?id={p.id}">
                <div class="message-header">
                  <h1 class="text-2xl font-bold pb-2">{p.author || 'empty'}</h1>
                  <h2 class="text-sm font-bold pb-4">
                    {p.reason || 'empty'}
                  </h2>
                </div>
              </a>
            </div>
          </div>
          <div class="ml-auto pr-8 buttons">
            <!-- button claim -->
            <button class="btn btn-primary btn-outline">Edit</button>

            <button class="btn button-charming ">Claim</button>
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

  .buttons > button {
    min-width: 150px;
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
    .message {
      /* width: 100%; */
      padding-left: 1rem;
    }

    .content-card {
      flex-wrap: wrap;
    }
    .buttons {
      margin: 0;
      padding: 2rem;
      padding-top: 0;
    }

    .buttons > button {
      width: 50%;
    }

    .buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      gap: 1rem;
    }

    @media screen and (max-width: 600px) {
      .buttons > button {
        min-width: initial;
      }

      .message {
        width: 100%;
        padding-left: 2rem;
      }

      .content-card {
        justify-content: center;
      }
    }
  }
</style>
