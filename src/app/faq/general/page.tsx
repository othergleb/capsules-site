import { redirect } from 'next/navigation'
// General FAQ content lives on the main /faq page — redirect there
export default function GeneralFAQPage() {
  redirect('/faq')
}
