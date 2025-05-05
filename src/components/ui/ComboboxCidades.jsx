import * as React from "react";
import { Check } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "../../lib/utils";

const cidadesDisponiveis = [
  "São José dos Campos", "São Sebastião", "Atibaia", "Tremembé", "Jacareí",
  "Taubaté", "Caçapava", "Mogi das Cruzes", "Guaratinguetá", "Pindamonhangaba",
  "Lorena", "Caraguatatuba", "Ubatuba", "Campos do Jordão"
];

export function ComboboxCidades({ value, onChange }) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const cidadesFiltradas = cidadesDisponiveis.filter((cidade) =>
    cidade.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <input
            type="text"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setInputValue(e.target.value);
              setOpen(true);
            }}
            placeholder="Digite a cidade..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </PopoverTrigger>
        {open && (
          <PopoverContent className="w-full p-0 bg-white text-black shadow-md">
            <Command>
              <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
              <CommandGroup>
                {cidadesFiltradas.map((cidade, index) => (
                  <CommandItem
                    key={index}
                    value={cidade}
                    onSelect={() => {
                      onChange(cidade);
                      setInputValue(cidade);
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === cidade ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {cidade}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
}
