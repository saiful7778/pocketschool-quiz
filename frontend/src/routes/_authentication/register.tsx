import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authentication/register')({
  component: () => <div>Hello /_authentication/register!</div>
})