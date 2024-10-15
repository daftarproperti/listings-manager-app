import { WAIconSVG } from 'assets/icons'
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react'
import { logout } from 'api/queries'
import {
  EllipsisVerticalIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline'

const HomeHeaderButton = () => {
  const [showDropdown, setShowDropdown] = useState(false)

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    logout()
    navigate('/login')
  }

  return (
    <>
      <Menu
        placement="bottom-end"
        open={showDropdown}
        handler={setShowDropdown}
      >
        <MenuHandler>
          <IconButton variant="text" className="rounded-full">
            <EllipsisVerticalIcon className="h-5 w-5" />
          </IconButton>
        </MenuHandler>
        <MenuList className="px-0 py-1">
          <MenuItem
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-none bg-white"
          >
            <ArrowRightStartOnRectangleIcon className="h-5 w-5 text-gray-400" />
            <Typography variant="small">Keluar</Typography>
          </MenuItem>
          <MenuItem className="flex items-center gap-2 rounded-none bg-white">
            <WAIconSVG className="h-5 w-5 text-gray-400" />
            <Link
              target="_blank"
              to="https://api.whatsapp.com/send?phone=6285186856707"
            >
              <Typography variant="small">Hubungi</Typography>
            </Link>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}

export default HomeHeaderButton
