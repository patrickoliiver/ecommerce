# E-commerce Modular - Desafio Técnico

Um e-commerce moderno e completo construído com Next.js 15, TypeScript, Tailwind CSS e outras tecnologias modernas.

## 🚀 Quick Start

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```

### Build
```bash
npm run build
npm start
```

### Testes
```bash
npm test
```

**Acesso**: http://localhost:3000

**Login**: 
- Email: `admin@test.com`
- Senha: `123456`

## 🎯 Desafio Técnico - STATUS: ✅ COMPLETO

### ✅ Requisitos Obrigatórios (9/9)
- [x] Listagem de produtos da API
- [x] Adicionar/remover/editar produto
- [x] Página do produto
- [x] Adicionar/remover do carrinho
- [x] Formulário de checkout com validação
- [x] Testes unitários com Jest (12 testes passando)
- [x] Layout responsivo
- [x] TypeScript sem erros
- [x] Sistema de autenticação

### ✅ Requisitos Importantes (5/5)
- [x] Filtro por categoria
- [x] Persistência do carrinho
- [x] Loading states
- [x] Design limpo
- [x] Tratamento de erros

### ✅ Diferenciais (5/5)
- [x] Busca por nome
- [x] Ordenação por preço
- [x] Animações CSS
- [x] Toast notifications
- [x] Validação de CEP

## 🗂️ Navegação

### Fluxo Completo:
1. **Login** (`/login`) → Entre com admin@test.com / 123456
2. **Home** (`/`) → Lista produtos, filtros, busca
3. **Produto** (`/products/[id]`) → Clique em um produto
4. **Carrinho** (`/cart`) → Clique no ícone do carrinho
5. **Checkout** (`/checkout`) → Clique em "Finalizar Compra"
6. **Sucesso** (`/order-success`) → Após checkout
7. **Pedidos** (`/orders`) → Histórico de compras

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **TanStack Query** - Gerenciamento de estado HTTP
- **React Hook Form** - Formulários performáticos
- **Zod** - Validação de esquemas
- **React Hot Toast** - Notificações
- **Jest** - Testes unitários
- **Testing Library** - Testes de componentes
- **Fake Store API** - API externa para produtos

## 🏗️ Arquitetura

### Estrutura Modular:
```
src/
├── app/                    # Pages (App Router)
├── components/
│   ├── ui/                # Componentes reutilizáveis
│   ├── layout/            # Header, Footer
│   └── product/           # Componentes de produto
├── contexts/              # Context APIs
├── hooks/                 # Custom hooks
├── services/              # API services
├── types/                 # TypeScript definitions
├── utils/                 # Utilities
└── __tests__/             # Testes unitários
```

## 📦 Funcionalidades Principais

### 🔐 Autenticação
- Login simulado com validação
- Proteção de rotas
- Gerenciamento de sessão

### 🛍️ Produtos
- Listagem com paginação
- Filtros por categoria
- Busca por nome
- Ordenação por preço
- Detalhes do produto

### 🛒 Carrinho
- Adicionar/remover produtos
- Atualizar quantidades
- Persistência no localStorage
- Cálculo de totais

### 💳 Checkout
- Formulário completo
- Validação de campos
- Máscaras para CEP/telefone
- Múltiplos métodos de pagamento
- Resumo do pedido

### 🧪 Testes
- 12 testes unitários
- Cobertura de componentes
- Hooks testados
- Jest + Testing Library

## 🎨 Interface

### Recursos de UX:
- ✅ Design responsivo (mobile-first)
- ✅ Loading states
- ✅ Error handling
- ✅ Toast notifications
- ✅ Animações suaves
- ✅ Feedback visual

### Mobile & Desktop:
- Breakpoints adaptativos
- Touch-friendly
- Navegação intuitiva
  - Proteção de rotas

- **Produtos**
  - Listagem de produtos da Fake Store API
  - Detalhes do produto
  - Filtros por categoria
  - Busca por nome
  - Ordenação (preço, nome, avaliação)

- **Carrinho**
  - Adicionar/remover produtos
  - Atualizar quantidades
  - Persistência no localStorage
  - Contador de itens no header

- **Checkout**
  - Formulário completo de checkout
  - Validação com Zod
  - Simulação de processamento
  - Diferentes métodos de pagamento (cartão, PIX)

- **Interface**
  - Design responsivo
  - Componentes reutilizáveis
  - Notificações toast
  - Loading states
  - Tratamento de erros

- **Testes**
  - Testes unitários com Jest
  - Testes de componentes
  - Testes de hooks
  - Cobertura de código

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd ecommerce
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse http://localhost:3000

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter
- `npm test` - Executa os testes
- `npm run test:watch` - Executa os testes em modo watch

## 🔐 Credenciais de Teste

Para fazer login, use qualquer usuário da Fake Store API:

```
Username: johnd
Password: m38rmF$
```

Ou consulte a [documentação da API](https://fakestoreapi.com/users) para outros usuários.

## 🧪 Testes

O projeto inclui testes unitários para componentes e hooks:

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage
```

## 📱 Responsividade

O projeto é totalmente responsivo e funciona bem em:
- Desktop
- Tablet
- Mobile

## 🔮 Próximos Passos

- [ ] Implementar paginação de produtos
- [ ] Adicionar wishlist
- [ ] Implementar histórico de pedidos
- [ ] Adicionar avaliações de produtos
- [ ] Implementar autenticação real
- [ ] Adicionar temas dark/light
- [ ] Implementar PWA
- [ ] Adicionar mais testes E2E

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

## 👨‍💻 Autor

Desenvolvido com ❤️ por [Seu Nome]

---

**Nota:** Este é um projeto de demonstração que usa a Fake Store API para dados de produtos. Em um ambiente de produção, você deve substituir por uma API real e implementar autenticação adequada.
