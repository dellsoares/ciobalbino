# Ció Balbino | Site v1

Primeira versão **inteiramente estilizada**, responsiva e pronta para hospedar no GitHub Pages. Visual de show/poster editorial, com preto, vermelho e creme. Mantivemos a **hierarquia** da referência, não o design, os textos nem a identidade.

## Visual
- **Cores:** preto `#090809`, vermelho de palco `#B90F25`, vermelho do header `#A50B1C`, creme `#F4EEE5`.
- **Fontes:** `Barlow Condensed` (títulos monumentais), `DM Sans` (interface e textos), `Instrument Serif Italic` (acento artístico). Importadas do Google Fonts com alternativas locais.
- **Fundos:** efeitos de iluminação vermelha, granulação suave, linhas editoriais e fotografias temporárias em preto/vermelho. A direção não depende de uma imagem de fundo única.

## Como publicar no GitHub Pages
1. Crie um repositório (por exemplo, `cio-balbino`) no GitHub.
2. Envie **todo o conteúdo desta pasta** para a raiz do repositório: `index.html`, `styles.css`, `script.js` e `assets/`.
3. Em **Settings → Pages → Build and deployment**, escolha `Deploy from a branch`, branch `main`, pasta `/ (root)`.
4. A página será disponibilizada no endereço do GitHub Pages do repositório. É normal os embeds dependerem de internet e de permissão do Spotify/YouTube.
5. Não mova o `index.html` para fora da pasta sem atualizar os caminhos.

## Alterações fáceis
No início do `script.js`, altere o objeto `SITE_CONFIG`:
- `spotifyPlaylist`: cole o link da playlist. O espaço **automaticamente vira um player oficial do Spotify**.
- `heroVideo`: substitua pelo ID do vídeo vertical preferido no YouTube (os 11 caracteres após `v=` ou `/shorts/`).
- `bookingWhatsApp`: confirme e atualize o telefone (DDI + DDD + número, só números).
- `bookingEmail`: confirme e atualize o e-mail.
- `liveClips`: adicione os links do YouTube dos 3 trechos de shows. Cada cartão automaticamente recebe um botão de reprodução.

Os dois EPs já estão inseridos no `index.html` com os links que você enviou:
- Ponto de Luz — `3RbzY0p5MQXGdUQaVhw57t`
- Pocke Sessioncase: EP Ponto de Luz (Acústico) — `5psZdrWGd0XaZaSyCQwij0`

Os quatro vídeos do módulo de biografia são públicos no canal exibido no site antigo, usados aqui como ponto de partida. Troque os IDs e as músicas se o artista quiser outra seleção. A seção **trechos de shows** tem layout finalizado, mas aguarda 3 links de apresentações para que os cards se tornem reproduzíveis sem associar vídeos errados a shows.

## Arquivos que você precisa enviar

| Material | Quantidade | Formato sugerido | Uso |
|---|---:|---|---|
| **Playlist** | 1 link | URL Spotify `open.spotify.com/playlist/...` | Capítulo 01 das músicas |
| **Vídeo vertical principal** | 1 | Link de YouTube Shorts ou MP4 `1080 × 1920`, H.264 + AAC, 9:16, entre 15–60s | Hero |
| **Capa do vídeo principal** | 1 | WEBP/JPG, `1080 × 1920`, idealmente abaixo de 350 KB | Poster do Hero |
| **Foto de banda atual** | 1 principal | WEBP/JPG, `1800 × 1200` ou maior, até 500 KB otimizado | Faixa de abertura da banda |
| **Fotos da banda e shows** | 6–10 | WEBP/JPG, largura 1400–2000px, 200–600 KB cada | Carrossel e trechos |
| **Vídeos de biografia** | 3–5 links | YouTube `watch?v=...` / `youtu.be/...` | Playlist à direita da biografia |
| **Trechos de shows** | 3–6 links | Preferência por YouTube; se MP4, comprimir em H.264 para web | Seção ao vivo |
| **Biografia final** | 1 texto | TXT/MD, 150–250 palavras | Coluna da biografia |
| **Sobre a banda atual** | 1 texto + nomes | TXT/MD, 80–120 palavras | Seção da banda |
| **Eventos de destaque** | 4–8 | Nome, cidade, ano, foto e link de vídeo, se houver | Histórico de shows |
| **Contato oficial** | 1 WhatsApp e 1 e-mail | `55DDDNUMERO` e e-mail | CTA de contratação |
| **Logo oficial (se houver versão melhor)** | 1 | SVG ou PNG transparente, largura de 1200px ou maior | Cabeçalho e rodapé |

Não é necessário mandar de novo os links dos dois EPs nem a logomarca atual. **A arte recebida foi aplicada** no cabeçalho e rodapé.

## Fotos temporárias
As imagens em `assets/` foram *extraídas da captura de tela enviada*, depois tratadas com uma gradação escura. Não são arquivos em alta resolução. Esta é uma solução visual para desenvolver a página completa agora; substitua pelas fotografias originais autorizadas antes da publicação definitiva.

## Status
- Estrutura completa, versão responsiva, navegação, carrossel e vídeos interativos: feitos.
- Os EPs são players reais incorporados.
- Playlist pronta para ativar por um único link.
- Showreels: design pronto, links pendentes.
- **WhatsApp e e-mail vieram de um site antigo do artista: é obrigatório confirmar antes de publicar.**
