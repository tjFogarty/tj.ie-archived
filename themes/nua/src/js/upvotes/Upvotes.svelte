<script>
  import { onMount } from 'svelte'
  import { records, record } from './stores'
  import * as api from './api'

  export let currentRecord
  export let hasBeenClicked = false

  record.subscribe(value => {
    currentRecord = value
  })

  async function getAllRecords() {
    const response = await api.fetchUpvotes()
    const { results } = await response.json()
    records.set(results)
  }

  onMount(() => {
    getAllRecords()
  })

  async function handleClickUpvote() {
    const { pathname } = document.location
    hasBeenClicked = true

    if (!currentRecord) {
      await api.createNewRecord(pathname)
    } else {
      const { rowIndex, url, votes } = currentRecord
      await api.addUpvote({ rowIndex, url, votes: parseInt(votes, 10) + 1 })
    }
  }
</script>

{#if hasBeenClicked}
  <div class="c-upvote-button is-active">
    <svg class="c-upvote-button__icon">
      <use xlink:href="#heart"></use>
    </svg>
    <span class="js-upvote-count">
      {#if currentRecord}
      {parseInt(currentRecord.votes, 10) + 1}
      {:else}
      1
      {/if}
    </span>
  </div>
{:else}
  <button
    on:click={handleClickUpvote}
    class="c-upvote-button js-add-upvote"
    class:is-active={hasBeenClicked}
    type="button"
    aria-label="Show your appreciation by tapping or clicking the heart"
    title="Like this post"
  >
    <svg class="c-upvote-button__icon">
      <use xlink:href="#heart"></use>
    </svg>
    {#if currentRecord}
      <span class="js-upvote-count">{currentRecord.votes}</span>
    {/if}
  </button>
{/if}
