import {
  DocumentCheckIcon,
  EllipsisVerticalIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import {
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react'

import ConfirmationDialog from './ConfirmationDialog'
import ClosingDialog from './ClosingDialog'
import useHandleDelete from './useHandleDelete'

interface DotsButtonProps {
  propertyId?: string
  multipleUnit?: boolean
  closings?: number
  isApproved?: boolean
}

const DotsHeaderButton: React.FC<DotsButtonProps> = ({
  propertyId,
  multipleUnit,
  closings = 0,
  isApproved = false,
}) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [isNewListingSheetOpen, setIsNewListingSheetOpen] = useState(false)
  const [, setMode] = useState('')

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
            <EllipsisVerticalIcon className="h-5 w-5" />
          </IconButton>
        </MenuHandler>
        <MenuList className="px-0 py-1">
          {import.meta.env.VITE_WITH_CLOSING === 'true' && (
            <MenuItem
              className={`flex items-start gap-2 rounded-none text-lg ${
                closings === 0
                  ? ''
                  : closings > 0 && multipleUnit === false
                    ? 'cursor-not-allowed text-slate-300 hover:text-slate-300'
                    : ''
              }`}
              onClick={
                closings === 0 || (closings > 0 && multipleUnit === true)
                  ? () => setIsNewListingSheetOpen(true)
                  : undefined
              }
              title={
                closings > 0 && !multipleUnit
                  ? 'Sudah pernah closings'
                  : undefined
              }
            >
              <DocumentCheckIcon className="h-5 w-5" />
              <div>
                <Typography variant="small">Laporan Closing</Typography>
                {closings > 0 && !multipleUnit && (
                  <div className="text-[12px] text-slate-400">
                    Listing ini sudah pernah dilaporkan
                  </div>
                )}
              </div>
            </MenuItem>
          )}
          {!isApproved && (
            <MenuItem
              className="flex items-center gap-2 rounded-none"
              onClick={initiateDelete}
            >
              <TrashIcon className="h-5 w-5" />
              <Typography variant="small">Hapus</Typography>
            </MenuItem>
          )}
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
      <ClosingDialog
        isOpen={isNewListingSheetOpen}
        setIsOpen={setIsNewListingSheetOpen}
        setMode={setMode}
        listingId={propertyId}
      />
    </>
  )
}

export default DotsHeaderButton
