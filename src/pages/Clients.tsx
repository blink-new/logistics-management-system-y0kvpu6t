import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { 
  Plus, 
  Search, 
  Building2, 
  Phone, 
  Mail, 
  MapPin,
  Euro,
  Package,
  Calendar,
  MoreVertical,
  Eye,
  Edit
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu'

const clients = [
  {
    id: 'CLI-001',
    name: 'Carrefour Lyon',
    contact: 'Marie Dubois',
    email: 'marie.dubois@carrefour.fr',
    phone: '+33 4 78 12 34 56',
    address: '123 Avenue de Lyon, 69000 Lyon',
    status: 'Actif',
    totalOrders: 45,
    totalRevenue: 23450,
    lastOrder: '2024-01-12',
    paymentTerms: '30 jours',
    notes: 'Client premium, livraisons prioritaires'
  },
  {
    id: 'CLI-002',
    name: 'Leclerc Marseille',
    contact: 'Jean Martin',
    email: 'j.martin@leclerc.fr',
    phone: '+33 4 91 23 45 67',
    address: '456 Boulevard de Marseille, 13000 Marseille',
    status: 'Actif',
    totalOrders: 32,
    totalRevenue: 18750,
    lastOrder: '2024-01-11',
    paymentTerms: '45 jours',
    notes: 'Commandes régulières le mardi'
  },
  {
    id: 'CLI-003',
    name: 'Auchan Toulouse',
    contact: 'Sophie Leroy',
    email: 'sophie.leroy@auchan.fr',
    phone: '+33 5 61 34 56 78',
    address: '789 Route de Toulouse, 31000 Toulouse',
    status: 'En attente',
    totalOrders: 12,
    totalRevenue: 8920,
    lastOrder: '2024-01-08',
    paymentTerms: '30 jours',
    notes: 'Nouveau client, période d\'essai'
  },
  {
    id: 'CLI-004',
    name: 'Casino Nice',
    contact: 'Pierre Moreau',
    email: 'p.moreau@casino.fr',
    phone: '+33 4 93 45 67 89',
    address: '321 Promenade des Anglais, 06000 Nice',
    status: 'Inactif',
    totalOrders: 8,
    totalRevenue: 4200,
    lastOrder: '2023-12-15',
    paymentTerms: '60 jours',
    notes: 'Contrat suspendu temporairement'
  }
]

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter] = useState('all')

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || client.status.toLowerCase() === statusFilter.toLowerCase()
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actif': return 'bg-green-100 text-green-800'
      case 'En attente': return 'bg-orange-100 text-orange-800'
      case 'Inactif': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const totalRevenue = clients.reduce((sum, client) => sum + client.totalRevenue, 0)
  const activeClients = clients.filter(client => client.status === 'Actif').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestion des Clients</h1>
          <p className="text-slate-600">Gérez votre portefeuille client et les relations commerciales</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Nouveau Client</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Ajouter un Client</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="clientName">Nom de l&apos;entreprise</Label>
                <Input id="clientName" placeholder="Nom de l'entreprise" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact">Personne de contact</Label>
                <Input id="contact" placeholder="Nom du contact principal" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="contact@entreprise.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" placeholder="+33 1 23 45 67 89" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Adresse</Label>
                <Textarea id="address" placeholder="Adresse complète de livraison" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="paymentTerms">Conditions de paiement</Label>
                <Input id="paymentTerms" placeholder="30 jours" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Notes et informations spécifiques..." />
              </div>
              <Button className="w-full">Ajouter le Client</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Clients</p>
                <p className="text-2xl font-bold text-slate-900">{clients.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500">
                <Building2 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Clients Actifs</p>
                <p className="text-2xl font-bold text-slate-900">{activeClients}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500">
                <Building2 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Chiffre d&apos;Affaires</p>
                <p className="text-2xl font-bold text-slate-900">€{totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500">
                <Euro className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Commandes Totales</p>
                <p className="text-2xl font-bold text-slate-900">
                  {clients.reduce((sum, client) => sum + client.totalOrders, 0)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-orange-500">
                <Package className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Rechercher par nom, contact ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="transition-all hover:shadow-md">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{client.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={`text-xs ${getStatusColor(client.status)}`}>
                        {client.status}
                      </Badge>
                      <span className="text-xs text-slate-500">ID: {client.id}</span>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      Voir détails
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Package className="h-4 w-4 mr-2" />
                      Nouvelle commande
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-slate-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {client.contact} - {client.email}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {client.phone}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {client.address}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-lg font-semibold text-slate-900">{client.totalOrders}</p>
                  <p className="text-xs text-slate-500">Commandes</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-slate-900">€{client.totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-slate-500">CA Total</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <Calendar className="h-4 w-4 mr-1 text-slate-400" />
                    <p className="text-xs text-slate-500">{client.lastOrder}</p>
                  </div>
                  <p className="text-xs text-slate-500">Dernière cmd</p>
                </div>
              </div>
              
              {client.notes && (
                <div className="pt-2 border-t">
                  <p className="text-sm text-slate-600 italic">{client.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-slate-500">Aucun client trouvé avec ces critères.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}