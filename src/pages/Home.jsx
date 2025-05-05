// src/pages/Home.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[url('/bg-madeira.jpg')] bg-cover flex flex-col items-center justify-center px-4 py-12 text-brown-900">
      <h1 className="text-4xl font-bold mb-12 text-center text-white drop-shadow">
        Arte Velha Móveis Rústicos
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {["Cliente", "Vendedor", "Logística"].map((papel) => (
          <Card key={papel} className="bg-white/90 backdrop-blur-md shadow-lg">
            <CardContent className="p-6 flex flex-col items-center">
              <CardTitle className="text-2xl mb-4">{papel}</CardTitle>
              <Button
                variant="default"
                className="bg-[#8b5e3c] hover:bg-[#704429] text-white w-full"
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
