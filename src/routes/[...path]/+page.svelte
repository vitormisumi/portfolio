<script>
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<section class="flex h-screen flex-col items-center justify-center gap-8">
	<p>Página não encontrada.</p>
	<Button onclick={() => history.back()}>Voltar</Button>
</section>
