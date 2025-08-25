export const routes = {
  auth: {
    home: '/auth',
  },
  home: {
    home: '/dashboard',
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
  }
};