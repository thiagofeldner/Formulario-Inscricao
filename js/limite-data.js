// limite-data.js - VERSÃO ULTRA SIMPLES PARA CONCURSO

function verificarPeriodoDisponibilidade() {
  // Período: 04/12/2025 18:00 até 19/01/2026 18:00
  const dataInicio = new Date("2025-12-04T18:00:00");
  const dataFim = new Date("2026-01-19T18:00:00");
  const agora = new Date();

  const form = document.getElementById("formInscricao");
  if (!form) return;

  const container = document.querySelector(".container");
  if (!container) return;

  const header = document.querySelector(".site-header");
  const footer = document.querySelector(".site-footer");

  if (agora < dataInicio) {
    // ANTES do período
    const mensagem = document.createElement("div");
    mensagem.id = "status-periodo";
    mensagem.style.cssText =
      'width:100%;max-width:800px;margin:30px auto;padding:40px 30px;text-align:center;border-radius:12px;font-family:"Segoe UI",sans-serif;box-shadow:0 10px 30px rgba(0,0,0,0.1);background:#e3f2fd;border:2px solid #2196f3;color:#1565c0;';

    mensagem.innerHTML =
      '<h2 style="margin-bottom:15px;">Inscrições em Breve</h2>' +
      "<p>As inscrições para o Processo Seletivo estarão disponíveis conforme edital:</p>" +
      '<p style="margin:20px 0;font-size:18px;font-weight:bold;">04/12/2025 às 18:00 até 19/01/2026 às 18:00</p>' +
      "<p>Volte na data indicada para realizar sua inscrição.</p>";

    container.style.display = "none";
    if (header && footer) {
      header.parentNode.insertBefore(mensagem, footer);
    }
  } else if (agora > dataFim) {
    // DEPOIS do período
    const mensagem = document.createElement("div");
    mensagem.id = "status-periodo";
    mensagem.style.cssText =
      'width:100%;max-width:800px;margin:30px auto;padding:40px 30px;text-align:center;border-radius:12px;font-family:"Segoe UI",sans-serif;box-shadow:0 10px 30px rgba(0,0,0,0.1);background:#ffebee;border:2px solid #f44336;color:#c62828;';

    mensagem.innerHTML =
      '<h2 style="margin-bottom:15px;">Período de Inscrições Encerrado</h2>' +
      "<p>O período para inscrições no Processo Seletivo foi finalizado conforme edital.</p>" +
      '<p style="margin:20px 0;font-size:18px;font-weight:bold;">Período: 04/12/2025 18h até 19/01/2026 18h</p>' +
      "<p>Consulte o edital para informações sobre as próximas etapas.</p>";

    container.style.display = "none";
    if (header && footer) {
      header.parentNode.insertBefore(mensagem, footer);
    }
  } else {
    // DENTRO do período
    const banner = document.createElement("div");
    banner.id = "banner-periodo-ativo";
    banner.style.cssText =
      "background:#e8f5e9;border:2px solid #2e7d32;border-radius:12px;padding:15px 20px;margin:20px auto;color:#1b5e20;text-align:center;max-width:800px;font-size:14px; margin-top:0;";

    // banner.innerHTML =
    //   '<p style="margin:0;font-weight:bold;">INSCRIÇÕES ABERTAS (04/12/2025 18h - 19/01/2026 18h)</p>' +
    //   '<p style="margin:5px 0 0 0;font-size:13px;">Consulte o edital para informações completas.</p>';

    // container.insertBefore(banner, form);
  }
}

// Executar quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", verificarPeriodoDisponibilidade);
