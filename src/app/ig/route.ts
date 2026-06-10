import { redirect } from 'next/navigation'

export function GET() {
  redirect('/?src=instagram-bio')
}
