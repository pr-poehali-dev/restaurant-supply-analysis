import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Index = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const metrics = [
    { 
      title: 'Общие закупки',
      value: '₽2,847,300',
      change: '+12.5%',
      trend: 'up',
      icon: 'TrendingUp'
    },
    { 
      title: 'Средний чек',
      value: '₽94,910',
      change: '+8.2%',
      trend: 'up',
      icon: 'DollarSign'
    },
    { 
      title: 'Поставщиков',
      value: '24',
      change: '+3',
      trend: 'up',
      icon: 'Users'
    },
    { 
      title: 'Товарных позиций',
      value: '487',
      change: '-12',
      trend: 'down',
      icon: 'Package'
    }
  ];

  const aiPredictions = [
    {
      product: 'Говядина мраморная',
      currentStock: 45,
      predictedDemand: 78,
      recommendation: 'Заказать +33 кг',
      urgency: 'high',
      confidence: 94
    },
    {
      product: 'Лосось филе',
      currentStock: 28,
      predictedDemand: 35,
      recommendation: 'Заказать +7 кг',
      urgency: 'medium',
      confidence: 89
    },
    {
      product: 'Масло оливковое',
      currentStock: 15,
      predictedDemand: 12,
      recommendation: 'Запас оптимален',
      urgency: 'low',
      confidence: 92
    },
    {
      product: 'Креветки тигровые',
      currentStock: 8,
      predictedDemand: 22,
      recommendation: 'Заказать +14 кг',
      urgency: 'high',
      confidence: 87
    }
  ];

  const suppliers = [
    { name: 'МясоПрайм', category: 'Мясо', orders: 45, rating: 4.8, avgDelivery: '2 дня' },
    { name: 'ОкеанФреш', category: 'Рыба', orders: 38, rating: 4.9, avgDelivery: '1 день' },
    { name: 'ФермаПродукт', category: 'Овощи', orders: 52, rating: 4.7, avgDelivery: '1 день' },
    { name: 'ИталКомпани', category: 'Деликатесы', orders: 24, rating: 4.6, avgDelivery: '3 дня' }
  ];

  const topCategories = [
    { name: 'Мясо и птица', spent: 847200, percent: 30, color: 'bg-primary' },
    { name: 'Рыба и морепродукты', spent: 625490, percent: 22, color: 'bg-secondary' },
    { name: 'Овощи и фрукты', spent: 512830, percent: 18, color: 'bg-accent' },
    { name: 'Молочные продукты', spent: 398450, percent: 14, color: 'bg-primary/70' },
    { name: 'Прочее', spent: 463330, percent: 16, color: 'bg-muted' }
  ];

  const purchaseTrends = [
    { date: '1 Нояб', meat: 95000, fish: 68000, vegetables: 52000, dairy: 38000 },
    { date: '2 Нояб', meat: 102000, fish: 71000, vegetables: 48000, dairy: 42000 },
    { date: '3 Нояб', meat: 88000, fish: 65000, vegetables: 55000, dairy: 40000 },
    { date: '4 Нояб', meat: 115000, fish: 78000, vegetables: 61000, dairy: 45000 },
    { date: '5 Нояб', meat: 108000, fish: 74000, vegetables: 58000, dairy: 43000 },
    { date: '6 Нояб', meat: 125000, fish: 82000, vegetables: 64000, dairy: 48000 },
    { date: '7 Нояб', meat: 118000, fish: 79000, vegetables: 60000, dairy: 46000 }
  ];

  const supplierComparison = [
    { name: 'МясоПрайм', quality: 92, price: 78, delivery: 88 },
    { name: 'ОкеанФреш', quality: 95, price: 82, delivery: 94 },
    { name: 'ФермаПродукт', quality: 88, price: 85, delivery: 90 },
    { name: 'ИталКомпани', quality: 90, price: 70, delivery: 75 }
  ];

  const expirationItems = [
    { 
      product: 'Молоко 3.2%', 
      quantity: '24 л', 
      expiryDate: '15 ноя', 
      daysLeft: 1, 
      status: 'critical',
      supplier: 'ФермаПродукт'
    },
    { 
      product: 'Сливки 33%', 
      quantity: '12 л', 
      expiryDate: '16 ноя', 
      daysLeft: 2, 
      status: 'warning',
      supplier: 'ФермаПродукт'
    },
    { 
      product: 'Говядина охл.', 
      quantity: '18 кг', 
      expiryDate: '18 ноя', 
      daysLeft: 4, 
      status: 'warning',
      supplier: 'МясоПрайм'
    },
    { 
      product: 'Лосось свежий', 
      quantity: '8 кг', 
      expiryDate: '17 ноя', 
      daysLeft: 3, 
      status: 'warning',
      supplier: 'ОкеанФреш'
    },
    { 
      product: 'Салат айсберг', 
      quantity: '15 шт', 
      expiryDate: '16 ноя', 
      daysLeft: 2, 
      status: 'warning',
      supplier: 'ФермаПродукт'
    },
    { 
      product: 'Сыр пармезан', 
      quantity: '5 кг', 
      expiryDate: '22 ноя', 
      daysLeft: 8, 
      status: 'good',
      supplier: 'ИталКомпани'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return { bg: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500' };
      case 'warning': return { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500' };
      case 'good': return { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500' };
      default: return { bg: 'bg-gray-500/10', text: 'text-gray-500', border: 'border-gray-500' };
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-amber-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Icon name="BarChart3" size={28} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">RestaurantAI</h1>
                <p className="text-sm text-muted-foreground">Аналитика закупок</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Icon name="Download" size={16} className="mr-2" />
                Экспорт
              </Button>
              <Button size="sm">
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Главная панель</h2>
              <p className="text-muted-foreground">Мониторинг закупок и AI-прогнозирование спроса</p>
            </div>
            <div className="flex gap-2">
              {['day', 'week', 'month', 'year'].map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedPeriod(period)}
                >
                  {period === 'day' && 'День'}
                  {period === 'week' && 'Неделя'}
                  {period === 'month' && 'Месяц'}
                  {period === 'year' && 'Год'}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {metrics.map((metric, index) => (
              <Card key={index} className="animate-fade-in hover:shadow-lg transition-all duration-300 hover:scale-[1.02]" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </CardTitle>
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon name={metric.icon} size={20} className="text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">{metric.value}</div>
                  <div className="flex items-center gap-1 text-sm">
                    <Icon 
                      name={metric.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                      size={16} 
                      className={metric.trend === 'up' ? 'text-green-500' : 'text-red-500'} 
                    />
                    <span className={metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                      {metric.change}
                    </span>
                    <span className="text-muted-foreground ml-1">за период</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <Card className="animate-scale-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Sparkles" size={24} className="text-secondary" />
                    AI-Прогнозы спроса
                  </CardTitle>
                  <CardDescription>Рекомендации на основе исторических данных</CardDescription>
                </div>
                <Badge variant="secondary" className="text-xs">
                  <Icon name="Zap" size={12} className="mr-1" />
                  Live
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiPredictions.map((prediction, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-card hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold mb-1">{prediction.product}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <span>Текущий запас: {prediction.currentStock} кг</span>
                          <span>•</span>
                          <span>Прогноз: {prediction.predictedDemand} кг</span>
                        </div>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${getUrgencyColor(prediction.urgency)}`}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name="TrendingUp" size={16} className="text-secondary" />
                        <span className="text-sm font-medium">{prediction.recommendation}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {prediction.confidence}% точность
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="animate-scale-in" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="PieChart" size={24} className="text-accent" />
                Категории закупок
              </CardTitle>
              <CardDescription>Распределение расходов по категориям</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {topCategories.map((category, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-sm font-bold">₽{category.spent.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full ${category.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${category.percent}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{category.percent}% от общих закупок</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="TrendingUp" size={24} className="text-primary" />
                Тренды закупок
              </CardTitle>
              <CardDescription>Динамика расходов по категориям за неделю</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={purchaseTrends}>
                  <defs>
                    <linearGradient id="colorMeat" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorFish" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorVeg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Area type="monotone" dataKey="meat" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorMeat)" name="Мясо" />
                  <Area type="monotone" dataKey="fish" stroke="hsl(var(--secondary))" fillOpacity={1} fill="url(#colorFish)" name="Рыба" />
                  <Area type="monotone" dataKey="vegetables" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorVeg)" name="Овощи" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '250ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="BarChart2" size={24} className="text-secondary" />
                Сравнение поставщиков
              </CardTitle>
              <CardDescription>Оценка по качеству, цене и доставке</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={supplierComparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="quality" fill="hsl(var(--primary))" name="Качество" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="price" fill="hsl(var(--secondary))" name="Цена" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="delivery" fill="hsl(var(--accent))" name="Доставка" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Clock" size={24} className="text-accent" />
                    Сроки хранения
                  </CardTitle>
                  <CardDescription>Товары требующие внимания</CardDescription>
                </div>
                <Badge variant="destructive" className="text-xs">
                  <Icon name="AlertTriangle" size={12} className="mr-1" />
                  {expirationItems.filter(i => i.status === 'critical').length} критичных
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {expirationItems.map((item, index) => {
                  const colors = getStatusColor(item.status);
                  return (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${colors.border} ${colors.bg} hover:shadow-md transition-all duration-200`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{item.product}</span>
                            <Badge variant="outline" className="text-xs">{item.quantity}</Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Поставщик: {item.supplier}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${colors.text}`}>{item.daysLeft}д</div>
                          <div className="text-xs text-muted-foreground">{item.expiryDate}</div>
                        </div>
                      </div>
                      {item.status === 'critical' && (
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-red-200">
                          <Icon name="AlertCircle" size={14} className="text-red-500" />
                          <span className="text-xs text-red-600 font-medium">Срочно использовать или списать</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '350ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Users" size={24} className="text-primary" />
                Поставщики
              </CardTitle>
              <CardDescription>Топ поставщиков по объему заказов</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suppliers.map((supplier, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-all duration-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="Store" size={24} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">{supplier.name}</div>
                        <div className="text-sm text-muted-foreground">{supplier.category}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{supplier.orders}</div>
                        <div className="text-xs text-muted-foreground">заказов</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={16} className="text-amber-500 fill-amber-500" />
                          <span className="font-semibold">{supplier.rating}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">рейтинг</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{supplier.avgDelivery}</div>
                        <div className="text-xs text-muted-foreground">доставка</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;