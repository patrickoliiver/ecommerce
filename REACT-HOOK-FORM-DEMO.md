# Demonstração do React Hook Form

Este projeto utiliza **React Hook Form** extensivamente para gerenciar formulários de forma performática e com validação robusta.

## Páginas que usam React Hook Form:

### 1. **Login** (`/login`)
- Formulário de autenticação
- Validação com Zod
- Campos: username, password
- Demonstração de erro em tempo real

### 2. **Checkout** (`/checkout`)
- Formulário completo de finalização
- Validação condicional (cartão só aparece se método selecionado)
- Máscaras automáticas (CEP, telefone)
- Campos: dados pessoais, endereço, pagamento

## Recursos implementados:

### ✅ **Validação em tempo real**
- Erros aparecem conforme o usuário digita
- Validações customizadas com Zod
- Mensagens de erro específicas

### ✅ **Máscaras automáticas**
- CEP: 00000-000
- Telefone: (00) 00000-0000
- Aplicadas automaticamente durante a digitação

### ✅ **Validação condicional**
- Campos do cartão só são obrigatórios se método = cartão
- Validação dinâmica baseada no estado do formulário

### ✅ **Performance**
- Re-renders minimizados
- Validação só quando necessário
- Debounce automático

## Como testar:

1. **Login**: Tente entrar com dados inválidos
2. **Checkout**: Adicione produtos ao carrinho e vá para checkout
3. **Validação**: Deixe campos em branco e veja os erros
4. **Máscaras**: Digite CEP e telefone e veja a formatação automática

## Código exemplo:

```typescript
// Esquema de validação com Zod
const checkoutSchema = z.object({
  email: z.string().email('Email inválido'),
  firstName: z.string().min(2, 'Nome muito curto'),
  zipCode: z.string().regex(/^\d{5}-?\d{3}$/, 'CEP inválido'),
  // ... outros campos
});

// Hook Form com validação
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(checkoutSchema)
});
```

**React Hook Form está sendo usado corretamente em todo o projeto!**
