<script>
  import { onMount } from 'svelte'
  import { records, record } from './stores'
  import * as api from './api'

  export let currentRecord
  export let hasBeenClicked = false

  record.subscribe(value => {
    currentRecord = value
  })

  onMount(async () => {
    const response = await api.fetchUpvotes()
    const { results } = await response.json()
    records.set(results)
  })

  function handleClickUpvote() {
    const { pathname } = document.location
    hasBeenClicked = true

    if (!currentRecord) {
      api.createNewRecord(pathname)
      return
    }

    const { rowIndex, votes } = currentRecord
    api.addUpvote({ rowIndex, votes: parseInt(votes, 10) + 1 })
  }
</script>

{#if hasBeenClicked}
  <div class="c-upvote-button is-active">
    <svg class="c-upvote-button__icon">
      <use xlink:href="#heart"></use>
    </svg>
    <span>
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
    class="c-upvote-button"
    type="button"
    aria-label="Show your appreciation by tapping or clicking"
    title="Like this post"
  >
    <svg class="c-upvote-button__icon">
      <use xlink:href="#heart"></use>
    </svg>
    {#if currentRecord}
      <span>{currentRecord.votes}</span>
    {:else}
      <span>Be the first to like this!</span>
    {/if}
  </button>
{/if}
