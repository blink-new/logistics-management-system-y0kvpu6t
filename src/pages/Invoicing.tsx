import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { 
  Plus, 
  Search, 
  Receipt, 
  Euro, 
  Calendar,
  Download,
  Send,
  Eye,
  MoreVertical,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu'

const invoices = [
  {
    id: 'FACT-001',
    client: 'Carrefour Lyon',
    amount: 2450.00,
    date: '2024-01-12',
    dueDate: '2024-02-11',
    status: 'Payée',
    items: [
      { description: 'Transport 25 palettes EUR', quantity: 25, rate: 85.00 },
      { description: 'Service livraison express', quantity: 1, rate: 320.00 }
    ]
  },
  {
    id: 'FACT-002',
    client: 'Leclerc Marseille',
    amount: 1890.00,
    date: '2024-01-10',
    dueDate: '2024-02-24',
    status: 'En attente',
    items: [
      { description: 'Transport 18 palettes EPAL', quantity: 18, rate: 90.00 },
      { description: 'Manutention supplémentaire', quantity: 2, rate: 75.00 }
    ]
  },
  {
    id: 'FACT-003',
    client: 'Auchan Toulouse',
    amount: 3200.00,
    date: '2024-01-08',
    dueDate: '2024-01-28',
    status: 'En retard',
    items: [
      { description: 'Transport 40 palettes EUR', quantity: 40, rate: 80.00 }
    ]
  },
  {
    id: 'FACT-004',
    client: 'Casino Nice',
    amount: 1560.00,
    date: '2024-01-05',
    dueDate: '2024-02-04',
    status: 'Brouillon',
    items: [
      { description: 'Transport 12 palettes CP', quantity: 12, rate: 95.00 },
      { description: 'Transport retour', quantity: 1, rate: 420.00 }
    ]
  }
]

const stats = [
  {
    title: 'CA du Mois',
    value: '€9,100',
    change: '+15%',
    icon: Euro,
    color: 'bg-green-500'
  },
  {
    title: 'Factures en Attente',
    value: '€5,650',
    change: '3 factures',
    icon: Clock,
    color: 'bg-orange-500'
  },
  {
    title: 'Factures en Retard',
    value: '€3,200',
    change: '1 facture',
    icon: AlertCircle,
    color: 'bg-red-500'
  },
  {
    title: 'Factures Payées',
    value: '€2,450',
    change: '1 facture',
    icon: CheckCircle,
    color: 'bg-blue-500'
  }
]

export default function Invoicing() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || invoice.status.toLowerCase() === statusFilter.toLowerCase()
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Payée': return 'bg-green-100 text-green-800'
      case 'En attente': return 'bg-blue-100 text-blue-800'
      case 'En retard': return 'bg-red-100 text-red-800'
      case 'Brouillon': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Payée': return CheckCircle
      case 'En attente': return Clock
      case 'En retard': return AlertCircle
      case 'Brouillon': return Receipt
      default: return Receipt
    }
  }

  const isOverdue = (dueDate: string, status: string) => {
    const due = new Date(dueDate)
    const today = new Date()
    return status !== 'Payée' && due < today
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Facturation</h1>
          <p className="text-slate-600">Gérez vos factures et suivez vos paiements</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Nouvelle Facture</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Créer une Facture</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="client">Client</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="carrefour">Carrefour Lyon</SelectItem>
                    <SelectItem value="leclerc">Leclerc Marseille</SelectItem>
                    <SelectItem value="auchan">Auchan Toulouse</SelectItem>
                    <SelectItem value="casino">Casino Nice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date de facturation</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Date d&apos;échéance</Label>
                  <Input id="dueDate" type="date" />
                </div>
              </div>
              
              <div className="space-y-4">
                <Label>Articles</Label>
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-12 gap-2 text-sm font-medium">
                    <div className="col-span-6">Description</div>
                    <div className="col-span-2">Quantité</div>
                    <div className="col-span-2">Tarif</div>
                    <div className="col-span-2">Total</div>
                  </div>
                  <div className="grid grid-cols-12 gap-2">
                    <Input className="col-span-6" placeholder="Description du service" />
                    <Input className="col-span-2" type="number" placeholder="1" />
                    <Input className="col-span-2" type="number" placeholder="0.00" />
                    <div className="col-span-2 flex items-center text-sm font-medium">€0.00</div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une ligne
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-lg font-semibold">Total: €0.00</div>
                <div className="space-x-2">
                  <Button variant="outline">Sauvegarder en brouillon</Button>
                  <Button>Créer la facture</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-sm text-slate-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Rechercher par numéro de facture ou client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="brouillon">Brouillon</SelectItem>
                <SelectItem value="en attente">En attente</SelectItem>
                <SelectItem value="payée">Payée</SelectItem>
                <SelectItem value="en retard">En retard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Factures</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Numéro</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Échéance</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => {
                const StatusIcon = getStatusIcon(invoice.status)
                const overdue = isOverdue(invoice.dueDate, invoice.status)
                
                return (
                  <TableRow key={invoice.id} className={overdue ? 'bg-red-50' : ''}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.client}</TableCell>
                    <TableCell className="font-semibold">€{invoice.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                        {invoice.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                        <span className={overdue ? 'text-red-600 font-medium' : ''}>
                          {invoice.dueDate}
                        </span>
                        {overdue && <AlertCircle className="h-4 w-4 ml-2 text-red-500" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <StatusIcon className="h-4 w-4 mr-2" />
                        <Badge className={`${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </Badge>
                      </div>
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
                            Voir
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Send className="h-4 w-4 mr-2" />
                            Envoyer par email
                          </DropdownMenuItem>
                          {invoice.status === 'En attente' && (
                            <DropdownMenuItem>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Marquer comme payée
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}