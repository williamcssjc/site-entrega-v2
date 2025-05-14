import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // ShadCN
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Escolha seu perfil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button asChild className="w-full">
            <Link to="/cliente">Cliente</Link>
          </Button>
          <Button asChild className="w-full">
            <Link to="/vendedor">Vendedor</Link>
          </Button>
          <Button asChild className="w-full">
            <Link to="/logistica">Logística</Link>
          </Button>
          <Button asChild className="w-full">
            <Link to="/entregador">Entregador</Link> {/* ✅ Novo botão */}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
