import * as React from 'react'
import { Link } from 'react-router-dom' // Ensure react-router-dom is installed
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'

const pages = ['Home', 'Pricing Plans', 'About Us']
const settings = ['My Profile', 'Logout']

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null)
    const [anchorElUser, setAnchorElUser] = React.useState(null)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    // Helper to format paths for the navigation links
    const getPagePath = (page) => {
        if (page === 'Home') return '/';
        return `/${page.toLowerCase().replace(/\s+/g, '-')}`;
    };

    return (
        <AppBar position="static" sx={{ background: 'linear-gradient(to right, #030012 0%, #090327 30%, #090327 70%, #030012 100%)', margin: 0, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    {/* --- DESKTOP LOGO SECTION --- */}
                    <Box
                        component={Link}
                        to="/"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            mr: 1,
                            alignItems: 'center',
                            textDecoration: 'none'
                        }}
                    >
                        <Box
                            component="img"
                            sx={{ height: 20, width: 'auto' }}
                            alt="Logo"
                            src="/logo.png"
                        />
                    </Box>

                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        myNetflix
                    </Typography>

                    {/* Mobile Menu Icon and Logo */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                "& .MuiPaper-root": { backgroundColor: '#090327', color: 'white' }
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    component={Link}
                                    to={getPagePath(page)}
                                >
                                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>

                        {/* --- MOBILE LOGO SECTION --- */}
                        <Box
                            component={Link}
                            to="/"
                            sx={{
                                display: { xs: 'flex', md: 'none' },
                                mr: 1,
                                alignSelf: 'center',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <Box
                                component="img"
                                sx={{ height: 30, width: 'auto' }}
                                alt="Logo"
                                src="/logo.png"
                            />
                        </Box>

                        <Typography
                            variant="h5"
                            noWrap
                            component={Link}
                            to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                                alignSelf: 'center'
                            }}
                        >
                            myNetflix
                        </Typography>
                    </Box>

                    {/* Desktop Navigation Pages */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 9, mr: 10 }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                component={Link}
                                to={getPagePath(page)}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block', '&:hover': { color: '#cecefb' } }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {/* User Settings */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="User Avatar" src="https://picsum.photos/200/300" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default ResponsiveAppBar