<script>
	import { fade } from 'svelte/transition';
	import Button from '$lib/components/Button.svelte';

	let showPopup = false;
	let linkCopiado = false;
	let codigoCopiado = false;

	export let link = 'link.class/C0d1ggo';
	export let codigo = 'C0d1ggo';

	function togglePopup() {
		showPopup = !showPopup;
	}

	async function copyToClipboard(text, type) {
		try {
			await navigator.clipboard.writeText(text);
			if (type === 'link') {
				linkCopiado = true;
				setTimeout(() => (linkCopiado = false), 2000);
			} else if (type === 'codigo') {
				codigoCopiado = true;
				setTimeout(() => (codigoCopiado = false), 2000);
			}
		} catch (err) {
			console.error('Falha ao copiar: ', err);
		}
	}
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'Escape' && showPopup) {
			togglePopup();
		}
	}}
/>

<div class="background">
	<div class="container">
		<Button on:click={togglePopup}>Convidar Estudante</Button>

		{#if showPopup}
			<div class="popup-overlay" on:click={togglePopup} transition:fade={{ duration: 150 }}>
				<div class="popup-content" on:click|stopPropagation>
					<h3>Convide novos estudantes</h3>

					<div class="share-section">
						<p>Compartilhando o link abaixo:</p>
						<div class="input-group">
							<span class="link-text">{link}</span>
							<button class="copy-button" on:click={() => copyToClipboard(link, 'link')}>
								{#if linkCopiado}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg
									>
								{:else}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path
											d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
										/></svg
									>
								{/if}
							</button>
						</div>
					</div>

					<div class="share-section">
						<p>Usando o código da turma:</p>
						<div class="input-group">
							<span class="code-text">{codigo}</span>
							<button class="copy-button" on:click={() => copyToClipboard(codigo, 'codigo')}>
								{#if codigoCopiado}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg
									>
								{:else}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path
											d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
										/></svg
									>
								{/if}
							</button>
						</div>
					</div>

					<div class="social-share-section">
						<p>Compartilhando nas redes sociais:</p>
						<div class="social-icons">
							<a href="#" aria-label="Compartilhar no Facebook">
								<svg
									width="32"
									height="32"
									viewBox="0 0 32 32"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									><path
										d="M16 0C7.164 0 0 7.164 0 16C0 24.836 7.164 32 16 32C24.836 32 32 24.836 32 16C32 7.164 24.836 0 16 0ZM20.8 9.6H18.4C17.768 9.6 17.6 10.052 17.6 10.72V12.8H20.8L20 16H17.6V25.6H12.8V16H10.4V12.8H12.8V10.08C12.8 7.692 14.188 6.4 16.4 6.4H20.8V9.6Z"
										fill="#1877F2"
									/></svg
								>
							</a>
							<a href="#" aria-label="Compartilhar no Instagram">
								<svg
									width="32"
									height="32"
									viewBox="0 0 32 32"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									><path
										d="M22.4 0H9.6C4.296 0 0 4.296 0 9.6V22.4C0 27.704 4.296 32 9.6 32H22.4C27.704 32 32 27.704 32 22.4V9.6C32 4.296 27.704 0 22.4 0ZM28.8 22.4C28.8 25.932 25.932 28.8 22.4 28.8H9.6C6.068 28.8 3.2 25.932 3.2 22.4V9.6C3.2 6.068 6.068 3.2 9.6 3.2H22.4C25.932 3.2 28.8 6.068 28.8 9.6V22.4Z"
										fill="url(#paint0_radial_1_2)"
									/><path
										d="M16 7.84C11.492 7.84 7.84 11.492 7.84 16C7.84 20.508 11.492 24.16 16 24.16C20.508 24.16 24.16 20.508 24.16 16C24.16 11.492 20.508 7.84 16 7.84ZM16 20.96C13.268 20.96 11.04 18.732 11.04 16C11.04 13.268 13.268 11.04 16 11.04C18.732 11.04 20.96 13.268 20.96 16C20.96 18.732 18.732 20.96 16 20.96Z"
										fill="url(#paint1_radial_1_2)"
									/><path
										d="M24.64 5.76C23.636 5.76 22.84 6.556 22.84 7.56C22.84 8.564 23.636 9.36 24.64 9.36C25.644 9.36 26.44 8.564 26.44 7.56C26.44 6.556 25.644 5.76 24.64 5.76Z"
										fill="url(#paint2_radial_1_2)"
									/><defs
										><radialGradient
											id="paint0_radial_1_2"
											cx="0"
											cy="0"
											r="1"
											gradientUnits="userSpaceOnUse"
											gradientTransform="translate(2.56 29.44) rotate(-45) scale(46.2255)"
											><stop stop-color="#FFC107" /><stop
												offset="0.505"
												stop-color="#F44336"
											/><stop offset="1" stop-color="#9C27B0" /></radialGradient
										><radialGradient
											id="paint1_radial_1_2"
											cx="0"
											cy="0"
											r="1"
											gradientUnits="userSpaceOnUse"
											gradientTransform="translate(2.56 29.44) rotate(-45) scale(46.2255)"
											><stop stop-color="#FFC107" /><stop
												offset="0.505"
												stop-color="#F44336"
											/><stop offset="1" stop-color="#9C27B0" /></radialGradient
										><radialGradient
											id="paint2_radial_1_2"
											cx="0"
											cy="0"
											r="1"
											gradientUnits="userSpaceOnUse"
											gradientTransform="translate(2.56 29.44) rotate(-45) scale(46.2255)"
											><stop stop-color="#FFC107" /><stop
												offset="0.505"
												stop-color="#F44336"
											/><stop offset="1" stop-color="#9C27B0" /></radialGradient
										></defs
									></svg
								>
							</a>
							<a
								title="WhatsApp, Public domain, via Wikimedia Commons"
								href="https://commons.wikimedia.org/wiki/File:WhatsApp.svg"
								><img
									width="32"
									alt="WhatsApp"
									src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png?20220228223904"
								/></a
							>
							<a href="#" aria-label="Compartilhar no Twitter">
								<svg
									width="32"
									height="32"
									viewBox="0 0 24 24"
									fill="#1DA1F2"
									xmlns="http://www.w3.org/2000/svg"
									><path
										d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 2.98,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.84C20.33,8.63 20.33,8.42 20.32,8.21C21.17,7.63 21.88,6.87 22.46,6Z"
									/></svg
								>
							</a>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.background {
		background-color: white;
		position: sticky;
		display: flex;
		bottom: 0px;
		padding-bottom: 10px;
	}

	.container {
		width: 325px;
		height: 64px;
		display: flex;
		bottom: 0px;
		justify-content: center;
		align-items: center;
		background-color: var(--cor-secundaria);
		border-bottom-right-radius: 32px;
		border-bottom-left-radius: 32px;
		padding-top: 8px;
		padding-bottom: 8px;
	}

	.popup-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.popup-content {
		background-color: var(--cor-primaria);
		color: white;
		padding: 24px;
		border-radius: 16px;
		width: 90%;
		max-width: 400px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
		position: relative;
	}

	h3 {
		margin-top: 0;
		font-size: 1.25rem;
		text-align: left;
	}

	p {
		font-size: 0.9rem;
		margin-bottom: 8px;
		color: #d1d5db;
	}

	.share-section,
	.social-share-section {
		margin-top: 20px;
	}

	.input-group {
		display: flex;
		align-items: center;
		background-color: white;
		border-radius: 8px;
		padding: 4px;
	}

	.input-group span {
		flex-grow: 1;
		padding: 8px 12px;
		font-family: monospace;
	}

	.link-text {
		color: #3b82f6;
		font-weight: bold;
		text-decoration: underline;
	}

	.code-text {
		color: #1e3a8a;
		font-weight: bold;
	}

	.copy-button {
		background: none;
		border: none;
		cursor: pointer;
		padding: 8px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: #4b5563;
	}

	.copy-button svg {
		stroke: #4b5563;
	}

	.copy-button:hover svg {
		stroke: #1e3a8a;
	}

	.social-icons {
		display: flex;
		gap: 16px;
		margin-top: 12px;
	}

	.social-icons a {
		transition: transform 0.2s ease-in-out;
	}

	.social-icons a:hover {
		transform: scale(1.1);
	}
</style>
