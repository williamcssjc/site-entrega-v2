import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <img
        alt="Arte Velha Logo"
        className="w-48 h-auto mb-8 drop-shadow"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {["Cliente", "Vendedor", "Logística"].map((papel) => (
          <Card key={papel} className="bg-white/90 backdrop-blur-md shadow-lg">
            <CardContent className="p-6 flex flex-col items-center">
              <h2 className="text-2xl mb-4 font-semibold">{papel}</h2>
              <Button
                className="bg-yellow-800 hover:bg-yellow-700 text-white w-full"
                onClick={() => navigate(`/${papel.toLowerCase()}`)}
              >
                Acessar {papel}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
