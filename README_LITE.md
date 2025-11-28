# 📝 Formulário de Inscrição -- Agência Peixe Vivo

Sistema simples e eficiente para cadastro de candidatos em processos
seletivos, com validações automáticas, etapas guiadas e integração PIX.

------------------------------------------------------------------------

## 🚀 Principais Recursos

-   Formulário **multi-etapas** com barra de progresso\
-   **Validação automática** de CPF, CEP, e-mail e telefone\
-   **Evita duplicidade** por CPF\
-   Campos dinâmicos conforme seleção\
-   Upload de documentos (PDF/JPG/PNG)\
-   Sistema de taxas com **PIX integrado**

------------------------------------------------------------------------

## 🛠 Tecnologias

-   **HTML5** -- Estrutura\
-   **CSS3** -- Layout responsivo\
-   **JavaScript (ES6+)** -- Validações e lógica\
-   **Google Apps Script** -- Backend + Sheets\
-   **ViaCEP API** -- Consulta automática de endereço

------------------------------------------------------------------------

## 📦 Estrutura

    /formulario-inscricao
    │ index.html
    │ style.css
    │ script.js
    │
    ├── img/
    ├── confirmacao/
    └── obrigado/

------------------------------------------------------------------------

## ⚙️ Como Usar

1.  Abra os arquivos em um servidor local ou hospedagem simples.\
2.  Configure seu endpoint no Apps Script:\

``` javascript
const scriptUrl = "https://script.google.com/macros/s/AKfycbzb0Ps9bYV2m-473hxiLcdsjt9WD89w0kl_O_BnvJWDvDNJHok3_dytIKCLUgkGEDO_8Q/exec";
```

3.  Ajuste cargos, valores e imagens no `script.js`.

------------------------------------------------------------------------

## 🧩 Recursos do Sistema

-   Validação clara de campos obrigatórios\
-   Formatação automática (CPF, telefone, CEP)\
-   Envio seguro via Apps Script\
-   QR Code PIX gerado conforme o cargo\
-   Tela de confirmação e resumo da inscrição

------------------------------------------------------------------------

## 📱 Responsivo

Funciona perfeitamente em:

-   📱 Smartphones\
-   💻 Tablets\
-   🖥️ Desktop

------------------------------------------------------------------------

## ♿ Acessibilidade

-   Navegação por teclado\
-   Contraste adequado\
-   Labels semânticos

------------------------------------------------------------------------

## 👥 Créditos e Desenvolvimento

Desenvolvido por: **Thiago Feldner – InterOp**  
Para: **Agência Peixe Vivo**  
Tipo: **Sistema de Inscrição para Processo Seletivo**

------------------------------------------------------------------------

## 📄 Licença

Uso restrito para processos seletivos da Agência Peixe Vivo.
