# Guia Simples - Implementacao de EmailJS

Este guia explica, de forma simples, como foi implementado o envio de emails no formulario de contactos com EmailJS.

## 1) O que e o EmailJS

O EmailJS permite enviar emails diretamente do frontend (HTML + JavaScript), sem criar backend proprio.

## 2) O que foi preparado no projeto

- Formulario de contactos com os campos:
  - `name`
  - `email`
  - `message`
- Validacao basica no JavaScript:
  - Campos obrigatorios
  - Formato de email valido
- Mensagens visuais para:
  - Sucesso no envio
  - Erro no envio

## 3) Configuracao no site do EmailJS

1. Criar conta em `https://www.emailjs.com/`
2. Em **Email Services**, criar e ligar um servico (ex.: Outlook)
3. Guardar o `Service ID` (ex.: `service_xxxxxxx`)
4. Em **Email Templates**, criar um template
5. Guardar o `Template ID` (ex.: `template_xxxxxxx`)
6. Em **Account > General**, copiar a `Public Key`

## 4) Variaveis do template

No template do EmailJS, usar estas variaveis:

- `{{from_name}}`
- `{{from_email}}`
- `{{message}}`

Exemplo de conteudo:

`De: {{from_name}} ({{from_email}})`

`Mensagem: {{message}}`

## 5) Codigo JavaScript (estrutura usada)

1. Inicializar o EmailJS com a chave publica:

```js
emailjs.init("SUA_PUBLIC_KEY");
```

2. No submit do formulario, enviar:

```js
emailjs.send("SEU_SERVICE_ID", "SEU_TEMPLATE_ID", {
  from_name: name,
  from_email: email,
  message: message
});
```

3. Tratar sucesso e erro com `.then(...)` e mensagem para o utilizador.

## 6) Erros comuns e solucao

- **Public Key is invalid**
  - Confirmar a Public Key em `Account > General`
- **Service/Template invalid**
  - Confirmar IDs em Email Services e Email Templates
- **Nada acontece ao clicar enviar**
  - Verificar se o script do EmailJS foi carregado
  - Verificar erros na consola do navegador (F12)

## 7) Checklist final

- [ ] Public Key correta
- [ ] Service ID correto
- [ ] Template ID correto
- [ ] Variaveis do template corretas
- [ ] Formulario com `name`, `email`, `message`
- [ ] Validacao ativa

---

Se tudo estiver correto, o formulario envia a mensagem e o email chega a caixa de entrada configurada no servico EmailJS.
