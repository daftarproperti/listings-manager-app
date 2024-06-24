import { MoreIconSVG, LogoutIconSVG } from 'assets/icons'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react'
import { logout } from 'api/queries'

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
            <MoreIconSVG />
          </IconButton>
        </MenuHandler>
        <MenuList className="px-0 py-1">
          <MenuItem
            onClick={handleLogout}
            className="flex items-center rounded-none bg-white text-lg"
          >
            <LogoutIconSVG className="mt-2 h-8 w-auto text-gray-400" />
            <span>Keluar</span>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}

export default HomeHeaderButton
