import { LoginForm } from '@/features/auth/components/login-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/login')({
  component: LoginComponent,
})

function LoginComponent() {
  return <LoginForm />
}
