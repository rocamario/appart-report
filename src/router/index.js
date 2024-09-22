import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import LoginRegisterView from '@/views/LoginRegisterView.vue';
import WelcomeView from '@/views/WelcomeView.vue';
import DossiersView from '@/views/DossiersView.vue';
import ApartmentsView from '@/views/ApartmentsView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import DossierView from '@/views/DossierView.vue';
import MyDossierView from '@/views/MyDossierView.vue';
import AddDossierView from '@/views/AddDossierView.vue';
import AddApartmentView from '@/views/AddApartmentView.vue';
import EditDossierView from '@/views/EditDossierView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login-register',
      name: 'login-register',
      component: LoginRegisterView,
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomeView,
    },
    {
      path: '/dossiers',
      name: 'dossiers',
      component: DossiersView,
    },
    {
      path: '/apartments',
      name: 'apartments',
      component: ApartmentsView,
    },
    {
      path: '/apartment/add',
      name: 'apartment/add',
      component: AddApartmentView,
    },
    {
      path: '/dossiers/:id',
      name: 'dossier',
      component: DossierView,
    },
    {
      path: '/myDossier',
      name: 'myDdossier',
      component: MyDossierView,
    },
    {
      path: '/dossiers/add',
      name: 'add-dossier',
      component: AddDossierView,
    },
    {
      path: '/dossiers/edit/:id',
      name: 'edit-dossier',
      component: EditDossierView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
});

export default router;
