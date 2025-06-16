import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Package, 
  Truck, 
  Euro,
  Clock,
  MapPin,
  AlertTriangle
} from 'lucide-react'

const stats = [
  {
    title: 'Véhicules Actifs',
    value: '12',
    change: '+2',
    trend: 'up',
    icon: Truck,
    color: 'bg-blue-500'
  },
  {
    title: 'Conducteurs',
    value: '24',
    change: '+1',
    trend: 'up',
    icon: Users,
    color: 'bg-green-500'
  },
  {
    title: 'Palettes en Stock',
    value: '1,247',
    change: '-23',
    trend: 'down',
    icon: Package,
    color: 'bg-orange-500'
  },
  {
    title: 'Revenus du Mois',
    value: '€47,230',
    change: '+12%',
    trend: 'up',
    icon: Euro,
    color: 'bg-purple-500'
  }
]

const recentDeliveries = [
  {
    id: 'LIV-001',
    client: 'Carrefour Lyon',
    driver: 'Marc Dubois',
    status: 'En cours',
    eta: '14:30',
    location: 'A6 - Sortie 29'
  },
  {
    id: 'LIV-002',
    client: 'Leclerc Marseille',
    driver: 'Sophie Martin',
    status: 'Livré',
    eta: 'Terminé',
    location: 'Marseille'
  },
  {
    id: 'LIV-003',
    client: 'Auchan Toulouse',
    driver: 'Pierre Leroy',
    status: 'En retard',
    eta: '16:45',
    location: 'A61 - Bouchon'
  }
]

const alerts = [
  {
    type: 'warning',
    message: 'Véhicule VH-12 nécessite une maintenance',
    time: 'Il y a 2h'
  },
  {
    type: 'error',
    message: 'Retard de livraison - Client Auchan',
    time: 'Il y a 30min'
  },
  {
    type: 'info',
    message: 'Nouveau conducteur ajouté au planning',
    time: 'Il y a 1h'
  }
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown
          
          return (
            <Card key={stat.title} className="transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendIcon className={`h-4 w-4 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                      <span className={`text-sm ml-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-slate-500 ml-1">vs mois dernier</span>
                    </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Deliveries */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Livraisons en Cours</CardTitle>
            <Button variant="outline" size="sm">
              Voir tout
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDeliveries.map((delivery) => (
                <div key={delivery.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-slate-900">{delivery.client}</h4>
                      <Badge 
                        variant={delivery.status === 'En cours' ? 'default' : delivery.status === 'Livré' ? 'secondary' : 'destructive'}
                      >
                        {delivery.status}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-slate-600 space-x-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {delivery.driver}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {delivery.eta}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {delivery.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
              Alertes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className={`h-2 w-2 rounded-full mt-2 ${
                    alert.type === 'warning' ? 'bg-orange-500' : 
                    alert.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{alert.message}</p>
                    <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Actions Rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <Users className="h-6 w-6" />
              <span>Nouveau Conducteur</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Package className="h-6 w-6" />
              <span>Ajouter Palette</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Building2 className="h-6 w-6" />
              <span>Nouveau Client</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Receipt className="h-6 w-6" />
              <span>Créer Facture</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}