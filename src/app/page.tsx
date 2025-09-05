'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTenant } from '@/lib/tenant-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const { church, subdomain, isLoading, error } = useTenant();
  const router = useRouter();

  useEffect(() => {
    // If we have a valid church, redirect to dashboard
    if (church && !isLoading) {
      router.push('/dashboard');
    }
  }, [church, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-96">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Carregando...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-red-600">Erro</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.reload()} variant="outline" className="w-full">
              Tentar Novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If no subdomain, show welcome page
  if (!subdomain) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              ChurchSaaS
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Sistema completo de gestão para igrejas com recursos de membros, células, 
              equipes de louvor e comunicação em tempo real.
            </p>
            <div className="flex justify-center space-x-4">
              <Button onClick={() => router.push('/auth/signin')} size="lg">
                Entrar
              </Button>
              <Button onClick={() => router.push('/register-church')} variant="outline" size="lg">
                Cadastrar Igreja
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-md"></div>
                </div>
                <CardTitle>Gestão de Membros</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Cadastro completo de membros, histórico de participação e relatórios detalhados.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-green-500 rounded-md"></div>
                </div>
                <CardTitle>Células & Grupos</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Organize células com mapa interativo, agende reuniões e acompanhe o crescimento.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-purple-500 rounded-md"></div>
                </div>
                <CardTitle>Louvor & Música</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Gerencie equipes de louvor, repertórios e escalas com sugestões inteligentes.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-orange-500 rounded-md"></div>
                </div>
                <CardTitle>Comunicação</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Chat em tempo real, notificações push e integração com WhatsApp.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-red-500 rounded-md"></div>
                </div>
                <CardTitle>Financeiro</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Cobrança automática por membro ativo com Pix, cartões e boletos.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-teal-500 rounded-md"></div>
                </div>
                <CardTitle>Conformidade LGPD</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Totalmente adequado à Lei Geral de Proteção de Dados com controles de privacidade.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-600 mb-4">
              A partir de <span className="font-bold text-2xl text-blue-600">R$ 1,00</span> por membro ativo
            </p>
            <Button onClick={() => router.push('/pricing')} variant="outline">
              Ver Planos e Preços
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // If subdomain but no church found, show error
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-red-600">Igreja não encontrada</CardTitle>
          <CardDescription>
            Não foi possível encontrar uma igreja com o endereço &quot;{subdomain}&quot;.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => router.push('/')} variant="outline" className="w-full">
            Voltar ao Início
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}