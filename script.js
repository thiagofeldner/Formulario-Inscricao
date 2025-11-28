// CONTROLE SIMPLES DE PERÍODO
const inicio = new Date("2025-12-04T18:00:00");
const fim = new Date("2026-01-19T18:00:00");
const agora = new Date();

if (agora < inicio || agora > fim) {
  // Remove apenas o conteúdo do container principal, mantém cabeçalho e rodapé
  const container = document.querySelector(".container");
  const alertBox = document.querySelector(".alert-box");

  if (container) {
    container.innerHTML = `
            <div style="min-height: 60vh; display: flex; align-items: center; justify-content: center; padding: 20px;">
                <div class="periodo-aviso">
                    <div class="aviso-icon">${
                      agora < inicio ? "⏰" : "✅"
                    }</div>
                    <h2 class="aviso-titulo">${
                      agora < inicio
                        ? "Formulário em Breve"
                        : "Inscrições Encerradas"
                    }</h2>
                    <p class="aviso-texto">
                        ${
                          agora < inicio
                            ? "Início: 04/12/2025 às 18h"
                            : "Encerramento: 19/01/2026 às 18h"
                        }
                    </p>
                    <div class="aviso-contato">
                        Dúvidas? <strong>selecao024.025@gmail.com</strong>
                    </div>
                </div>
            </div>
        `;
  }

  // Remove o alerta vermelho se existir
  if (alertBox) {
    alertBox.style.display = "none";
  }
}

const pages = document.querySelectorAll(".page");
const nextBtns = document.querySelectorAll(".next");
const prevBtns = document.querySelectorAll(".prev");
const progressBar = document.getElementById("progressBar");
const form = document.getElementById("formInscricao");

let current = 0;

/* ------------------------- */
/*  CONFIGURAÇÃO DINÂMICA PIX */
/* ------------------------- */

const cargosConfig = {
  "Auxiliar Administrativo": {
    valor: "R$ 50,00",
    valorTexto: "Médio - R$50,00",
    valorNumero: "50",
    imagem: "img/AuxAdm.png",
    chavePix:
      "00020126950014br.gov.bcb.pix0140agenciapeixevivo@agenciapeixevivo.org.br0229INSCRICAO AUX. ADMINISTRATIVO520400005303986540550.005802BR5910----------6014BELO HORIZONTE62070503***630403A6",
  },
  "Analista Mobilização": {
    valor: "R$ 70,00",
    valorTexto: "Analista - R$70,00",
    valorNumero: "70",
    imagem: "img/analista.png",
    chavePix:
      "00020126840014br.gov.bcb.pix0140agenciapeixevivo@agenciapeixevivo.org.br0218INSCRICAO ANALISTA520400005303986540570.005802BR5910----------6014BELO HORIZONTE62070503***630414BD",
  },
  "Analista Projetos": {
    valor: "R$ 70,00",
    valorTexto: "Analista - R$70,00",
    valorNumero: "70",
    imagem: "img/analista.png",
    chavePix:
      "00020126840014br.gov.bcb.pix0140agenciapeixevivo@agenciapeixevivo.org.br0218INSCRICAO ANALISTA520400005303986540570.005802BR5910----------6014BELO HORIZONTE62070503***630414BD",
  },
  "Coordenador TI": {
    valor: "R$ 120,00",
    valorTexto: "Coordenador - R$120,00",
    valorNumero: "120",
    imagem: "img/Coordenador.png",
    chavePix:
      "00020126870014br.gov.bcb.pix0140agenciapeixevivo@agenciapeixevivo.org.br0221INSCRICAO COORDENADOR5204000053039865406120.005802BR5910----------6014BELO HORIZONTE62070503***630441E5",
  },
  "Coordenador Projetos (Engenharia)": {
    valor: "R$ 120,00",
    valorTexto: "Coordenador - R$120,00",
    valorNumero: "120",
    imagem: "img/Coordenador.png",
    chavePix:
      "00020126870014br.gov.bcb.pix0140agenciapeixevivo@agenciapeixevivo.org.br0221INSCRICAO COORDENADOR5204000053039865406120.005802BR5910----------6014BELO HORIZONTE62070503***630441E5",
  },
};

/* ------------------------- */
/*  ATUALIZAR INFORMAÇÕES PIX */
/* ------------------------- */

function atualizarInformacoesPix() {
  const funcaoSelect = document.querySelector('select[name="funcao"]');
  const funcaoSelecionada = funcaoSelect.value;
  const config = cargosConfig[funcaoSelecionada];

  if (config) {
    document.getElementById("valorTaxa").textContent = config.valor;
    document.getElementById("qrcodeImage").src = config.imagem;
    document.getElementById("pixKey").value = config.chavePix;

    console.log("✅ PIX atualizado para:", funcaoSelecionada);
  }
}

// ✅ NOVA FUNÇÃO: Atualizar a taxa automaticamente quando mudar a função
function atualizarTaxaPorFuncao() {
  const funcaoSelect = document.querySelector('select[name="funcao"]');
  const taxaSelect = document.getElementById("taxa");
  const funcaoSelecionada = funcaoSelect.value;
  const config = cargosConfig[funcaoSelecionada];

  if (config && taxaSelect) {
    // Se não for isento, atualiza para a taxa correspondente
    if (taxaSelect.value !== "isento") {
      taxaSelect.value = config.valorNumero;
      // Atualiza o display visual
      atualizarDisplayTaxa();
    }

    // Atualiza as opções da taxa
    atualizarOpcoesTaxa(funcaoSelecionada);

    // Atualiza informações PIX se não for isento
    if (taxaSelect.value !== "isento") {
      atualizarInformacoesPix();
    }
  }
}

// ✅ NOVA FUNÇÃO: Atualizar as opções da taxa baseado no cargo
function atualizarOpcoesTaxa(funcaoSelecionada) {
  const taxaSelect = document.getElementById("taxa");
  const config = cargosConfig[funcaoSelecionada];

  if (config && taxaSelect) {
    // Encontra e atualiza a opção correspondente ao valor
    const opcoesTaxa = taxaSelect.querySelectorAll("option");
    opcoesTaxa.forEach((opcao) => {
      if (opcao.value === config.valorNumero) {
        opcao.textContent = config.valorTexto;
      }
    });
  }
}

// ✅ NOVA FUNÇÃO: Atualizar o display visual da taxa
function atualizarDisplayTaxa() {
  const taxaSelect = document.getElementById("taxa");
  const valorSelecionado = taxaSelect.value;

  // Cria ou atualiza o elemento de display
  let taxaDisplay = document.getElementById("taxaDisplay");
  if (!taxaDisplay) {
    taxaDisplay = document.createElement("div");
    taxaDisplay.id = "taxaDisplay";
    taxaDisplay.style.marginTop = "10px";
    taxaDisplay.style.padding = "12px";
    taxaDisplay.style.borderRadius = "8px";
    taxaDisplay.style.fontWeight = "bold";
    taxaDisplay.style.textAlign = "center";
    taxaSelect.parentNode.appendChild(taxaDisplay);
  }

  if (valorSelecionado === "isento") {
    // Mostrar texto de isenção
    taxaDisplay.textContent = "Isento de Taxa";
    taxaDisplay.style.background = "#d4edda";
    taxaDisplay.style.color = "#155724";
    taxaDisplay.style.border = "2px solid #c3e6cb";
  } else {
    // Mostrar valor da taxa baseado no cargo
    const funcaoSelect = document.querySelector('select[name="funcao"]');
    const funcaoSelecionada = funcaoSelect.value;
    const config = cargosConfig[funcaoSelecionada];

    if (config) {
      taxaDisplay.textContent = `Taxa de Inscrição: ${config.valor}`;
      taxaDisplay.style.background = "#fff3cd";
      taxaDisplay.style.color = "#856404";
      taxaDisplay.style.border = "2px solid #ffeaa7";
    }
  }
}

function copiarChavePix() {
  const pixKeyInput = document.getElementById("pixKey");
  const copyButton = document.getElementById("copyPixButton");

  pixKeyInput.select();
  pixKeyInput.setSelectionRange(0, 99999);

  try {
    navigator.clipboard.writeText(pixKeyInput.value).then(() => {
      copyButton.textContent = "Copiado!";
      copyButton.classList.add("copied");

      setTimeout(() => {
        copyButton.textContent = "Copiar";
        copyButton.classList.remove("copied");
      }, 2000);
    });
  } catch (err) {
    document.execCommand("copy");
    copyButton.textContent = "Copiado!";
    copyButton.classList.add("copied");

    setTimeout(() => {
      copyButton.textContent = "Copiar";
      copyButton.classList.remove("copied");
    }, 2000);
  }
}

/* ------------------------- */
/*  VALIDAÇÃO DE CPF REAL - CORRIGIDA */
/* ------------------------- */

function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) return false;

  return true;
}

function formatarCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return cpf;
}

function validarEFormatarCPF(event) {
  const input = event.target;
  let cpf = input.value.replace(/\D/g, "");

  if (cpf.length > 11) {
    cpf = cpf.substring(0, 11);
  }

  input.value = formatarCPF(cpf);

  input.classList.remove("invalido");

  const errorMessage = input.parentNode.querySelector(".cpf-error-message");
  if (errorMessage) {
    errorMessage.remove();
  }

  if (cpf.length === 11) {
    if (!validarCPF(cpf)) {
      input.classList.add("invalido");

      const error = document.createElement("div");
      error.className = "error-message cpf-error-message";
      error.textContent = "CPF inválido. Por favor, verifique o número.";
      input.parentNode.appendChild(error);

      return false;
    }
  } else if (cpf.length > 0 && cpf.length < 11) {
    input.classList.add("invalido");
    const error = document.createElement("div");
    error.className = "error-message cpf-error-message";
    error.textContent = "CPF incompleto. Digite os 11 números.";
    input.parentNode.appendChild(error);
    return false;
  }

  return true;
}

/* ------------------------- */
/*  CONSULTA AUTOMÁTICA DE CEP */
/* ------------------------- */

function consultarCEP() {
  const cepInput = document.getElementById("cep");
  let cep = cepInput.value.replace(/\D/g, "");

  if (cep.length !== 8) {
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.erro) {
        document.querySelector('input[name="rua"]').value =
          data.logradouro || "";
        document.querySelector('input[name="bairro"]').value =
          data.bairro || "";
        document.querySelector('input[name="cidade"]').value =
          data.localidade || "";
        document.querySelector('input[name="estado"]').value = data.uf || "";

        document.querySelector('input[name="numero"]').focus();
      }
    })
    .catch((error) => {
      console.error("Erro ao consultar CEP:", error);
    });
}

/* ------------------------- */
/*  VERIFICAR CADASTRO EXISTENTE */
/* ------------------------- */

async function verificarCadastroExistente(cpf) {
  try {
    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbxG3zJfn6Gp3sMZnZ0jZHHSJlHI4AsUPkoMTO-TJE0p2Cbx9zrpACNdpXVYcFbxKupM/exec";

    const cpfLimpo = cpf.replace(/\D/g, "");

    const response = await fetch(`${scriptUrl}?acao=verificar&cpf=${cpfLimpo}`);
    const resultado = await response.json();

    return resultado.existe;
  } catch (error) {
    console.error("❌ Erro ao verificar cadastro:", error);
    return false;
  }
}

/* ------------------------- */
/*  MODAL DE ALERTA */
/* ------------------------- */
function mostrarAlertaDuplicacao() {
  const modal = document.createElement("div");
  modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

  modal.innerHTML = `
        <div style="
            background: white;
            padding: 30px;
            border-radius: 12px;
            text-align: center;
            max-width: 400px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        ">
            <div style="font-size: 48px; margin-bottom: 20px;">⚠️</div>
            <h3 style="color: #dc3545; margin-bottom: 10px; font-size: 20px;">
                CPF já cadastrado em nosso sistema!
            </h3>
            <p style="margin-bottom: 25px; line-height: 1.5; font-size: 16px;">
                <strong>Você já possui uma inscrição ativa.</strong><br>
                Não é permitido mais de uma inscrição por CPF.
            </p>
            <button onclick="redirecionarInicio()" style="
                background: #dc3545;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
                font-size: 16px;
            ">
                Voltar ao Início
            </button>
        </div>
    `;

  document.body.appendChild(modal);
}

function redirecionarInicio() {
  window.location.href = window.location.origin + window.location.pathname;
}

/* ------------------------- */
/*  VALIDAÇÃO DE CAMPOS */
/* ------------------------- */

function validarApenasNumeros(event) {
  const input = event.target;
  input.value = input.value.replace(/\D/g, "");
}

function validarEmail(event) {
  const input = event.target;
  const email = input.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email && !emailRegex.test(email)) {
    input.style.borderColor = "#dc3545";
    input.style.background = "#f8d7da";
  } else {
    input.style.borderColor = "";
    input.style.background = "";
  }
}

function formatarTelefone(event) {
  let value = event.target.value.replace(/\D/g, "");

  if (value.length <= 11) {
    value = value
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }
  event.target.value = value;
}

function validarNumerosComLimite(event, maxDigits) {
  const input = event.target;
  input.value = input.value.replace(/\D/g, "");
  if (input.value.length > maxDigits) {
    input.value = input.value.slice(0, maxDigits);
  }
}

function validarApenasTexto(event) {
  const input = event.target;
  input.value = input.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
}

/* ------------------------- */
/*  NAVEGAÇÃO ENTRE PÁGINAS */
/* ------------------------- */

function showPage(i) {
  pages.forEach((p) => p.classList.remove("active"));
  pages[i].classList.add("active");

  const progress = ((i + 1) / pages.length) * 100;
  progressBar.style.width = progress + "%";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (validatePage(current)) {
      if (current < pages.length - 1) {
        current++;
        showPage(current);
      }
    }
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (current > 0) {
      current--;
      showPage(current);
    }
  });
});

/* ------------------------- */
/*  VALIDAÇÃO DE PÁGINAS - CORRIGIDA */
/* ------------------------- */

function validatePage(pageIndex) {
  const page = pages[pageIndex];
  const inputs = page.querySelectorAll("input, select, textarea");
  let valid = true;

  inputs.forEach((input) => {
    input.style.borderColor = "";
    input.style.background = "";
  });

  page.querySelectorAll(".error-message").forEach((e) => e.remove());

  if (page.id === "page2") {
    const cpfInput = document.getElementById("cpf");
    if (cpfInput) {
      const cpfLimpo = cpfInput.value.replace(/\D/g, "");

      if (cpfLimpo.length > 0 && cpfLimpo.length < 11) {
        valid = false;
        const error = document.createElement("div");
        error.className = "error-message";
        error.textContent = "CPF incompleto. Digite os 11 números.";
        cpfInput.parentNode.appendChild(error);
        cpfInput.classList.add("invalido");
      } else if (cpfLimpo.length === 11 && !validarCPF(cpfInput.value)) {
        valid = false;
        const error = document.createElement("div");
        error.className = "error-message";
        error.textContent = "CPF inválido. Por favor, verifique o número.";
        cpfInput.parentNode.appendChild(error);
        cpfInput.classList.add("invalido");
      }
    }
  }

  inputs.forEach((input) => {
    let isRequired = input.hasAttribute("required");

    if (
      input.id === "descricaoPcd" &&
      !document.getElementById("campoPcdDescricao").classList.contains("hidden")
    ) {
      isRequired = true;
    }

    if (isRequired) {
      if (
        (input.type === "checkbox" && !input.checked) ||
        (!input.value && input.type !== "checkbox" && input.type !== "radio")
      ) {
        valid = false;
        const error = document.createElement("div");
        error.className = "error-message";
        error.textContent = "Este campo é obrigatório";

        if (input.closest(".lgpd-container")) {
          input
            .closest(".lgpd-container")
            .insertAdjacentElement("afterend", error);
        } else {
          input.insertAdjacentElement("afterend", error);
        }

        input.style.borderColor = "#dc3545";
        input.style.background = "#f8d7da";
      }
    }
  });

  if (page.id === "page4") {
    const formacaoChecked = Array.from(
      document.querySelectorAll("#formacaoGroup input")
    ).some((cb) => cb.checked);
    if (!formacaoChecked) {
      valid = false;
      const error = document.createElement("div");
      error.className = "error-message";
      error.textContent =
        "Selecione pelo menos uma opção em Formação Acadêmica";
      document
        .getElementById("formacaoGroup")
        .insertAdjacentElement("afterend", error);
    }
  }

  if (page.id === "page5") {
    const lgpdSelected = document.querySelector('input[name="lgpd"]:checked');
    if (!lgpdSelected) {
      valid = false;
      const error = document.createElement("div");
      error.className = "error-message";
      error.textContent = "Selecione uma opção para continuar";
      document
        .querySelector(".lgpd-container")
        .insertAdjacentElement("afterend", error);
    } else if (lgpdSelected.value === "nao") {
      window.location.href = "obrigado/obrigado.html";
      return false;
    }
  }

  return valid;
}

/* ------------------------- */
/*  CAMPOS DINÂMICOS */
/* ------------------------- */

document.getElementById("estadoCivil").addEventListener("change", (e) => {
  const campo = document.getElementById("campoOutroEstadoCivil");
  campo.classList.toggle("hidden", e.target.value !== "outro");
  document.getElementById("estadoCivilOutro").required =
    e.target.value === "outro";
});

document.getElementById("pcd").addEventListener("change", (e) => {
  const campo = document.getElementById("campoPcdDescricao");
  campo.classList.toggle("hidden", e.target.value !== "sim");
  document.getElementById("descricaoPcd").required = e.target.value === "sim";
});

document.getElementById("origemInfo").addEventListener("change", (e) => {
  const campo = document.getElementById("origemInfoOutro");
  campo.classList.toggle("hidden", e.target.value !== "outro");
  campo.required = e.target.value === "outro";
});

document.getElementById("parentesco").addEventListener("change", (e) => {
  const campo = document.getElementById("campoGrauParentesco");
  campo.classList.toggle("hidden", e.target.value !== "sim");
  campo.querySelector("input").required = e.target.value === "sim";
});

document.getElementById("genero")?.addEventListener("change", (e) => {
  const campoOutro = document.getElementById("campoOutroGenero");
  const isOutro = e.target.value === "outro";

  campoOutro.classList.toggle("hidden", !isOutro);

  const inputOutro = document.querySelector('input[name="generoOutro"]');
  if (inputOutro) {
    inputOutro.required = isOutro;
  }
});

/* ------------------------- */
/*  FORMAÇÃO ACADÊMICA */
/* ------------------------- */

const checkboxesFormacao = document.querySelectorAll("#formacaoGroup input");
const camposExtras = document.getElementById("camposExtrasFormacao");

checkboxesFormacao.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    const existingField = document.getElementById(this.value + "Input");

    if (this.checked && !existingField) {
      const labelText = this.parentElement
        .querySelector("span")
        .textContent.trim();

      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = `Informe seus cursos em ${labelText}`;
      input.name = this.value + "Detalhe";
      input.id = this.value + "Input";
      input.classList.add("input-extra");
      input.required = true;

      camposExtras.appendChild(input);
    } else if (!this.checked && existingField) {
      existingField.remove();
    }
  });
});

/* ------------------------- */
/*  FORMATAÇÃO DE CAMPOS */
/* ------------------------- */

document.getElementById("cpf")?.addEventListener("input", validarEFormatarCPF);
document.getElementById("cpf")?.addEventListener("blur", validarEFormatarCPF);

document.getElementById("telefone")?.addEventListener("input", function (e) {
  validarNumerosComLimite(e, 11);
  formatarTelefone(e);
});

document.getElementById("cep")?.addEventListener("input", function (e) {
  validarNumerosComLimite(e, 8);

  let value = e.target.value.replace(/\D/g, "");
  if (value.length <= 8) {
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
  }
  e.target.value = value;
});

document.getElementById("cep")?.addEventListener("blur", consultarCEP);

document
  .querySelector('input[name="email"]')
  ?.addEventListener("blur", validarEmail);
document
  .querySelector('input[name="numero"]')
  ?.addEventListener("input", validarApenasNumeros);
document
  .querySelector('input[name="cnh"]')
  ?.addEventListener("input", validarApenasNumeros);
document
  .querySelector('input[name="nomeCompleto"]')
  ?.addEventListener("input", validarApenasTexto);
document
  .querySelector('input[name="mae"]')
  ?.addEventListener("input", validarApenasTexto);
document
  .querySelector('input[name="pai"]')
  ?.addEventListener("input", validarApenasTexto);
document
  .querySelector('input[name="cidade"]')
  ?.addEventListener("input", validarApenasTexto);
document
  .querySelector('input[name="bairro"]')
  ?.addEventListener("input", validarApenasTexto);
document
  .querySelector('input[name="rua"]')
  ?.addEventListener("input", validarApenasTexto);
document
  .querySelector('input[name="estado"]')
  ?.addEventListener("input", validarApenasTexto);

/* ------------------------- */
/*  CAMPOS DE TAXA - VERSÃO ATUALIZADA */
/* ------------------------- */

function toggleCamposTaxa() {
  const taxaSelect = document.getElementById("taxa");
  const infoIsento = document.getElementById("infoIsento");
  const camposPagamento = document.getElementById("camposPagamento");
  const labelComprovante = document.getElementById("labelComprovante");
  const comprovanteInput = document.querySelector('input[name="comprovante"]');

  const valorSelecionado = taxaSelect.value;
  const isIsento = valorSelecionado === "isento";

  // ✅ ATUALIZAÇÃO: Atualiza o display visual da taxa
  atualizarDisplayTaxa();

  if (isIsento) {
    // MODO ISENTO
    infoIsento.classList.remove("hidden");
    camposPagamento.classList.add("hidden");
    labelComprovante.textContent = "Envie o requerimento de isenção";
    comprovanteInput.placeholder =
      "Anexe o requerimento preenchido e comprovantes";
  } else if (valorSelecionado) {
    // MODO COM TAXA
    infoIsento.classList.add("hidden");
    camposPagamento.classList.remove("hidden");
    labelComprovante.textContent = "Envie o comprovante de pagamento";
    comprovanteInput.placeholder = "";

    // Atualizar informações PIX baseado na função selecionada
    atualizarInformacoesPix();
  } else {
    // NENHUMA TAXA SELECIONADA
    infoIsento.classList.add("hidden");
    camposPagamento.classList.add("hidden");
    labelComprovante.textContent = "Envie o comprovante";
    comprovanteInput.placeholder = "Selecione uma taxa primeiro";
  }
}

/* ------------------------- */
/*  ENVIO DO FORMULÁRIO - CORRIGIDO */
/* ------------------------- */

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // VERIFICAÇÃO DE CADASTRO DUPLICADO
  const cpfInput = document.getElementById("cpf");
  if (cpfInput && cpfInput.value.replace(/\D/g, "").length === 11) {
    const cpf = cpfInput.value.replace(/\D/g, "");

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Verificando...";
    submitBtn.disabled = true;

    const jaCadastrado = await verificarCadastroExistente(cpf);

    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    if (jaCadastrado) {
      mostrarAlertaDuplicacao();
      return;
    }

    if (!validarCPF(cpfInput.value)) {
      current = 1;
      showPage(current);

      cpfInput.classList.add("invalido");

      const error = document.createElement("div");
      error.className = "error-message";
      error.textContent = "CPF inválido. Por favor, verifique o número.";
      cpfInput.parentNode.appendChild(error);

      cpfInput.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
  } else if (cpfInput && cpfInput.value.replace(/\D/g, "").length > 0) {
    current = 1;
    showPage(current);

    cpfInput.classList.add("invalido");

    const error = document.createElement("div");
    error.className = "error-message";
    error.textContent = "CPF incompleto. Digite os 11 números.";
    cpfInput.parentNode.appendChild(error);

    cpfInput.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  if (!validatePage(current)) {
    const firstError = document.querySelector(".error-message");
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return;
  }

  const lgpdRadio = document.querySelector('input[name="lgpd"]:checked');
  if (lgpdRadio && lgpdRadio.value === "nao") {
    window.location.href = "obrigado/obrigado.html";
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Enviando...";
  submitBtn.disabled = true;

  try {
    const formData = new FormData(form);
    const dados = {};

    for (let [key, value] of formData.entries()) {
      dados[key] = value;
    }

    checkboxesFormacao.forEach((cb) => {
      const detalhe = document.getElementById(cb.value + "Input");
      if (detalhe) dados[cb.value + "Detalhe"] = detalhe.value;
    });

    dados.lgpd = lgpdRadio ? lgpdRadio.value : "Não selecionado";

    const comprovanteInput = document.querySelector(
      'input[name="comprovante"]'
    );
    if (comprovanteInput && comprovanteInput.files[0]) {
      const file = comprovanteInput.files[0];
      dados.comprovanteBase64 = await fileToBase64(file);
      dados.comprovanteNome = file.name;
      dados.comprovanteTipo = file.type;
    }

    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbxG3zJfn6Gp3sMZnZ0jZHHSJlHI4AsUPkoMTO-TJE0p2Cbx9zrpACNdpXVYcFbxKupM/exec";

    const response = await fetch(scriptUrl, {
      method: "POST",
      body: new URLSearchParams(dados),
    });

    if (response.ok) {
      window.location.href = "confirmacao/confirmacao.html";
    } else {
      throw new Error("Erro no servidor");
    }
  } catch (error) {
    console.error("Erro detalhado:", error);
    alert("Erro ao enviar o formulário. Tente novamente.");

    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});

/* ------------------------- */
/*  INICIALIZAÇÃO */
/* ------------------------- */

function initializeForm() {
  const allInputs = document.querySelectorAll("input, select, textarea");
  allInputs.forEach((input) => {
    input.style.borderColor = "";
    input.style.background = "";
    input.style.boxShadow = "";
    input.removeAttribute("aria-invalid");
  });

  document.querySelectorAll(".error-message").forEach((msg) => msg.remove());

  const copyButton = document.getElementById("copyPixButton");
  if (copyButton) {
    copyButton.addEventListener("click", copiarChavePix);
  }

  // ✅ ATUALIZAÇÃO: Event listeners para função e taxa
  const funcaoSelect = document.querySelector('select[name="funcao"]');
  if (funcaoSelect) {
    funcaoSelect.addEventListener("change", function () {
      atualizarTaxaPorFuncao();
      toggleCamposTaxa();
    });
  }

  const taxaSelect = document.getElementById("taxa");
  if (taxaSelect) {
    taxaSelect.addEventListener("change", toggleCamposTaxa);
  }

  toggleCamposTaxa();
  showPage(0);
}

document.addEventListener("DOMContentLoaded", initializeForm);
window.addEventListener("load", initializeForm);
document.addEventListener("pageshow", initializeForm);
