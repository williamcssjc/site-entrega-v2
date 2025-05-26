# Arte Velha – Sistema de Entregas e Rastreamento

Este projeto foi criado para organizar o processo de **agendamento de entregas**, **manejo de móveis** e **rastreamento em tempo real**, usado pelas lojas da **Arte Velha Móveis Rústicos**. 

## 🧭 Fluxo do sistema

### Página inicial
Interface com três perfis:
- **Cliente**: rastreia a entrega pelo número do pedido.
- **Vendedor**: agenda a entrega e envia o romaneio em PDF.
- **Logística**: aprova ou ajusta os agendamentos e maneja datas disponíveis.

---

## ✅ Funcionalidades já implementadas

### 🔒 Firebase
- Configuração completa do **Firebase** (Firestore e Storage).
- Coleções:
  - `entregas`: armazena dados das entregas agendadas.
  - `rastreamentoEquipes`: armazena a localização atual da equipe de entrega.
  - `manejos`: (planejado para organizar dias e lojas de manejo).

### 📦 Agendamento de Entrega (Vendedor)
- Upload de **romaneio em PDF** com leitura automática (nome, pedido, endereço, vendedor, produto).
- Combobox de cidades e sugestões de datas.
- Opção para indicar se precisa de **manejo**.
- Geração automática de datas de entrega a partir do dia do manejo.
- Salvamento no Firestore com status `pendente`.

### 📍 Rastreamento (Cliente)
- Página onde o cliente digita o número do pedido.
- Localização da equipe exibida no mapa (via Leaflet + Firebase Listener).
- Informações básicas da entrega visíveis (produto, cidade, status, nome do cliente).

---

## ⚒️ Componentes prontos

- `UploadRomaneio.jsx`: lê PDFs com `pdfjs-dist`, extrai dados automaticamente.
- `ComboboxCidades.jsx`: permite selecionar cidade no agendamento.
- `ConsultaRapida.jsx`: visualização de entregas por número ou cidade.
- `MapaEntrega.jsx`: mostra a localização da equipe no mapa.

---

## ⚠️ O que ainda precisa ser feito

### 🔜 Agendamento
- [ ] Impedir envio se número do pedido estiver vazio ou inválido.
- [ ] Adicionar botão para **remarcar** ou **excluir entrega** (caso haja erro ou mudança).
- [ ] Exibir entregas agendadas no calendário, filtrando por cidade.

### 🔜 Logística
- [ ] Painel de aprovação de entregas pendentes.
- [ ] Cadastro manual de dias de **manejo por loja** e **dias de descarregamento**.
- [ ] Opção para a logística **reagendar** ou alterar rota da entrega.

### 🔜 Cliente
- [ ] Histórico da entrega: status atual, previsão e movimentações.
- [ ] Indicação visual quando a entrega estiver atrasada.

---

## ▶️ Como rodar o projeto

```bash
npm install
npm run dev
