import { MoreIconSVG, TrashIconSVG } from 'assets/icons'
import React, { useState } from 'react'
import {
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react'

import ConfirmationDialog from './ConfirmationDialog'
import useHandleDelete from './useHandleDelete'

interface DotsButtonProps {
  propertyId?: string
}

const DotsHeaderButton: React.FC<DotsButtonProps> = ({ propertyId }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const title =
    'Yakin akan hapus listing ' +
    document.querySelector('h1')?.textContent +
    ' ?'
  const subtitle =
    'Setelah terhapus, listing tidak bisa ditemukan di jaringan Daftar Properti.'

  const {
    isDialogOpen,
    handleDeleteInitiation,
    handleDeleteConfirmation,
    handleDeleteCancellation,
  } = useHandleDelete(propertyId || 'defaultId')
  const initiateDelete = () => {
    handleDeleteInitiation()
    setShowDropdown(false)
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
            className="flex items-center gap-2 rounded-none text-lg"
            onClick={initiateDelete}
          >
            <TrashIconSVG className="w-6" />
            Hapus
          </MenuItem>
        </MenuList>
      </Menu>
      <ConfirmationDialog
        title={title}
        subtitle={subtitle}
        buttonText="Ya, Hapus"
        isOpen={isDialogOpen}
        setIsOpen={handleDeleteCancellation}
        onConfirm={handleDeleteConfirmation}
      />
    </>
  )
}

export default DotsHeaderButton
