import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from '@material-tailwind/react'
import {
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { WAIconSVG } from 'assets/icons'
import useMenuList from 'components/layout/useMenuList'

const HomeHeaderButton = () => {
  const [showDropdown, setShowDropdown] = useState(false)

  const { menu, isActive, handleLogout, handleNavigation } = useMenuList()

  const handleOpen = () => {
    setShowDropdown(!showDropdown)
  }

  return (
    <>
      <IconButton variant="text" className="rounded-full" onClick={handleOpen}>
        <Bars3Icon className="h-5 w-5" />
      </IconButton>
      <Dialog size="xxl" open={showDropdown} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <Typography variant="h6">Menu Utama</Typography>
          <IconButton variant="text" onClick={handleOpen}>
            <XMarkIcon className="h-5 w-5" />
          </IconButton>
        </DialogHeader>
        <div className="flex h-full flex-col">
          <List className="grow">
            {menu.map((item) => (
              <Link autoFocus={false} key={item.name} to={item.link}>
                <ListItem
                  selected={isActive(item.link)}
                  className={`hover:bg-blue-100 hover:text-blue-600 active:bg-blue-100 active:text-blue-600 ${
                    isActive(item.link)
                      ? 'bg-blue-100 text-blue-600 focus:bg-blue-100 focus:text-blue-600'
                      : 'focus:bg-inherit focus:text-inherit'
                  }`}
                  onClick={(e) => {
                    handleOpen()
                    handleNavigation(e, item.link)
                  }}
                >
                  <ListItemPrefix>
                    <item.icon className="h-6 w-6 text-inherit" />
                  </ListItemPrefix>
                  {item.name}
                </ListItem>
              </Link>
            ))}
            <ListItem
              className={`hover:bg-blue-100 hover:text-blue-600 focus:bg-inherit focus:text-inherit active:bg-blue-100 active:text-blue-600`}
              onClick={handleLogout}
            >
              <ListItemPrefix>
                <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
              </ListItemPrefix>
              Keluar
            </ListItem>
          </List>
          <DialogBody className="space-y-2">
            <Typography
              color="gray"
              variant="paragraph"
              className="flex items-center space-x-2"
            >
              <span>Hubungi Kami</span>
              <Link
                target="_blank"
                to="https://api.whatsapp.com/send?phone=6285186856707"
              >
                <Button
                  size="sm"
                  variant="outlined"
                  className="flex items-center space-x-2"
                >
                  <WAIconSVG className="inline h-5 w-5 translate-y-[-1px]" />
                  <span>0851-8685-6707</span>
                </Button>
              </Link>
            </Typography>
            <Typography className="text-xs leading-5 text-slate-400">
              Made with love in Indonesia © 2024
            </Typography>
          </DialogBody>
        </div>
      </Dialog>
    </>
  )
}

export default HomeHeaderButton
