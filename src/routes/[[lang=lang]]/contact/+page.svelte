<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let status = $state('');

	async function onsubmit(event: SubmitEvent) {
		event.preventDefault();
		status = `${$page.params.lang === 'pt' ? 'Enviando...' : 'Sending...'}`;
		const formData = new FormData(event.currentTarget as HTMLFormElement);
		const object = Object.fromEntries(formData);
		const json = JSON.stringify(object);

		const response = await fetch('https://api.web3forms.com/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: json
		});
		const result = await response.json();
		if (result.success) {
			status = `${$page.params.lang === 'pt' ? 'Enviado!' : 'Sent!'}`;
			goto(`/${$page.params.lang}/thanks`);
		}
	}
</script>

<section class="flex w-full justify-center">
	<div class="flex w-full max-w-xs flex-col gap-4 md:max-w-md">
		<p>
			{$page.params.lang === 'pt'
				? 'Você pode me encontrar nesses perfis:'
				: 'You can find me in these profiles:'}
		</p>
		<div>
			<a href="https://github.com/vitormisumi" class="flex items-center gap-2">
				<iconify-icon icon="mdi:github"></iconify-icon>
				Github
			</a>
			<a href="https://www.linkedin.com/in/vitormisumi/" class="flex items-center gap-2">
				<iconify-icon icon="mdi:linkedin"></iconify-icon>
				Linkedin
			</a>
		</div>
		<p>
			{$page.params.lang === 'pt'
				? '...ou enviar uma mensagem diretamente utilizando o formulário abaixo:'
				: '...or send me a direct message using the form below:'}
		</p>
		<form class="flex w-full flex-col items-center gap-4" {onsubmit}>
			<label class="grid w-full">
				<input type="hidden" name="access_key" value="7636656c-4f9f-44f5-b099-851cd26215b4" />
			</label>
			<label class="grid w-full">
				{$page.params.lang === 'pt' ? 'Nome' : 'Name'}
				<input
					type="text"
					name="name"
					placeholder={$page.params.lang === 'pt' ? 'Digite seu nome' : 'Type your name'}
					class="placeholder:text-sm"
					required />
			</label>
			<label class="grid w-full">
				Email
				<input
					type="email"
					name="email"
					placeholder={$page.params.lang === 'pt' ? 'Digite seu email' : 'Type your email'}
					class="placeholder:text-sm"
					required />
			</label>
			<label class="grid w-full">
				{$page.params.lang === 'pt' ? 'Mensagem' : 'Message'}
				<textarea
					name="message"
					placeholder={$page.params.lang === 'pt' ? 'Digite sua mensagem' : 'Type your message'}
					class="placeholder:text-sm"
					required
					rows="5"></textarea>
			</label>
			<input type="hidden" name="redirect" value="https://vitormisumi.com/thanks" />
			<input type="checkbox" name="botcheck" class="hidden" style="display: none;">
			<button
				class="rounded bg-primary px-4 py-2 font-semibold text-background transition-colors hover:bg-primary/90 hover:text-background">
				{$page.params.lang === 'pt' ? 'Enviar' : 'Send'}
			</button>
		</form>
		<p class="text-primary">{status}</p>
	</div>
</section>
