<script context="module">
  export const prerender = true;
</script>

<script>
    import SvelteMarkdown from 'svelte-markdown'

  import { onMount } from "svelte";
  import { ethers } from "ethers";
  import { connected, contracts } from "svelte-ethers-store";

  import { initClient, operationStore, query } from "@urql/svelte";
  import { onConnect } from "$lib/web3";
  const client = initClient({
    url: "https://api.thegraph.com/subgraphs/name/eugenioclrc/getsponsoreth",
  });

  let amount = 0;
  let username = "";
  let message = "";

  let sponsorId = 1;

  let buttonFundLoading = false;

  let here = "";
  let pledge = {
    owner: { id: null },
    backers: [],
  };

  async function stake() {
    const tx = await $contracts.GetSponsorETH.fund(
      sponsorId,
      "0x0000000000000000000000000000000000000000",
      true, // bool isStaking,
      0,
      username,
      message,
      { value: ethers.utils.parseEther(String(amount)) }
    );
    await tx.wait();
  }

  async function fund() {
    buttonFundLoading = true;
    try {
      const tx = await $contracts.GetSponsorETH.fund(
        sponsorId,
        "0x0000000000000000000000000000000000000000",
        false, // bool isStaking,
        0,
        username,
        message,
        { value: ethers.utils.parseEther(String(amount)) }
      );
      await tx.wait();
    } catch (err) {}
    buttonFundLoading = false;
  }

  function fetchData(_pledgeId) {
    const GET_MYPROFILE = `
    query ($pledgeId: Int!) {
      pledge(id:$pledgeId) {
        id
        reason
        pledge
        content
        owner {
          id
        }
        backers {
          message
          id
          amount
         
        }
      
      }
    }`;
    return client
      .query(GET_MYPROFILE, {
        pledgeId: _pledgeId,
      })
      .toPromise();
  }

  var data = {
    title: "Pledge reason",
    description: "Description of the pledge",
    user_image: "https://avatars0.githubusercontent.com/u/1234?s=460&v=4",
    name: "John Doe",
    amount: 3,
    type: "ETH",
  };

  const backgroundImages = [
    "joshua-earle-Hn8N4I4eHA0-unsplash.jpg",
    "natalie-runnerstrom-SZlgOP7bSnI-unsplash.jpg",
    "oliver-spicer-NmPNw8w_a24-unsplash.jpg",
    "xan-griffin-eA2t5EvcxU4-unsplash.jpg",
  ];

  //function for getting a random string of backgroundImages

  let randomIndex = 0;
  onMount(async () => {
    randomIndex = Math.floor(Math.random() * backgroundImages.length);

    let params = new URLSearchParams(document.location.search);
    sponsorId = parseInt(params.get("id"), 10); // is the number 18

    const { data } = await fetchData(sponsorId);
    if (!data.pledge) {
      document.location = "/";
    }
    here = encodeURIComponent(document.location.href);
    console.log(data);
    pledge = data.pledge;
    try {
      const response = await fetch('https://demo.storj-ipfs.com/ipfs/'+pledge.content);
      pledge.markdown = await response.text();
    } catch(err) {}
  });

  $: backgroundImage = backgroundImages[randomIndex];
</script>

<div
  class="pt-16 pb-12"
  style="background-image: url({backgroundImage});
background-repeat: no-repeat;
background-size: cover;
"
>
  <!-- container with 2 responsives columns -->
  <div class="container mx-auto px-4 ">
    <div class="logo-container  ">
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
      class="flex flex-col lg:flex-row "
      style="column-count: 2; flex-wrap: wrap;"
    >
      <div class="lg:w-2/3 content-column">
        <div class="  flex ">
          <!-- Start of component -->
          <!-- card that contains lorem ipsum -->
          <div
            class="card flex-shrink-0 w-full pledge-card shadow-2xl bg-base-100 "
          >
            <div
              class="flex flex-col lg:flex-col text-center justify-center avatar-container"
            >
              <!-- avatar -->
              <div class="avatar ml-auto mr-auto">
                <div class="w-24 mask mask-hexagon">
                  <img src="https://api.lorem.space/image/face?hash=53273" />
                </div>
              </div>
              <!-- name -->
              <div class="name">
                <h1 class="text-2xl font-bold">{data.name}</h1>
              </div>
              <div class="title">
                <h2 class="text-2xl font-bold pt-4 Pledge_Title">
                  {data.title}
                </h2>
              </div>
            </div>
            <div class="card-body flex flex-col p-10">
              {#if pledge && pledge.markdown}
                <SvelteMarkdown source={pledge.markdown} isInline />
              {/if}
              
            </div>
          </div>

          <!-- End of component -->
        </div>
      </div>

      <div class="lg:w-1/3">
        <div class="flex flex-col lg:flex-row" />
        <div
          class="min-h-screen  flex justify-center content-column "
          style="    max-height: 475px;"
        >
          <!-- Start of component -->
          <!-- flex row -->

          <div
            class="card payment-card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
          >
            <div class="card-body flex flex-col">
              <div class="flex flex-row items-center">
                <div class="avatar-group -space-x-6">
                  <div class="avatar">
                    <div class="w-12">
                      <img
                        src="https://api.lorem.space/image/face?hash=53273"
                      />
                    </div>
                  </div>
                  <div class="avatar">
                    <div class="w-12">
                      <img
                        src="https://api.lorem.space/image/face?hash=91831"
                      />
                    </div>
                  </div>
                  <div class="avatar">
                    <div class="w-12">
                      <img
                        src="https://api.lorem.space/image/face?hash=27312"
                      />
                    </div>
                  </div>
                  <div class="avatar">
                    <div class="w-12">
                      <img
                        src="https://api.lorem.space/image/face?hash=26448"
                      />
                    </div>
                  </div>
                  <!-- text align vertical middle with content See other messages -->
                </div>
                <div class="pl-2">sponsoreth this pledge!</div>
              </div>
              <!-- content of card -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Amount</span>
                </label>
                <input
                  bind:value={amount}
                  type="number"
                  placeholder="How much do you wanna sponsor"
                  class="input input-bordered"
                  min="0"
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Message</span>
                </label>
                <textarea
                  bind:value={message}
                  placeholder="Send a message"
                  class="h-24 pt-2 input input-bordered"
                />
                <!-- <label class="label">
                  <p href="#" class="label-text-alt">
                    .md is available for formatting
                  </p>
                </label> -->
              </div>
              <div class="flex gap-4 sponsor-buttons">
                {#if !$connected}
                  <div class="form-control w-full m-6">
                    <button on:click={onConnect} class="btn btn-secondary"
                      >Connect!</button
                    >
                  </div>
                {:else}
                  <div class="form-control w-1/2 mt-6">
                    <button on:click={stake} class="btn btn-secondary"
                      >Staketh!</button
                    >
                  </div>
                  <div class="form-control w-1/2 mt-6">
                    <button
                      on:click={fund}
                      class="btn btn-primary"
                      class:loading={buttonFundLoading}>Sponsoreth!</button
                    >
                  </div>

                  <a
                    class="NoCryptoLink"
                    href="https://staging-global.transak.com/?apiKey=2efd471e-9da3-4fea-ad1f-568ae439a11d&redirectURL={here}&cryptoCurrencyList=ETH,DAI,USDC,MATIC&defaultCryptoCurrency=USDC&walletAddress={pledge
                      .owner.id}&disableWalletAddressForm=true"
                    >No crypto? Send fiat</a
                  >
                {/if}
              </div>
            </div>
          </div>
          <!-- End of component -->
        </div>
      </div>
      <div class="lg:w-2/3 mt-2">
        <!-- title Message -->

        <div class="flex flex-col ">
          <!-- title -->
          <div
            class="card flex-shrink-0 w-full pledge-card shadow-2xl bg-base-100 flex flex-row items-center  mb-4 mt-4"
          >
            <h2 class="p-8 pt-6 pb-6 Messages_Title">Messages</h2>
          </div>

          {#each pledge.backers as backer}
            <!-- Start of component -->
            <!-- card that contains lorem ipsum -->
            <div
              class="mt-1 mb-4 card flex-shrink-0 w-full pledge-card shadow-2xl bg-base-100 flex flex-row items-center "
            >
              <!-- avatar -->
              <div class="avatar p-8">
                <div class="w-24 mask mask-circle">
                  <img src="https://api.lorem.space/image/face?hash=53273" />
                </div>
              </div>

              <!-- message -->
              <div class="message pt-8 pb-8 pr-8">
                <div class="message-content">
                  <div class="message-header">
                    <h1 class="text-2xl font-bold pb-2">{data.name}</h1>
                    <h2 class="text-sm font-bold pb-4">
                      {data.title} is a donation of {data.amount}
                      {data.type}
                    </h2>
                  </div>
                  <div class="message-body">
                    <p>
                      {data.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          {/each}
          <!-- End of component -->
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
    max-height: 465px;
  }

  .content-column {
    margin-top: 3rem;
  }

  .logo-container {
    position: relative;
    top: 1rem;
    left: 1rem;
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

  .sponsor-buttons {
    column-count: 2;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .sponsor-buttons > .form-control {
    flex: 1;
  }

  .NoCryptoLink {
    /* color: #fff; */
    text-decoration: none;
    display: block;
    margin-left: auto;
    margin-right: auto;
    transform: 1s ease;
  }

  .NoCryptoLink:hover {
    text-decoration: underline;
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

    .min-h-screen {
      min-height: initial;
    }
  }
</style>
