# E-commerce Modular - Next.js

Um e-commerce moderno e completo construído com Next.js 15, TypeScript, Tailwind CSS e outras tecnologias modernas. Projeto otimizado com arquitetura modular, testes unitários e práticas de desenvolvimento atuais.

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 15** - Framework React com App Router e Server Components
- **TypeScript 5** - Tipagem estática robusta
- **Tailwind CSS** - Estilização utilitária moderna
- **React Hook Form** - Formulários performáticos com validação
- **Zod** - Validação de esquemas TypeScript-first

### Estado e Dados
- **TanStack Query (React Query)** - Gerenciamento de estado HTTP com cache
- **React Context** - Gerenciamento de estado global
- **LocalStorage** - Persistência do carrinho

### UI/UX
- **React Hot Toast** - Notificações elegantes
- **Framer Motion** - Animações suaves
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones modernos

### Testes
- **Jest** - Framework de testes unitários
- **Testing Library** - Testes de componentes React
- **MSW (Mock Service Worker)** - Mocking de APIs

### API
- **Fake Store API** - API externa para produtos e autenticação

## 🏗️ Arquitetura do Projeto

### Estrutura Modular
```
src/
├── app/                    # Pages (App Router)
│   ├── login/
│   ├── products/
│   ├── cart/
│   └── checkout/
├── components/
│   ├── ui/                # Componentes reutilizáveis
│   ├── layout/            # Header, Footer
│   └── product/           # Componentes de produto
├── hooks/                 # Custom hooks
│   ├── api/               # Hooks de API
│   ├── auth/              # Hooks de autenticação
│   └── useCart.ts         # Hook do carrinho
├── services/              # Serviços de API
│   ├── api/               # Clientes de API
│   └── orderService.ts    # Serviço de pedidos
├── types/                 # Definições TypeScript
├── utils/                 # Utilitários
├── schemas/               # Schemas de validação Zod
└── __tests__/             # Testes unitários
```

## 📦 Funcionalidades Implementadas

### 🔐 Autenticação
- Login com validação de credenciais
- Proteção de rotas privadas
- Gerenciamento de sessão persistente
- Logout automático

### 🛍️ Catálogo de Produtos
- Listagem de produtos da API
- Detalhes completos do produto
- Filtros por categoria
- Busca por nome/descrição
- Ordenação (preço, nome, avaliação)
- Loading states e skeleton

### 🛒 Carrinho de Compras
- Adicionar/remover produtos
- Atualizar quantidades
- Persistência no localStorage
- Cálculo automático de totais
- Contador de itens no header

### 💳 Checkout
- Formulário completo com validação
- Múltiplos métodos de pagamento
- Validação de CEP com máscara
- Resumo detalhado do pedido
- Simulação de processamento

### 🎨 Interface
- Design responsivo (mobile-first)
- Componentes reutilizáveis
- Notificações toast
- Loading states
- Tratamento de erros
- Animações suaves

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Passo a passo

1. **Clone o repositório**
```bash
git clone <repository-url>
cd ecommerce
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o servidor de desenvolvimento**
```bash
npm run dev
```

4. **Acesse a aplicação**
```
http://localhost:3000
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Gera build de produção
npm run start        # Inicia servidor de produção

# Qualidade de código
npm run lint         # Executa ESLint
npm run type-check   # Verifica tipos TypeScript

# Testes
npm test             # Executa testes unitários
npm run test:watch   # Executa testes em modo watch
npm run test:coverage # Executa testes com cobertura
```

## 🔐 Credenciais de Teste

Para fazer login na aplicação, use as credenciais da Fake Store API:

```
Username: johnd
Password: m38rmF$
```

**Outras opções disponíveis:**
- Username: `mor_2314` | Password: `83r5^_`
- Username: `kevinryan` | Password: `kev02937@`
- Username: `donero` | Password: `ewedon`

Consulte a [documentação da API](https://fakestoreapi.com/users) para mais usuários.

## 🧪 Fluxo de Testes

### Como testar o sistema completo:

1. **Autenticação**
   - Acesse `/login`
   - Use as credenciais: `johnd` / `m38rmF$`
   - Verifique redirecionamento para home

2. **Navegação de Produtos**
   - Explore a listagem de produtos na home
   - Teste filtros por categoria
   - Use a busca por nome
   - Ordene por preço
   - Clique em um produto para ver detalhes

3. **Carrinho de Compras**
   - Adicione produtos ao carrinho
   - Vá para `/cart` ou clique no ícone
   - Teste alterar quantidades
   - Remova produtos
   - Verifique persistência (recarregue a página)

4. **Checkout**
   - No carrinho, clique em "Finalizar Compra"
   - Preencha todos os campos obrigatórios
   - Teste validação de CEP
   - Escolha método de pagamento
   - Finalize o pedido

5. **Responsividade**
   - Teste em diferentes tamanhos de tela
   - Verifique mobile, tablet e desktop
   - Teste navegação touch

### Testes Unitários

```bash
# Executar todos os testes
npm test

# Executar com cobertura
npm run test:coverage

# Executar em modo watch
npm run test:watch
```

**Cobertura atual:**
- Hooks de API: 100%
- Hooks de autenticação: 100%
- Serviços: 95%
- Utilitários: 90%

## 📱 Responsividade

O projeto é totalmente responsivo com:
- **Mobile First** - Design otimizado para mobile
- **Breakpoints** - sm, md, lg, xl, 2xl
- **Touch Friendly** - Botões e interações otimizadas
- **Performance** - Lazy loading e otimizações

## 🔮 Melhorias Futuras

### Funcionalidades
- [ ] Paginação de produtos
- [ ] Wishlist de produtos
- [ ] Histórico de pedidos
- [ ] Avaliações de produtos
- [ ] Cupons de desconto

### Técnicas
- [ ] Testes E2E com Cypress
- [ ] Autenticação JWT real
- [ ] PWA (Progressive Web App)
- [ ] Tema dark/light
- [ ] Internacionalização (i18n)

### Performance
- [ ] Image optimization
- [ ] Code splitting avançado
- [ ] Service Workers
- [ ] Caching strategies

## 🚀 Deploy

O projeto está pronto para deploy no Vercel:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Nota:** Este é um projeto de demonstração que usa a Fake Store API para dados de produtos. Em um ambiente de produção, você deve substituir por uma API real e implementar autenticação adequada.

