import React from 'react'
import { Link } from 'react-router-dom'

const WhatsAppLinkContact: React.FC = () => {
  return (
    <Link
      target="_blank"
      to="https://api.whatsapp.com/send?phone=6285186856707"
      className="text-blue-500 hover:text-blue-700"
    >
      Hubungi Daftar Properti
    </Link>
  )
}

export default WhatsAppLinkContact
