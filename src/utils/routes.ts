export const routes = {
  auth: {
    home: '/auth',
  },
  home: {
    home: '/dashboard',
  },
  homeEcommerce: {
    home: '/',
  },
  cliente: {
    new: "/dashboard/cliente/create",
    search: "/dashboard/cliente"
  },
  product: {
    new: "/dashboard/product/create",
    search: "/dashboard/product",
    edit: (id: string): string => `/dashboard/product/edit/${id}`
  },
  kindProduct: {
    new: "/dashboard/kind-product/create",
    search: "/dashboard/kind-product",
    edit: (id: string): string => `/dashboard/kind-product/edit/${id}`
  },
  service: {
    new: "/dashboard/service/create",
    search: "/dashboard/service",
    edit: (id: string): string => `/dashboard/service/edit/${id}`
  },
  produtosEcommerce: {
    view: (id: string): string => `/product/${id}`
  },
  clienteCadastro: {
    create: "/cadastro",
    profile: (id: string): string => `/cadastro/perfil/${id}`,
    pedidos: (id: string): string => `/cadastro/perfil/${id}/meus-pedidos`,
    agendamentos: (id: string): string => `/cadastro/perfil/${id}/meus-agendamentos`
  },
  agendamento: {
    new: "/agendamento",
  }
};