import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Notification {
  id: string;
  type: 'expiry' | 'stock' | 'order' | 'supplier';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'expiry',
      title: 'Срок годности истекает',
      message: 'Молоко 3.2% - осталось 1 день до истечения срока годности',
      timestamp: new Date(Date.now() - 5 * 60000),
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'stock',
      title: 'Низкий запас',
      message: 'Креветки тигровые - текущий запас 8 кг, рекомендуется заказать +14 кг',
      timestamp: new Date(Date.now() - 15 * 60000),
      read: false,
      priority: 'high'
    },
    {
      id: '3',
      type: 'expiry',
      title: 'Срок годности',
      message: 'Сливки 33% - осталось 2 дня',
      timestamp: new Date(Date.now() - 30 * 60000),
      read: false,
      priority: 'medium'
    },
    {
      id: '4',
      type: 'order',
      title: 'Заказ доставлен',
      message: 'Заказ #4382 от ОкеанФреш успешно доставлен',
      timestamp: new Date(Date.now() - 60 * 60000),
      read: true,
      priority: 'low'
    },
    {
      id: '5',
      type: 'supplier',
      title: 'Новое предложение',
      message: 'МясоПрайм предлагает скидку 15% на говядину',
      timestamp: new Date(Date.now() - 120 * 60000),
      read: true,
      priority: 'medium'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const interval = setInterval(() => {
      const criticalItems = notifications.filter(
        n => n.type === 'expiry' && n.priority === 'high' && !n.read
      );
      
      if (criticalItems.length > 0) {
        toast.error('Срочно! Истекает срок годности продуктов', {
          description: `${criticalItems.length} товаров требуют немедленного внимания`,
          duration: 5000,
        });
      }
    }, 300000);

    return () => clearInterval(interval);
  }, [notifications]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'expiry': return 'Clock';
      case 'stock': return 'PackageOpen';
      case 'order': return 'ShoppingCart';
      case 'supplier': return 'Store';
      default: return 'Bell';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-amber-500';
      case 'low': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Только что';
    if (minutes < 60) return `${minutes} мин назад`;
    if (hours < 24) return `${hours} ч назад`;
    return `${days} дн назад`;
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Icon name="Bell" size={16} className="mr-2" />
          Уведомления
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <Icon name="Bell" size={24} />
              Уведомления
            </SheetTitle>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                <Icon name="CheckCheck" size={16} className="mr-1" />
                Прочитать все
              </Button>
            )}
          </div>
        </SheetHeader>
        <div className="mt-6 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Icon name="BellOff" size={48} className="mx-auto mb-3 opacity-50" />
              <p>Нет уведомлений</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  !notification.read ? 'border-l-4 border-l-primary bg-primary/5' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className={`p-2 rounded-lg h-fit ${
                      notification.priority === 'high' ? 'bg-red-500/10' : 
                      notification.priority === 'medium' ? 'bg-amber-500/10' : 
                      'bg-blue-500/10'
                    }`}>
                      <Icon 
                        name={getNotificationIcon(notification.type)} 
                        size={20} 
                        className={getPriorityColor(notification.priority)} 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-sm">{notification.title}</h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1"></div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Icon name="Clock" size={12} />
                        <span>{formatTimestamp(notification.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationPanel;
