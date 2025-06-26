import { ROUTES } from '../utils/constants';

export const mainNavigation = [
  {
    name: 'Início',
    href: ROUTES.HOME,
    icon: '🏠'
  },
  {
    name: 'Sobre',
    href: ROUTES.ABOUT,
    icon: '👩‍⚕️'
  },
  {
    name: 'Serviços',
    href: ROUTES.SERVICES,
    icon: '🔍'
  },
  {
    name: 'Depoimentos',
    href: ROUTES.TESTIMONIALS,
    icon: '⭐'
  },
  {
    name: 'Contato',
    href: ROUTES.CONTACT,
    icon: '📞'
  },
  {
    name: 'Blog',
    href: ROUTES.BLOG,
    icon: '📝'
  }
];

export const dashboardNavigation = {
  admin: [
    { name: 'Dashboard', href: '/dashboard/admin', icon: '📊' },
    { name: 'Usuários', href: '/dashboard/admin/usuarios', icon: '👥' },
    { name: 'Consultas', href: '/dashboard/admin/consultas', icon: '📅' },
    { name: 'Analytics', href: '/dashboard/admin/analytics', icon: '📈' },
    { name: 'Configurações', href: '/dashboard/admin/config', icon: '⚙️' }
  ],
  editor: [
    { name: 'Dashboard', href: '/dashboard/editor', icon: '📊' },
    { name: 'Conteúdo', href: '/dashboard/editor/conteudo', icon: '📝' },
    { name: 'Blog', href: '/dashboard/editor/blog', icon: '📰' },
    { name: 'Mídia', href: '/dashboard/editor/midia', icon: '🖼️' }
  ],
  consultant: [
    { name: 'Dashboard', href: '/dashboard/consultor', icon: '📊' },
    { name: 'Clientes', href: '/dashboard/consultor/clientes', icon: '👥' },
    { name: 'Agenda', href: '/dashboard/consultor/agenda', icon: '📅' },
    { name: 'Prontuários', href: '/dashboard/consultor/prontuarios', icon: '📋' }
  ],
  client: [
    { name: 'Dashboard', href: '/dashboard/cliente', icon: '📊' },
    { name: 'Meu Pet', href: '/dashboard/cliente/pet', icon: '🐕' },
    { name: 'Consultas', href: '/dashboard/cliente/consultas', icon: '📅' },
    { name: 'Plano Nutricional', href: '/dashboard/cliente/plano', icon: '🍽️' }
  ]
};