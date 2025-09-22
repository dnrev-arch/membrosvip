'use client'

import { useState, useEffect } from 'react'
import { Play, Info, Download, Menu, Search, Bell, User, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface Content {
  id: string
  title: string
  description: string
  thumbnail: string
  category: string
  type: 'image' | 'gif'
}

const mockContent: Content[] = [
  {
    id: '1',
    title: 'Conteúdo Premium 1',
    description: 'Descrição detalhada do conteúdo premium exclusivo para membros VIP.',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=600&fit=crop',
    category: 'MEUS PRODUTOS',
    type: 'image'
  },
  {
    id: '2',
    title: 'Mais Vendido 1',
    description: 'O conteúdo mais popular entre nossos membros VIP.',
    thumbnail: 'https://images.unsplash.com/photo-1494790108755-2616c9c0b8d4?w=400&h=600&fit=crop',
    category: 'MAIS VENDIDOS',
    type: 'image'
  },
  {
    id: '3',
    title: 'Criadora Destaque',
    description: 'Conteúdo exclusivo da nossa criadora mais popular.',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop',
    category: 'CRIADORAS DE CONTEÚDO',
    type: 'image'
  },
  {
    id: '4',
    title: 'Chamada Especial',
    description: 'Experiência única de chamada de vídeo personalizada.',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop',
    category: 'CHAMADA DE VÍDEO',
    type: 'image'
  },
  {
    id: '5',
    title: 'Conteúdo Masculino',
    description: 'Conteúdo especialmente selecionado para o público masculino.',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    category: 'PARA HOMENS',
    type: 'image'
  },
  {
    id: '6',
    title: 'História Exclusiva',
    description: 'Histórias íntimas e exclusivas dos nossos criadores.',
    thumbnail: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop',
    category: 'HISTÓRIAS',
    type: 'image'
  }
]

const categories = ['MEUS PRODUTOS', 'MAIS VENDIDOS', 'CRIADORAS DE CONTEÚDO', 'CHAMADA DE VÍDEO', 'PARA HOMENS', 'HISTÓRIAS']

export default function Dashboard() {
  const [selectedContent, setSelectedContent] = useState<Content | null>(null)
  const [showPWAPrompt, setShowPWAPrompt] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const email = localStorage.getItem('userEmail')
    if (!email) {
      window.location.href = '/'
      return
    }
    setUserEmail(email)

    // Show PWA prompt after 3 seconds
    const timer = setTimeout(() => {
      setShowPWAPrompt(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleInstallPWA = () => {
    // PWA installation logic would go here
    setShowPWAPrompt(false)
    alert('App será instalado na sua área de trabalho!')
  }

  const ContentCard = ({ content }: { content: Content }) => (
    <div 
      className="relative group cursor-pointer transition-all duration-300 hover:scale-105"
      onClick={() => setSelectedContent(content)}
    >
      <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
        <img
          src={content.thumbnail}
          alt={content.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-semibold text-sm mb-1">{content.title}</h3>
            <div className="flex space-x-2">
              <Button size="sm" className="bg-white text-black hover:bg-gray-200 h-8 px-3">
                <Play className="w-3 h-3 mr-1" />
                Play
              </Button>
              <Button size="sm" variant="outline" className="border-gray-400 text-white hover:bg-white/20 h-8 px-3">
                <Info className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const CategoryRow = ({ category }: { category: string }) => {
    const categoryContent = mockContent.filter(item => item.category === category)
    
    return (
      <div className="mb-8">
        <h2 className="text-white text-xl font-semibold mb-4 px-4 md:px-12">{category}</h2>
        <div className="relative group">
          <div className="flex space-x-4 px-4 md:px-12 overflow-x-auto scrollbar-hide pb-4">
            {categoryContent.map((content) => (
              <div key={content.id} className="flex-shrink-0 w-48">
                <ContentCard content={content} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black to-transparent">
        <div className="flex items-center justify-between px-4 md:px-12 py-4">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl md:text-3xl font-bold text-[#E50914]">MEMBROS VIP</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-white hover:text-gray-300 transition-colors">Início</a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">Meus Produtos</a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">Favoritos</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Search className="w-6 h-6 text-white cursor-pointer hover:text-gray-300" />
            <Bell className="w-6 h-6 text-white cursor-pointer hover:text-gray-300" />
            <div className="flex items-center space-x-2">
              <User className="w-6 h-6 text-white" />
              <span className="text-sm text-white hidden md:block">{userEmail}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1920&h=1080&fit=crop')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 px-4 md:px-12 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Conteúdo Exclusivo
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            Acesse conteúdos premium e exclusivos criados especialmente para nossos membros VIP. 
            Experiências únicas e personalizadas.
          </p>
          <div className="flex space-x-4">
            <Button className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg font-semibold">
              <Play className="w-5 h-5 mr-2" />
              Assistir Agora
            </Button>
            <Button variant="outline" className="border-gray-400 text-white hover:bg-white/20 px-8 py-3 text-lg">
              <Info className="w-5 h-5 mr-2" />
              Mais Informações
            </Button>
          </div>
        </div>
      </div>

      {/* Content Categories */}
      <div className="relative z-10 -mt-32">
        {categories.map((category) => (
          <CategoryRow key={category} category={category} />
        ))}
      </div>

      {/* Content Modal */}
      <Dialog open={!!selectedContent} onOpenChange={() => setSelectedContent(null)}>
        <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl">{selectedContent?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src={selectedContent?.thumbnail}
                alt={selectedContent?.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-300 leading-relaxed">{selectedContent?.description}</p>
            <div className="flex space-x-4">
              <Button className="bg-[#E50914] hover:bg-[#B8070F] text-white">
                <Play className="w-4 h-4 mr-2" />
                Reproduzir
              </Button>
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                Adicionar à Lista
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* PWA Install Prompt */}
      <Dialog open={showPWAPrompt} onOpenChange={setShowPWAPrompt}>
        <DialogContent className="bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white text-xl flex items-center">
              <Download className="w-6 h-6 mr-2 text-[#E50914]" />
              Instalar App MEMBROS VIP
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-300">
              Instale nosso app na sua área de trabalho para uma experiência ainda melhor! 
              Acesso rápido e notificações exclusivas.
            </p>
            <div className="flex space-x-4">
              <Button onClick={handleInstallPWA} className="bg-[#E50914] hover:bg-[#B8070F] text-white">
                <Download className="w-4 h-4 mr-2" />
                Instalar Agora
              </Button>
              <Button variant="outline" onClick={() => setShowPWAPrompt(false)} className="border-gray-600 text-white hover:bg-gray-800">
                Agora Não
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
