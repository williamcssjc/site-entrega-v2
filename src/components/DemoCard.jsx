
import React from "react"

export function DemoCard() {
  return (
    <div className="bg-madeira-claro text-madeira-escuro p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Entrega Agendada</h2>
      <p className="mb-2">Cidade: São José dos Campos</p>
      <p className="mb-2">Cliente: João da Silva</p>
      <button className="bg-destaque hover:bg-madeira-medio text-white px-4 py-2 mt-4 rounded-md">
        Ver Detalhes
      </button>
    </div>
  )
}
