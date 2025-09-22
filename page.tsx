'use client'

import { useState } from 'react'
import { Mail, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  const validateEmail = (email: string) => {
    // Validação rigorosa de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const validDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'icloud.com', 'live.com']
    
    if (!emailRegex.test(email)) return false
    
    const domain = email.split('@')[1]?.toLowerCase()
    return validDomains.includes(domain) || domain?.includes('.com') || domain?.includes('.com.br')
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    setIsValidEmail(validateEmail(value))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateEmail(email)) {
      localStorage.setItem('userEmail', email)
      window.location.href = '/dashboard'
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background Netflix-style */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black"></div>
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#E50914] mb-2">
            MEMBROS VIP
          </h1>
          <p className="text-white/80 text-lg">Acesso Exclusivo</p>
        </div>

        {/* Login Form */}
        <div className="bg-black/75 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
          <h2 className="text-white text-2xl font-semibold mb-6 text-center">
            Entre na sua conta
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={handleEmailChange}
                className={`pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 h-12 ${
                  !isValidEmail && email ? 'border-red-500' : 'border-gray-700'
                }`}
                required
              />
              {!isValidEmail && email && (
                <p className="text-red-500 text-sm mt-1">
                  Por favor, digite um email válido (ex: usuario@gmail.com)
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={!email || !isValidEmail}
              className="w-full bg-[#E50914] hover:bg-[#B8070F] text-white font-semibold h-12 text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Entrar
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Acesso exclusivo para membros VIP
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            © 2024 MEMBROS VIP. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  )
}
