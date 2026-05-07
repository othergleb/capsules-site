import { redirect } from 'next/navigation'
// Ballot FAQ content lives on the main /faq page — redirect there
export default function BallotFAQPage() {
  redirect('/faq')
}
