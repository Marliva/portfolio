import { Navigate, Outlet } from 'react-router-dom'
import { ADMIN_ROUTES } from '@/config/admin'

function PrivateRoute() {
  const token = localStorage.getItem('admin_token')

  if (!token) {
    return <Navigate to={ADMIN_ROUTES.login} replace />
  }

  return <Outlet />
}

export default PrivateRoute