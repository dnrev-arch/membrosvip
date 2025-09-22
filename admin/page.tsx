'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Save, X, Upload, Image as ImageIcon, Film } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Content {
  id: string
  title: string
  description: string
  thumbnail: string
  category: string
  type: 'image' | 'gif'
}

const initialCategories = ['MEUS PRODUTOS', 'MAIS VENDIDOS', 'CRIADORAS DE CONTEÚDO', 'CHAMADA DE VÍDEO', 'PARA HOMENS', 'HISTÓRIAS']

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
  }
]

export default function AdminPanel() {
  const [content, setContent] = useState<Content[]>(mockContent)
  const [categories, setCategories] = useState<string[]>(initialCategories)
  const [isAddingContent, setIsAddingContent] = useState(false)
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [editingContent, setEditingContent] = useState<Content | null>(null)
  const [newCategory, setNewCategory] = useState('')
  const [newContent, setNewContent] = useState<Partial<Content>>({
    title: '',
    description: '',
    thumbnail: '',
    category: '',
    type: 'image'
  })

  const handleAddContent = () => {
    if (newContent.title && newContent.description && newContent.thumbnail && newContent.category) {
      const content_item: Content = {
        id: Date.now().toString(),
        title: newContent.title,
        description: newContent.description,
        thumbnail: newContent.thumbnail,
        category: newContent.category,
        type: newContent.type || 'image'
      }
      setContent(prev => [...prev, content_item])
      setNewContent({ title: '', description: '', thumbnail: '', category: '', type: 'image' })
      setIsAddingContent(false)
    }
  }

  const handleEditContent = (content_item: Content) => {
    setEditingContent(content_item)
  }

  const handleUpdateContent = () => {
    if (editingContent) {
      setContent(prev => prev.map(item => 
        item.id === editingContent.id ? editingContent : item
      ))
      setEditingContent(null)
    }
  }

  const handleDeleteContent = (id: string) => {
    setContent(prev => prev.filter(item => item.id !== id))
  }

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories(prev => [...prev, newCategory])
      setNewCategory('')
      setIsAddingCategory(false)
    }
  }

  const handleDeleteCategory = (category: string) => {
    setCategories(prev => prev.filter(cat => cat !== category))
    setContent(prev => prev.filter(item => item.category !== category))
  }

  const ContentCard = ({ item }: { item: Content }) => (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-4">
        <div className="aspect-[2/3] rounded-lg overflow-hidden mb-3 bg-gray-700">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-white font-semibold text-sm mb-1 truncate">{item.title}</h3>
        <p className="text-gray-400 text-xs mb-2 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-[#E50914] text-xs font-medium">{item.category}</span>
          <div className="flex space-x-1">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleEditContent(item)}
              className="h-7 w-7 p-0 border-gray-600 hover:bg-gray-700"
            >
              <Edit className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDeleteContent(item.id)}
              className="h-7 w-7 p-0 border-red-600 text-red-400 hover:bg-red-900/20"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#E50914]">MEMBROS VIP</h1>
              <p className="text-gray-400">Painel Administrativo</p>
            </div>
            <div className="flex space-x-4">
              <Button
                onClick={() => setIsAddingCategory(true)}
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-800"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nova Categoria
              </Button>
              <Button
                onClick={() => setIsAddingContent(true)}
                className="bg-[#E50914] hover:bg-[#B8070F] text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Conteúdo
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Categories Management */}
      <div className="px-6 py-6">
        <h2 className="text-xl font-semibold mb-4">Gerenciar Categorias</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {categories.map((category) => (
            <div key={category} className="bg-gray-800 rounded-lg p-3 border border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white truncate">{category}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteCategory(category)}
                  className="h-6 w-6 p-0 border-red-600 text-red-400 hover:bg-red-900/20 ml-2"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Content by Category */}
        {categories.map((category) => {
          const categoryContent = content.filter(item => item.category === category)
          if (categoryContent.length === 0) return null

          return (
            <div key={category} className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-[#E50914]">{category}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {categoryContent.map((item) => (
                  <ContentCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Add Content Modal */}
      <Dialog open={isAddingContent} onOpenChange={setIsAddingContent}>
        <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Adicionar Novo Conteúdo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Título</label>
              <Input
                value={newContent.title || ''}
                onChange={(e) => setNewContent(prev => ({ ...prev, title: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Digite o título do conteúdo"
              />
            </div>
            
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Descrição</label>
              <Textarea
                value={newContent.description || ''}
                onChange={(e) => setNewContent(prev => ({ ...prev, description: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Digite a descrição do conteúdo"
                rows={3}
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">URL da Thumbnail</label>
              <Input
                value={newContent.thumbnail || ''}
                onChange={(e) => setNewContent(prev => ({ ...prev, thumbnail: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Categoria</label>
                <Select value={newContent.category || ''} onValueChange={(value) => setNewContent(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="text-white">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">Tipo</label>
                <Select value={newContent.type || 'image'} onValueChange={(value: 'image' | 'gif') => setNewContent(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="image" className="text-white">
                      <div className="flex items-center">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Imagem
                      </div>
                    </SelectItem>
                    <SelectItem value="gif" className="text-white">
                      <div className="flex items-center">
                        <Film className="w-4 h-4 mr-2" />
                        GIF
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <Button onClick={handleAddContent} className="bg-[#E50914] hover:bg-[#B8070F] text-white">
                <Save className="w-4 h-4 mr-2" />
                Salvar Conteúdo
              </Button>
              <Button variant="outline" onClick={() => setIsAddingContent(false)} className="border-gray-600 text-white hover:bg-gray-800">
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Category Modal */}
      <Dialog open={isAddingCategory} onOpenChange={setIsAddingCategory}>
        <DialogContent className="bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Adicionar Nova Categoria</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Nome da Categoria</label>
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Digite o nome da categoria"
              />
            </div>
            <div className="flex space-x-4">
              <Button onClick={handleAddCategory} className="bg-[#E50914] hover:bg-[#B8070F] text-white">
                <Save className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
              <Button variant="outline" onClick={() => setIsAddingCategory(false)} className="border-gray-600 text-white hover:bg-gray-800">
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Content Modal */}
      <Dialog open={!!editingContent} onOpenChange={() => setEditingContent(null)}>
        <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Editar Conteúdo</DialogTitle>
          </DialogHeader>
          {editingContent && (
            <div className="space-y-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Título</label>
                <Input
                  value={editingContent.title}
                  onChange={(e) => setEditingContent(prev => prev ? { ...prev, title: e.target.value } : null)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Descrição</label>
                <Textarea
                  value={editingContent.description}
                  onChange={(e) => setEditingContent(prev => prev ? { ...prev, description: e.target.value } : null)}
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">URL da Thumbnail</label>
                <Input
                  value={editingContent.thumbnail}
                  onChange={(e) => setEditingContent(prev => prev ? { ...prev, thumbnail: e.target.value } : null)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Categoria</label>
                  <Select value={editingContent.category} onValueChange={(value) => setEditingContent(prev => prev ? { ...prev, category: value } : null)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className="text-white">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Tipo</label>
                  <Select value={editingContent.type} onValueChange={(value: 'image' | 'gif') => setEditingContent(prev => prev ? { ...prev, type: value } : null)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="image" className="text-white">
                        <div className="flex items-center">
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Imagem
                        </div>
                      </SelectItem>
                      <SelectItem value="gif" className="text-white">
                        <div className="flex items-center">
                          <Film className="w-4 h-4 mr-2" />
                          GIF
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button onClick={handleUpdateContent} className="bg-[#E50914] hover:bg-[#B8070F] text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Alterações
                </Button>
                <Button variant="outline" onClick={() => setEditingContent(null)} className="border-gray-600 text-white hover:bg-gray-800">
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
