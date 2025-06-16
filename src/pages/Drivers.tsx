import { useState } from 'react'
import { Card, CardContent, CardHeader } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Calendar,
  Filter
} from 'lucide-react'

const drivers = [
  {
    id: 1,
    name: 'Marc Dubois',
    phone: '+33 6 12 34 56 78',
    email: 'marc.dubois@email.com',
    license: 'CE',
    status: 'Actif',
    currentLocation: 'Lyon - A6',
    hoursWorked: '7h30',
    nextDelivery: 'Carrefour Lyon - 14:30',
    avatar: 'MD'
  },
  {
    id: 2,
    name: 'Sophie Martin',
    phone: '+33 6 87 65 43 21',
    email: 'sophie.martin@email.com',
    license: 'C',
    status: 'Repos',
    currentLocation: 'Marseille',
    hoursWorked: '0h00',
    nextDelivery: 'Disponible demain',
    avatar: 'SM'
  },
  {
    id: 3,
    name: 'Pierre Leroy',
    phone: '+33 6 56 78 90 12',
    email: 'pierre.leroy@email.com',
    license: 'CE',
    status: 'En cours',
    currentLocation: 'Toulouse - A61',
    hoursWorked: '5h15',
    nextDelivery: 'Auchan Toulouse - 16:45',
    avatar: 'PL'
  },
  {
    id: 4,
    name: 'Julie Moreau',
    phone: '+33 6 23 45 67 89',
    email: 'julie.moreau@email.com',
    license: 'C',
    status: 'Congés',
    currentLocation: 'Indisponible',
    hoursWorked: '0h00',
    nextDelivery: 'Retour le 15/01',
    avatar: 'JM'
  }
]

export default function Drivers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || driver.status.toLowerCase() === statusFilter.toLowerCase()
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actif': return 'bg-green-100 text-green-800'
      case 'En cours': return 'bg-blue-100 text-blue-800'
      case 'Repos': return 'bg-gray-100 text-gray-800'
      case 'Congés': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestion des Conducteurs</h1>
          <p className="text-slate-600">Planifiez et suivez vos équipes de conduite</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Nouveau Conducteur</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Ajouter un Conducteur</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" placeholder="Jean Dupont" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="jean.dupont@email.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" placeholder="+33 6 12 34 56 78" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="license">Permis</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Type de permis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="C">Permis C</SelectItem>
                    <SelectItem value="CE">Permis CE</SelectItem>
                    <SelectItem value="C1">Permis C1</SelectItem>
                    <SelectItem value="C1E">Permis C1E</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Ajouter le Conducteur</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Rechercher par nom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-slate-600" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="actif">Actif</SelectItem>
                  <SelectItem value="en cours">En cours</SelectItem>
                  <SelectItem value="repos">Repos</SelectItem>
                  <SelectItem value="congés">Congés</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrivers.map((driver) => (
          <Card key={driver.id} className="transition-all hover:shadow-md">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{driver.avatar}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{driver.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        Permis {driver.license}
                      </Badge>
                      <Badge className={`text-xs ${getStatusColor(driver.status)}`}>
                        {driver.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-slate-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {driver.phone}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {driver.email}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {driver.currentLocation}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {driver.hoursWorked} travaillées
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {driver.nextDelivery}
                </div>
              </div>
              
              <div className="flex space-x-2 pt-4 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  Modifier
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Planning
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDrivers.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-slate-500">Aucun conducteur trouvé avec ces critères.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}