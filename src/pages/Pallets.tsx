import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Textarea } from '../components/ui/textarea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { 
  Plus, 
  Search, 
  Package, 
  Truck, 
  Building2,
  Calendar,
  Filter,
  MoreVertical,
  Eye
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu'

const pallets = [
  {
    id: 'PAL-001',
    type: 'EUR',
    status: 'Disponible',
    location: 'Entrepôt A - Zone 1',
    client: '',
    lastMovement: '2024-01-10',
    condition: 'Excellent',
    notes: 'Palette neuve'
  },
  {
    id: 'PAL-002',
    type: 'EUR',
    status: 'En transit',
    location: 'Camion VH-12',
    client: 'Carrefour Lyon',
    lastMovement: '2024-01-12',
    condition: 'Bon',
    notes: 'Livraison prévue 14h30'
  },
  {
    id: 'PAL-003',
    type: 'EPAL',
    status: 'Chez client',
    location: 'Leclerc Marseille',
    client: 'Leclerc Marseille',
    lastMovement: '2024-01-11',
    condition: 'Bon',
    notes: 'Retour prévu dans 3 jours'
  },
  {
    id: 'PAL-004',
    type: 'EUR',
    status: 'Maintenance',
    location: 'Atelier réparation',
    client: '',
    lastMovement: '2024-01-09',
    condition: 'Endommagé',
    notes: 'Réparation en cours'
  },
  {
    id: 'PAL-005',
    type: 'CP',
    status: 'Disponible',
    location: 'Entrepôt B - Zone 3',
    client: '',
    lastMovement: '2024-01-08',
    condition: 'Bon',
    notes: 'Prête pour expédition'
  }
]

const stats = [
  { label: 'Total Palettes', value: '1,247', color: 'bg-blue-500' },
  { label: 'Disponibles', value: '856', color: 'bg-green-500' },
  { label: 'En Transit', value: '234', color: 'bg-orange-500' },
  { label: 'Chez Clients', value: '157', color: 'bg-purple-500' }
]

export default function Pallets() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  const filteredPallets = pallets.filter(pallet => {
    const matchesSearch = pallet.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pallet.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pallet.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || pallet.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesType = typeFilter === 'all' || pallet.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponible': return 'bg-green-100 text-green-800'
      case 'En transit': return 'bg-blue-100 text-blue-800'
      case 'Chez client': return 'bg-purple-100 text-purple-800'
      case 'Maintenance': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Excellent': return 'text-green-600'
      case 'Bon': return 'text-blue-600'
      case 'Moyen': return 'text-orange-600'
      case 'Endommagé': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestion des Palettes</h1>
          <p className="text-slate-600">Suivez votre inventaire et les mouvements de palettes</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Nouvelle Palette</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Ajouter une Palette</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="palletId">ID Palette</Label>
                <Input id="palletId" placeholder="PAL-006" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Type de palette" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="EPAL">EPAL</SelectItem>
                    <SelectItem value="CP">CP (Chimie/Plastique)</SelectItem>
                    <SelectItem value="US">US</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Emplacement</Label>
                <Input id="location" placeholder="Entrepôt A - Zone 1" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="condition">État</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="État de la palette" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Excellent">Excellent</SelectItem>
                    <SelectItem value="Bon">Bon</SelectItem>
                    <SelectItem value="Moyen">Moyen</SelectItem>
                    <SelectItem value="Endommagé">Endommagé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Notes additionnelles..." />
              </div>
              <Button className="w-full">Ajouter la Palette</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Package className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Rechercher par ID, client ou emplacement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-slate-600" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous statuts</SelectItem>
                  <SelectItem value="disponible">Disponible</SelectItem>
                  <SelectItem value="en transit">En transit</SelectItem>
                  <SelectItem value="chez client">Chez client</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous types</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="EPAL">EPAL</SelectItem>
                  <SelectItem value="CP">CP</SelectItem>
                  <SelectItem value="US">US</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pallets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventaire des Palettes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Emplacement</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Dernier Mouvement</TableHead>
                <TableHead>État</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPallets.map((pallet) => (
                <TableRow key={pallet.id}>
                  <TableCell className="font-medium">{pallet.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{pallet.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(pallet.status)}`}>
                      {pallet.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex items-center">
                    {pallet.location.includes('Camion') ? (
                      <Truck className="h-4 w-4 mr-2 text-blue-500" />
                    ) : pallet.location.includes('client') ? (
                      <Building2 className="h-4 w-4 mr-2 text-purple-500" />
                    ) : (
                      <Package className="h-4 w-4 mr-2 text-green-500" />
                    )}
                    {pallet.location}
                  </TableCell>
                  <TableCell>{pallet.client || '-'}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                      {pallet.lastMovement}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${getConditionColor(pallet.condition)}`}>
                      {pallet.condition}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
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
                          <Package className="h-4 w-4 mr-2" />
                          Modifier statut
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Truck className="h-4 w-4 mr-2" />
                          Déplacer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}