/* Declaração de inexistência de cobranças futuras — GAV */
$(function () {
  "use strict";

  var EMPREENDIMENTOS = [
  "Areya Barra Resort",
  "Beach GAV Resorts",
  "Exclusive GAV Resorts",
  "Gran Garden Resort",
  "Gran Haus Resort",
  "Gran Valley Resort",
  "Jeriquiá Dunas Resort",
  "Jeriquiá Lagoa Resort",
  "Oikos Maragogi Resort",
  "Park GAV Resorts",
  "Porto 2 Life Resort",
  "Porto Alto Resort",
  "Premium GAV Resorts",
  "Pyrenéus Residence",
  "Outro (não listado)"
];
  var sel = $("#empreendimento");
  $.each(EMPREENDIMENTOS, function (i, v) { sel.append($("<option>", { value: v, text: v })); });

  $("#cpf").mask("000.000.000-00");

  function hojeISO() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function dataBR(iso) {
    if (!iso) return "";
    var p = iso.split("-");
    return p[2] + "/" + p[1] + "/" + p[0];
  }
  function porExtenso(iso) {
    if (!iso) return "";
    var M = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
    var p = iso.split("-");
    return Number(p[2]) + " de " + M[Number(p[1]) - 1] + " de " + p[0];
  }
  function protocoloNovo() {
    var d = new Date(), n = Math.floor(Math.random() * 9000) + 1000;
    return "DECL-" + d.getFullYear() + String(d.getMonth() + 1).padStart(2, "0") + String(d.getDate()).padStart(2, "0") + "-" + n;
  }

  $("#dataDistrato").val(hojeISO());

  function linha(idLinha, idValor, valor) {
    if (valor) { $(idValor).text(valor); $(idLinha).show(); }
    else { $(idLinha).hide(); }
  }

  $("#formDeclaracao").on("submit", function (e) {
    e.preventDefault();

    var cliente = $("#cliente").val().trim();
    if (!cliente) {
      Swal.fire({ icon: "warning", title: "Informe o nome do cliente" });
      return;
    }

    var protocolo = $("#protocolo").val().trim() || protocoloNovo();
    $("#protocolo").val(protocolo);

    $("#dCliente").text(cliente);
    linha("#lCpf", "#dCpf", $("#cpf").val().trim());
    linha("#lEmp", "#dEmp", $("#empreendimento").val());
    linha("#lCota", "#dCota", $("#cota").val().trim());
    linha("#lContrato", "#dContrato", $("#contrato").val().trim());

    var iso = $("#dataDistrato").val() || hojeISO();
    $("#dData").text(dataBR(iso));

    var cidade = $("#cidade").val().trim();
    $("#dLocal").text((cidade ? cidade + ", " : "") + porExtenso(iso) + ".");

    var resp = $("#responsavel").val().trim();
    if (resp) $("#dResponsavel").text(resp);

    $("#dProtocolo").text(protocolo);

    $("#saida").removeAttr("hidden");
    document.getElementById("saida").scrollIntoView({ behavior: "smooth" });
  });

  $("#btnCapturar").on("click", function () {
    var alvo = document.getElementById("declaracao");
    html2canvas(alvo, { scale: 2, backgroundColor: "#ffffff" }).then(function (canvas) {
      var a = document.createElement("a");
      a.download = "Declaracao - " + ($("#cliente").val().trim() || "cliente") + ".png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    });
  });

  $("#btnImprimir").on("click", function () { window.print(); });

  $("#btnNovo").on("click", function () {
    $("#formDeclaracao")[0].reset();
    $("#dataDistrato").val(hojeISO());
    $("#saida").attr("hidden", true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
