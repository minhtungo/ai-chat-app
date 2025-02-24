import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/lesson/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/lesson/"!</div>
}
