import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import {useRouter} from 'next/router'

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const Router=useRouter()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className="md:!hidden">
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="!capitalize !text-white"
      >
        Browse
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="menu cursor-pointer"
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        >
        <MenuItem onClick={()=>{()=>Router.push('/') ;()=>handleClose}}>Home</MenuItem>
        <MenuItem onClick={()=>{()=>Router.push('/TV') ;()=>handleClose}}>TV Shows</MenuItem>
        <MenuItem onClick={()=>{()=>Router.push('/Movies') ;()=>handleClose}}>Movies</MenuItem>
        <MenuItem onClick={()=>{()=>Router.push('/Popular') ;()=>handleClose}}>New & Popular</MenuItem>


      </Menu>
    </div>
  )
}