import { createRouter, createWebHashHistory } from 'vue-router';
import HomeLayout from '@/views/HomeLayout';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeLayout',
      component: HomeLayout,
      children: [
        { path: '', name: 'Home', component: () => import('@/views/HomeView') },
        {
          path: 'products',
          name: 'Products',
          component: () => import('@/views/ProductsView'),
        },

        {
          path: 'cart',
          name: 'Cart',
          component: () => import('@/views/CartView'),
        },
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/views/LoginView'),
        },
        {
          path: 'product/:id',
          name: 'Product',
          component: () => import('@/views/ProductView'),
        },
      ],
    },
    {
      path: '/admin',
      name: 'adminLayout',
      component: () => import('@/views/AdminLayout'),
      children: [
        {
          path: 'products',
          component: () => import('@/views/AdminProducts'),
        },
        {
          path: 'orders',
          component: () => import('@/views/AdminOrders'),
        },
      ],
    },
  ],
});

export default router;
