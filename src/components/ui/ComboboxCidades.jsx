import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { Button } from "./button";
import { cn } from "../../lib/utils";

const cidadesDisponiveis = [
  "São José dos Campos",
  "São Sebastião",
  "Atibaia",
  "Tremembé",
  "Jacareí",
  "Taubaté",
  "Caçapava",
  "Mogi das Cruzes",
  "Guaratinguetá",
  "Pindamonhangaba",
  "Lorena",
  "Caraguatatuba",
  "Ubatuba",
  "Campos do Jordão"
];

export function ComboboxCidades({ value, onChange }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value || "Selecione uma cidade"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Digite a cidade..." />
          <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
          <CommandGroup>
            {cidadesDisponiveis.map((cidade, index) => (
              <CommandItem
                key={index}
                onSelect={() => {
                  onChange(cidade);
                  setOpen(false);
                }}
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
    </Popover>
  );
}
