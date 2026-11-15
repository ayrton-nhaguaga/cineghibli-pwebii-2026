# CineGhibli

Trabalho individual de Programação Web II, turma LECC31, 2026. Explorador de filmes do Studio Ghibli dirigido a estudantes que procuram um filme para o fim-de-semana.

## Funcionalidades

- Lista de filmes com cartaz, ano, duração e classificação.
- Pesquisa pelo título em inglês, japonês ou romanizado.
- Filtros combináveis por ano, realizador e classificação mínima.
- Janela de detalhes com sinopse, realizador e produtor.
- Estados de carregamento, erro com nova tentativa e pesquisa sem resultados.
- Layout adaptado a computadores e telemóveis.

## Executar

Abrir `index.html` num navegador moderno com ligação à Internet. Também é possível servir a pasta com `python -m http.server 8000` e abrir `http://localhost:8000`.

## Tecnologias e dados

HTML, CSS, JavaScript e Vue 3 pela CDN, sem compilação, servidor de aplicação ou chave de API.

Os dados são obtidos com `fetch` de https://ghibliapi.vercel.app/films. As sinopses e títulos mantêm o idioma fornecido pela API. A classificação RT corresponde ao campo `rt_score`, numa escala de 0 a 100. A API não fornece géneros, por isso foram usados ano, realizador e classificação como filtros.

Documentação: [Studio Ghibli API](https://ghibliapi.vercel.app/) e [Vue.js](https://vuejs.org/guide/quick-start.html).

## GitHub e GitHub Pages

- Repositório: https://github.com/ayrton-nhaguaga/cineghibli-pwebii-2026
- Aplicação: https://ayrton-nhaguaga.github.io/cineghibli-pwebii-2026/
- Branches: `main` e `desenvolvimento`.

O GitHub Pages usa a branch `main` e a pasta `/ (root)`, sem processo de compilação.

O relatório de uma página está em `Relatorio_CineGhibli.docx`. O enunciado solicita PDF; exportar o documento no Word antes da submissão, caso seja necessário cumprir esse formato.
