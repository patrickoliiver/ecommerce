# LunaCheckout E-commerce

Um e-commerce moderno construído com Next.js 15, TypeScript e Tailwind CSS. Sistema completo de carrinho de compras com autenticação e checkout funcional.

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
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # ESLint
npm test             # Testes unitários
```

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 15** - Framework React com App Router
- **TypeScript 5** - Tipagem estática
- **Tailwind CSS** - Estilização moderna
- **React Hook Form** - Formulários com validação
- **Zod** - Validação de esquemas

### Estado e Dados
- **TanStack Query** - Cache e gerenciamento de estado HTTP
- **React Context** - Estado global
- **LocalStorage** - Persistência do carrinho

### UI/UX
- **React Hot Toast** - Notificações
- **Next.js Image** - Otimização de imagens
- **Responsive Design** - Mobile-first

### Testes
- **Jest** - Testes unitários
- **Testing Library** - Testes de componentes

### API
- **Fake Store API** - Produtos e autenticação

## 📦 Funcionalidades Implementadas

### 🔐 Autenticação
- Login com validação de credenciais
- Proteção de rotas privadas
- Gerenciamento de sessão persistente
- Interface moderna com logo LunaCheckout

### 🛍️ Catálogo de Produtos
- Listagem de produtos da API
- Detalhes completos do produto
- Filtros por categoria e busca
- Design responsivo
- Loading states

### 🛒 Carrinho de Compras
- Adicionar/remover produtos
- Atualizar quantidades
- Persistência no localStorage
- Cálculo automático de totais
- Badge no header com contador

### 💳 Checkout Completo
- Formulário com validação completa
- Dados pessoais e endereço
- Validação de CEP automática
- Múltiplos métodos de pagamento
- Resumo detalhado do pedido
- Histórico de pedidos

### 🎨 Interface
- Design totalmente responsivo
- Header com navegação intuitiva
- Menu mobile otimizado
- Notificações toast
- Tratamento de erros

## 🧪 Como Testar o Carrinho e Checkout

### **Credenciais de Login**
```
Username: johnd
Password: m38rmF$
```

### **Fluxo Completo de Teste:**

#### 1. **Login**
- Acesse `/login`
- Use as credenciais acima
- Verifique redirecionamento para home

#### 2. **Adicionar ao Carrinho**
- Na home, clique em qualquer produto
- Clique em "Adicionar ao Carrinho"
- Veja a confirmação toast
- Observe o badge do carrinho no header

#### 3. **Gerenciar Carrinho**
- Clique no ícone do carrinho no header
- **Teste as funcionalidades:**
  - Alterar quantidades com +/-
  - Remover produtos individualmente
  - Ver totais atualizados automaticamente
  - Testar "Limpar Carrinho"

#### 4. **Processo de Checkout**
- No carrinho, clique "Finalizar Compra"
- **Preencha os dados:**
  - **Dados Pessoais:** Nome, email, telefone
  - **Endereço:** CEP (teste: 01310-100), rua, número, cidade
  - **Pagamento:** Escolha cartão ou PIX
  - **Cartão:** Número, validade, CVV, nome

#### 5. **Validações do Checkout**
- **CEP:** Digite um CEP válido e veja o preenchimento automático
- **Campos obrigatórios:** Deixe campos vazios para ver validações
- **Cartão:** Teste formatos incorretos
- **Resumo:** Confira totais e frete

#### 6. **Finalizar Pedido**
- Clique "Finalizar Pedido"
- Aguarde o processamento
- Será redirecionado para página de sucesso
- Acesse "Meus Pedidos" para ver histórico

### **Teste de Responsividade**
- **Mobile:** Teste menu hamburguer, botão carrinho separado
- **Tablet:** Verifique layout adaptativo
- **Desktop:** Confirme navegação completa

### **Persistência do Carrinho**
- Adicione produtos ao carrinho
- Recarregue a página ou feche o navegador
- Verifique se os itens permanecem

---

**Nota:** Este projeto usa a Fake Store API para demonstração. Em produção, substitua por uma API real com pagamentos seguros.

