import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/profile')({
  component: () => <div>Hello /_private/profile!</div>
})