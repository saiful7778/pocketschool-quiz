import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/classroom')({
  component: () => <div>Hello /_private/classroom!</div>
})