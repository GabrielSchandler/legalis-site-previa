# Legalis Estética Automotiva — Prévia do site

Prévia do novo site da Legalis Estética Automotiva: polimento, vitrificação, higienização e outros cuidados com o carro.
Preview of the new website for Legalis Estética Automotiva, a car detailing studio (polishing, ceramic coating, interior cleaning and more).

[🇧🇷 Português](#-português) · [🇺🇸 English](#-english)

---

## 🇧🇷 Português

Landing page responsiva para apresentação da Legalis Estética Automotiva. O projeto usa HTML, CSS e JavaScript sem dependências de execução ou coleta de dados. O atendimento é iniciado em links diretos para o WhatsApp oficial informado no site da empresa.

### Conteúdo e direção

- Mensagem principal centrada no cuidado com o carro e na avaliação individual.
- Serviços priorizados: polimento técnico, vitrificação, higienização interna, lavagem técnica, restauração de faróis e micro pintura.
- Demonstração interativa de antes e depois e galerias individuais para os seis serviços. Cada card alterna automaticamente entre 2 e 4 fotos; ao ampliar, o visor mostra apenas o conjunto daquele serviço, com miniaturas, setas, teclado, gesto de deslizar e apresentação automática com pausa. Movimento reduzido desativa o avanço.
- O acervo da Legalis foi complementado com seis imagens geradas para ilustrar os tratamentos. Cada imagem gerada é identificada como ilustrativa no card e no visor. Esses materiais não representam serviços executados pela empresa.
- Faixa contínua com 14 trechos curtos e atribuídos das avaliações do Google fornecidas pelo usuário, com vários cartões simultâneos e controle de pausa. A nota 4,9/5 e as 278 avaliações foram informadas pelo usuário em 16 de outubro de 2026 e devem ser atualizadas se mudarem.
- Área de blog com os dois posts encontrados no site antigo, nas datas originais, ligados às publicações originais.
- Endereço, telefone e horário baseados nas informações públicas encontradas em 16 de outubro de 2026.
- Imagem de abertura gerada como peça conceitual, com descrição explícita no texto alternativo. Ela não representa um trabalho específico da empresa.

### Camada de luz e movimento (17/10/2026)

Refino guiado pelas skills Frontend Design, Emil Kowalski (animate), Impeccable (animate/craft-floor), Taste (motion) e pelos dados da UI UX Pro Max (automotivo premium: escuro, acentos metálicos, movimento como linguagem).

- **Um momento autoral no topo:** o estúdio "acende" (a foto sai do escuro), uma faixa de luz percorre só os reflexos da lataria (máscara pela luminância da própria foto), a poeira dourada flutua na luz e o título sobe linha a linha com uma passada de brilho no dourado. A faixa volta a cada 11 s e para fora da tela.
- **Entradas variadas por seção:** títulos por linha atrás de máscara; cartões de serviço e blog em sequência; galeria abrindo como cortina; moldura de "Quem somos" que se desloca e selo que assenta; etapas do método que traçam sua linha; comparador com uma demonstração curta.
- **Luz e profundidade:** botões em ouro metálico com brilho ao passar o mouse, sombras em camadas, halo dourado nos cartões ao passar o mouse, iluminação ambiente fixa em cada seção (sem loops decorativos).
- **Rolagem suave** com Lenis 1.1.13 e GSAP 3.12.5 ScrollTrigger, servidos de `dist/assets/vendor/` (compatível com a CSP `script-src 'self'`).
- Ícones desenhados em SVG no lugar de ↗ ↓ ↔ ✦ ← → × Ⅱ ▶; barra de rolagem e cursor de texto nas cores da marca.
- Curvas: `cubic-bezier(.23,1,.32,1)` para entradas e `cubic-bezier(.77,0,.175,1)` para o que se move na tela; efeitos de hover só em dispositivos com mouse; `prefers-reduced-motion` mantém apenas esmaecimentos suaves.
- `assets/js-flag.js` marca que o JavaScript está ativo; sem ele, todo o conteúdo aparece normalmente.

### Refatoração de UI/UX — v3 (17/10/2026)

Feita com as skills Impeccable (polish + craft-floor), Taste (house rules, type, layout, tells), UI UX Pro Max (guias de acessibilidade, toque e tipografia) e Emil Kowalski (movimento). Os scripts próprios da Impeccable e da Taste não rodaram neste ambiente; as regras foram aplicadas a partir das instruções e verificadas no navegador em 1440, 768 e 390 px.

- **Mantido:** paleta preto/dourado/creme, Barlow nos títulos, Manrope no texto, fotos reais, ângulos retos, a abertura com a luz e o comparador de farol (a "coisa viva" da página).
- **Seções distinguidas pelo fundo:** escuro → faixa em tom → escuro → **creme** (Nosso jeito de fazer) → escuro → tom → escuro → **campo dourado** (convite final).
- **Serviços** viraram uma lista editorial com foto e texto alternando de lado, no lugar de seis cartões iguais. As galerias e fotos alternadas continuam.
- **Leitura:** texto corrido de 16–18 px (era 12–14 px), escala com cinco tamanhos, títulos em até duas linhas no desktop e no tablet.
- **Removido:** rótulos em caixa-alta acima dos títulos, numeração decorativa (01 / 02…), linhas finas e caixas contornadas, palavra do título em outra cor, degradês e sombras em elementos parados, vidro (blur) no cabeçalho e nos selos, micro-informação no rodapé do topo.
- **Ações nomeadas pelo que fazem:** "Pedir avaliação no WhatsApp" e "Pedir avaliação"; botões sólidos.
- **Método** virou lista ordenada (`<ol>`): a ordem aparece pela posição e pelos verbos.
- Contadores de foto em "1 de 4"; datas do blog por extenso; legendas em frase, não em caixa-alta.
- Exceção consciente: no celular o título da abertura ocupa três linhas, porque em duas ele ficaria pequeno demais para uma abertura.

### Fontes

- Site e fotografias originais: https://legalis.com.br/
- Serviços: https://legalis.com.br/servicos/
- TikTok fornecido: https://www.tiktok.com/@legalisconservacaoauto — o perfil público foi consultado, mas a grade de vídeos retornou erro e nenhuma mídia da rede social foi incorporada.
- Google Maps fornecido: https://www.google.com/maps/place/Legalis+Est%C3%A9tica+Automotiva/
- Posts do blog antigo: https://legalis.com.br/blog/
- Avaliações: arquivo de texto fornecido pelo usuário nesta conversa; os trechos na página preservam o texto original e a atribuição.

As fotos da empresa foram convertidas para WebP. A imagem de abertura e as seis imagens ilustrativas dos serviços foram geradas com a skill ImageGen e otimizadas para WebP. As imagens ilustrativas mostram polimento, vitrificação, higienização interna, lavagem técnica, restauração de faróis e micro pintura em cenários editoriais sem logotipos.

### Operação

Abra `dist/index.html` por um servidor HTTP estático. O site não depende de API, banco de dados ou chave. A pasta `dist/` contém tudo que precisa ser publicado.

Ao instalar no domínio definitivo, substitua as URLs de `canonical`, `og:url`, `og:image` e do JSON-LD. Confirme com a Legalis o endereço, horário, serviços, depoimentos, número de WhatsApp e autorização para usar as fotos antes de divulgar o site publicamente. A política de privacidade no rodapé aponta para o documento existente da empresa; convém revisar esse documento, pois ele é de 2021 e menciona dados cadastrais antigos.

### Revisão técnica

- Página sem formulários, armazenamento local, rastreadores ou scripts de terceiros.
- Imagens otimizadas em WebP, carregamento preguiçoso abaixo da dobra e imagem principal priorizada.
- Navegação por teclado, rótulos acessíveis, foco visível, texto alternativo, HTML semântico, galeria em diálogo nativo e suporte a movimento reduzido.
- Content Security Policy ativa por `meta` e regras de cabeçalho em `dist/_headers` para hosts compatíveis.
- A meta de conversão é o clique qualificado para WhatsApp. A taxa real de conversão depende de tráfego, atendimento, oferta e medição após lançamento.

Referências técnicas consultadas: [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [Core Web Vitals](https://web.dev/articles/defining-core-web-vitals-thresholds), [Google LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business) e [OWASP HTTP Headers Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html).

---

## 🇺🇸 English

A responsive landing page for Legalis Estética Automotiva, a car detailing studio. Built with HTML, CSS and JavaScript, with no runtime dependencies and no data collection. Every contact starts with a direct link to the company's official WhatsApp.

### Highlights

- Services: technical polishing, ceramic coating, interior cleaning, technical wash, headlight restoration and paint touch-ups.
- Interactive before/after slider and a per-service photo gallery (thumbnails, arrows, keyboard, swipe, autoplay with pause).
- A scrolling strip with 14 attributed Google review excerpts, and a blog area linking the two posts from the old site.
- A signature hero moment: the studio "lights up", a light sweep runs across the car's reflections and the headline rises line by line.
- Smooth scrolling with Lenis and GSAP ScrollTrigger, served locally (compatible with a strict `script-src 'self'` CSP).
- AI-generated images are labeled as illustrative and do not represent work done by the company.

### Tech stack

HTML · CSS · vanilla JavaScript · GSAP + ScrollTrigger · Lenis · WebP images · self-hosted Barlow and Manrope fonts

### Running

Serve the `dist/` folder with any static HTTP server, e.g. `python -m http.server` inside `dist/`. No API, database or keys. **`dist/` holds everything that needs to be published.**

### Before going live

Update the `canonical`, `og:url`, `og:image` and JSON-LD URLs for the final domain. Confirm the address, hours, services, testimonials, WhatsApp number and photo usage rights with Legalis.

### Technical review

No forms, local storage, trackers or third-party scripts. Lazy-loaded WebP images, keyboard navigation, accessible labels, visible focus, semantic HTML, a native `<dialog>` gallery and reduced-motion support. A Content Security Policy is set via `meta`, plus header rules in `dist/_headers`.
