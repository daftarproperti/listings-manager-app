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
} from '@material-tailwind/react'
import {
  AccountIconSVG,
  ListingIconSVG,
  LogoSVG,
  LogoTypeSVG,
  SearchIconSVG,
} from 'assets/icons'
import {
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid'
import FilterForm from 'components/form/FilterForm'
import { SORT_OPTIONS } from 'components/SortBottomSheet'
import { useGetSavedSearchList, logout } from 'api/queries'
import type { SavedSearch } from 'api/types'
import {
  countActiveFilters,
  getSortLabel,
  isSavedSearchApplied,
  isSorted,
  savedSearchToSearchParams,
} from 'utils'

const MENU = [
  { name: 'Listing Saya', link: '/', icon: ListingIconSVG },
  { name: 'Cari Properti', link: '/properties', icon: SearchIconSVG },
  { name: 'Akun Saya', link: '/user', icon: AccountIconSVG },
]

const MainLayout = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchText, setSearchText] = useState(searchParams.get('q'))

  const { data } = useGetSavedSearchList()

  const query = searchParams.get('q')
  const savedSearchTitle = isSavedSearchApplied(searchParams)
  const withSideBar =
    location.pathname === '/' || location.pathname === '/properties'

  const isActive = (pathname: string) => location.pathname === pathname

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

  const onClickApplySavedSearch = (search: SavedSearch) => {
    if (searchParams.get('searchId') === search.id) {
      const newSearchParams = new URLSearchParams()
      setSearchParams(newSearchParams)
    } else {
      const newSearchParams = savedSearchToSearchParams(search)
      setSearchParams(newSearchParams)
    }
  }

  useEffect(() => {
    setSearchText(query)
  }, [query])

  const handleLogout = () => {
    localStorage.clear()
    logout()
    navigate('/login')
  }

  return (
    <div className="grid max-h-screen grid-cols-7">
      <div className="col-span-2 hidden lg:block">
        <div className="sticky top-0 mx-auto flex h-screen w-full max-w-xs flex-col p-4 pt-8">
          <div className="grow">
            <div className="flex items-center gap-3 px-2">
              <LogoSVG />
              <LogoTypeSVG />
            </div>
            <List className="mt-8">
              {MENU.map((item) => (
                <Link key={item.name} to={item.link}>
                  <ListItem
                    selected={isActive(item.link)}
                    className={`hover:bg-blue-100 hover:text-blue-600 active:bg-blue-100 active:text-blue-600 ${
                      isActive(item.link)
                        ? 'bg-blue-100 text-blue-600 focus:bg-blue-100 focus:text-blue-600'
                        : 'focus:bg-inherit focus:text-inherit'
                    }`}
                  >
                    <ListItemPrefix>
                      <item.icon className="text-inherit" />
                    </ListItemPrefix>
                    {item.name}
                  </ListItem>
                </Link>
              ))}
            </List>
          </div>
          <div className="mt-4">
            <Button
              color="red"
              size="sm"
              className="w-full"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
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
          <div className="sticky top-0 mr-auto flex h-screen w-full max-w-xs flex-col space-y-2 pb-4 pt-8">
            <div className="w-full space-y-2">
              {location.pathname === '/properties' && (
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
                        invisible={savedSearchTitle === 'Calon Pembeli'}
                      >
                        <AccountIconSVG className="h-5 w-5" />
                      </Badge>
                      {savedSearchTitle}
                    </Button>
                  </MenuHandler>
                  <MenuList>
                    {data?.saved_searches?.length ? (
                      data?.saved_searches?.map((search, index) => (
                        <MenuItem
                          key={index}
                          className="min-w-72 p-0"
                          onClick={(e) => {
                            e.preventDefault()
                            onClickApplySavedSearch(search)
                          }}
                        >
                          <label
                            htmlFor={`saved-search-${index}`}
                            className="flex w-full cursor-pointer items-center border-b border-gray-200 p-3"
                          >
                            {search.title}
                            <ListItemSuffix className="mr-3">
                              <Radio
                                readOnly
                                ripple={false}
                                color="blue-gray"
                                crossOrigin={undefined}
                                checked={
                                  searchParams.get('searchId') === search.id
                                }
                                onChange={() => {}}
                                className="hover:before:opacity-0"
                                containerProps={{ className: 'p-0' }}
                                id={`saved-search-${index}`}
                              />
                            </ListItemSuffix>
                          </label>
                        </MenuItem>
                      ))
                    ) : (
                      <div className="min-w-72 py-2 text-center text-slate-500">
                        Belum ada permintaan
                      </div>
                    )}
                    <Button
                      size="sm"
                      color="blue"
                      className="mt-3 w-full text-sm font-normal capitalize"
                      onClick={() => navigate('/saved-searches')}
                    >
                      Kelola Calon Pembeli
                    </Button>
                  </MenuList>
                </Menu>
              )}
              <Menu>
                <MenuHandler>
                  <Button
                    size="sm"
                    color="blue"
                    variant="outlined"
                    className="flex w-full items-center justify-center gap-2 bg-white text-sm font-normal capitalize"
                    onClick={() => navigate('/saved-searches')}
                  >
                    <Badge
                      placement="top-start"
                      invisible={!isSorted(searchParams)}
                    >
                      <Bars3BottomLeftIcon className="h-5 w-5" />
                    </Badge>
                    {isSorted(searchParams)
                      ? getSortLabel(searchParams)
                      : 'Urut Berdasarkan'}
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
            <div className="grow space-y-3 overflow-auto rounded-lg bg-blue-100 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex gap-2 text-lg font-semibold">
                  Filter
                  <Badge
                    content={countActiveFilters(searchParams)}
                    invisible={countActiveFilters(searchParams) === 0}
                    className="min-h-5 min-w-5"
                  />
                </div>
                {searchParams?.size > 0 && (
                  <Button
                    size="sm"
                    color="blue"
                    className="flex items-center gap-1.5 text-sm font-normal capitalize"
                    onClick={() => navigate(location.pathname)}
                  >
                    <XCircleIcon className="w-5" />
                    Reset
                  </Button>
                )}
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
              <FilterForm type="listing" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MainLayout
