export function gerarProximasDatas(qtd = 3, aPartirDe = null) {
  const datas = [];
  const dataInicial = aPartirDe ? new Date(aPartirDe) : new Date();
  let diasAdicionados = 0;

  while (datas.length < qtd) {
    const proximaData = new Date(dataInicial);
    proximaData.setDate(proximaData.getDate() + diasAdicionados);

    const diaSemana = proximaData.getDay();
    if (diaSemana !== 0 && diaSemana !== 6) {
      datas.push(proximaData.toISOString().split("T")[0]);
    }

    diasAdicionados++;
  }

  return datas;
}

// função utilitária para estilos do ShadCN
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
