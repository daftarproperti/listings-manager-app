import { useEffect, useState, type PropsWithChildren } from 'react'
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import {
  Badge,
  Button,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Radio,
  Typography,
} from '@material-tailwind/react'
import { LogoSVG, LogoTypeSVG, WAIconSVG } from 'assets/icons'
import {
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid'
import {
  ArrowRightStartOnRectangleIcon,
  BuildingOfficeIcon,
  UserCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import FilterForm from 'components/form/FilterForm'
import { SORT_OPTIONS } from 'components/SortBottomSheet'
import { useGetUserProfile, logout } from 'api/queries'
import { countActiveFilters, getSortLabel, isSorted } from 'utils'
import { useDirty } from 'contexts/DirtyContext'

const MENU = [{ name: 'Kelola Listing', link: '/', icon: BuildingOfficeIcon }]

const MainLayout = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchText, setSearchText] = useState(searchParams.get('q'))
  const { isDirty } = useDirty()

  const { data: profile } = useGetUserProfile()

  const query = searchParams.get('q')
  const withSideBar =
    location.pathname === '/' || location.pathname === '/properties'

  const isActive = (pathname: string) =>
    location.pathname === pathname ||
    (pathname === '/' && location.pathname.startsWith('/listings'))

  const onClickApplySort = (v: (typeof SORT_OPTIONS)[0]) => {
    if (
      searchParams.get('sort') === v.value &&
      searchParams.get('order') === v.order
    ) {
      searchParams.delete('sort')
      searchParams.delete('order')
    } else {
      searchParams.set('sort', v.value)
      searchParams.set('order', v.order)
    }
    setSearchParams(searchParams)
  }

  const handleNavigation = (
    event: React.MouseEvent<HTMLElement>,
    path: string,
  ) => {
    event.preventDefault()
    if (isDirty) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Do you really want to leave?',
      )
      if (!confirmLeave) {
        return
      }
    }
    navigate(path)
  }

  useEffect(() => {
    setSearchText(query)
  }, [query])

  const handleLogout = () => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Do you really want to leave?',
      )
      if (!confirmLeave) {
        return
      }
    }
    localStorage.clear()
    logout()
    navigate('/login')
  }

  const phoneNumber = profile?.phoneNumber ?? ''
  let menu = MENU.concat([
    { name: `Akun (${phoneNumber})`, link: '/user', icon: UserCircleIcon },
  ])

  if (profile?.delegatePhone) {
    menu = menu.concat([
      { name: 'Delegasi', link: '/delegate', icon: UserGroupIcon },
    ])
  }

  return (
    <div className="grid max-h-dvh grid-cols-7">
      <div className="col-span-2 hidden lg:block">
        <div className="sticky top-0 mx-auto flex h-dvh w-full max-w-xs flex-col p-4 pt-8">
          <div className="grow">
            <div className="flex items-center gap-3 px-2">
              <LogoSVG />
              <LogoTypeSVG />
            </div>
            <List className="mt-8">
              {menu.map((item) => (
                <Link key={item.name} to={item.link}>
                  <ListItem
                    selected={isActive(item.link)}
                    className={`hover:bg-blue-100 hover:text-blue-600 active:bg-blue-100 active:text-blue-600 ${
                      isActive(item.link)
                        ? 'bg-blue-100 text-blue-600 focus:bg-blue-100 focus:text-blue-600'
                        : 'focus:bg-inherit focus:text-inherit'
                    }`}
                    onClick={(e) => handleNavigation(e, item.link)}
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
          </div>
          <Typography
            color="gray"
            variant="paragraph"
            className="flex items-center space-x-2 p-2"
          >
            <span>Hubungi Kami</span>
            <Link
              target="_blank"
              to="https://api.whatsapp.com/send?phone=6285186856707"
            >
              <Button
                variant="outlined"
                className="flex items-center space-x-2 p-2"
              >
                <WAIconSVG className="inline h-5 w-5 translate-y-[-1px]" />
                <span>0851-8685-6707</span>
              </Button>
            </Link>
          </Typography>
          <div className="px-2 text-xs leading-5 text-slate-400">
            Made with love in Indonesia © 2024
          </div>
        </div>
      </div>
      <div
        className={`col-span-7 bg-slate-100 ${
          withSideBar ? 'lg:col-span-3' : 'lg:col-span-5'
        }`}
      >
        {children}
      </div>
      {withSideBar && (
        <div className="col-span-2 hidden bg-slate-100 px-1 lg:block">
          <div className="sticky top-0 mr-auto flex h-dvh w-full max-w-xs flex-col pb-4 pt-8">
            <div className="w-full space-y-2 pb-4">
              <Menu>
                <MenuHandler>
                  <Button
                    size="sm"
                    color="blue"
                    variant="outlined"
                    className="flex w-full items-center justify-center gap-2 bg-white text-sm font-normal capitalize"
                  >
                    <Badge
                      placement="top-start"
                      invisible={!isSorted(searchParams)}
                    >
                      <Bars3BottomLeftIcon className="h-5 w-5" />
                    </Badge>
                    {isSorted(searchParams)
                      ? getSortLabel(searchParams)
                      : 'Urutkan Berdasarkan'}
                  </Button>
                </MenuHandler>
                <MenuList>
                  {SORT_OPTIONS.map((option, index) => (
                    <MenuItem
                      key={index}
                      className="min-w-72 p-0"
                      onClick={() => onClickApplySort(option)}
                    >
                      <label
                        htmlFor="sort-list"
                        className="flex w-full cursor-pointer items-center border-b border-gray-200 p-3"
                      >
                        {option.label}
                        <ListItemSuffix className="mr-3">
                          <Radio
                            readOnly
                            ripple={false}
                            color="blue-gray"
                            crossOrigin={undefined}
                            className="hover:before:opacity-0"
                            containerProps={{ className: 'p-0' }}
                            checked={
                              searchParams.get('sort') === option.value &&
                              searchParams.get('order') === option.order
                            }
                          />
                        </ListItemSuffix>
                      </label>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </div>
            <div className="grow space-y-3 overflow-auto rounded-lg bg-blue-100 px-4 py-3 scrollbar-thin">
              <div className="flex items-center justify-between">
                <div className="flex gap-2 text-lg font-semibold">
                  <Badge
                    content={countActiveFilters(searchParams)}
                    invisible={countActiveFilters(searchParams) === 0}
                    className="min-h-5 min-w-5"
                  >
                    <div className="pr-2">Filter</div>
                  </Badge>
                </div>
                <Button
                  size="sm"
                  color="blue"
                  className={`flex items-center gap-1.5 text-sm font-normal capitalize ${
                    searchParams?.size > 0 ? 'visible' : 'invisible'
                  }`}
                  onClick={() => navigate(location.pathname)}
                >
                  <XCircleIcon className="w-5" />
                  Reset
                </Button>
              </div>
              <div className="relative flex grow gap-1 rounded-lg border border-solid border-slate-400 bg-white">
                <MagnifyingGlassIcon className="absolute left-2 top-[50%] h-4 w-4 -translate-y-[50%] text-slate-400" />
                <input
                  value={searchText ?? ''}
                  placeholder="Kata kunci pencarian"
                  className="h-full w-full rounded-lg border-none px-8 py-2.5 ring-0"
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      searchParams.delete('q')
                      if (searchText) {
                        searchParams.set('q', searchText)
                      }
                      setSearchParams(searchParams)
                    }
                  }}
                />
                {searchParams.get('q') && (
                  <XMarkIcon
                    className="absolute right-2.5 top-[50%] h-4 w-4 -translate-y-[50%] cursor-pointer text-slate-400"
                    onClick={() => {
                      searchParams.delete('q')
                      setSearchParams(searchParams)
                    }}
                  />
                )}
              </div>
              <FilterForm />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MainLayout
