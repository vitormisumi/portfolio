<script lang="ts">
	import { page } from '$app/state';
</script>

{#if page.params.lang === 'pt'}
	<section class="flex h-full flex-col items-center justify-center gap-4">
		<h2>Obrigado!</h2>
		<p class="text-center">Sua mensagem foi enviada. Entrarei em contato assim que possível!</p>
	</section>
{:else}
	<section class="flex h-full flex-col items-center justify-center gap-4">
		<h2>Thank you!</h2>
		<p class="text-center">Your message was sent. I'll reply as soon as possible!</p>
	</section>
{/if}
