const { createApp } = Vue;

createApp({
  data() {
    return {
      filmes: [],
      pesquisa: '',
      ano: '',
      realizador: '',
      nota: 0,
      carregando: true,
      erro: '',
      selecionado: null,
      imagensFalhadas: [],
      botaoAnterior: null
    };
  },
  computed: {
    anos() {
      return [...new Set(this.filmes.map(filme => filme.release_date))].sort((a, b) => b - a);
    },
    realizadores() {
      return [...new Set(this.filmes.map(filme => filme.director))].sort();
    },
    filmesFiltrados() {
      const termo = this.pesquisa.trim().toLocaleLowerCase();
      return this.filmes.filter(filme => {
        const titulos = `${filme.title} ${filme.original_title} ${filme.original_title_romanised}`.toLocaleLowerCase();
        return titulos.includes(termo)
          && (!this.ano || filme.release_date === this.ano)
          && (!this.realizador || filme.director === this.realizador)
          && Number(filme.rt_score) >= this.nota;
      });
    }
  },
  methods: {
    async carregarFilmes() {
      this.carregando = true;
      this.erro = '';
      try {
        const resposta = await fetch('https://ghibliapi.vercel.app/films', {
          signal: AbortSignal.timeout(15000)
        });
        if (!resposta.ok) throw new Error('Erro na API');
        const dados = await resposta.json();
        if (!Array.isArray(dados)) throw new Error('Resposta inválida');
        this.filmes = dados;
      } catch {
        this.erro = 'Não foi possível carregar os filmes. Verifica a ligação à Internet e tenta novamente.';
      } finally {
        this.carregando = false;
      }
    },
    limparFiltros() {
      this.pesquisa = '';
      this.ano = '';
      this.realizador = '';
      this.nota = 0;
    },
    async abrirDetalhes(filme, evento) {
      this.selecionado = filme;
      this.botaoAnterior = evento.currentTarget;
      await this.$nextTick();
      this.$refs.dialogo.showModal();
      document.body.style.overflow = 'hidden';
    },
    fecharNoFundo(evento) {
      if (evento.target !== this.$refs.dialogo) return;
      const area = this.$refs.dialogo.getBoundingClientRect();
      if (evento.clientX < area.left || evento.clientX > area.right || evento.clientY < area.top || evento.clientY > area.bottom) {
        this.$refs.dialogo.close();
      }
    },
    aoFechar() {
      document.body.style.overflow = '';
      this.selecionado = null;
      this.botaoAnterior?.focus();
    }
  },
  mounted() {
    this.carregarFilmes();
  }
}).mount('#app');
