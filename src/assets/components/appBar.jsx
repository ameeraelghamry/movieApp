import * as React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { logout } from '../services/appwrite'
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

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null)
    const [anchorElUser, setAnchorElUser] = React.useState(null)

    const navigate = useNavigate();
    const location = useLocation();

    // --- FUNCTIONAL UPDATES START ---

    // 1. Check if user exists in localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = !!user;

    // 2. Determine settings menu items based on login status
    const settings = isLoggedIn
        ? ['My Profile', 'Logout']
        : ['Login', 'Signup'];

    // Determine if we should hide the User Menu (Login and Signup pages)
    const hideUserMenu = location.pathname === '/login' || location.pathname === '/signup';

    // --- FUNCTIONAL UPDATES END ---

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleSettingClick = async (setting) => {
        handleCloseUserMenu();

        if (setting === 'Logout') {
            try {
                // Attempt to tell Appwrite to kill the session
                await logout();
            } catch (error) {
                // If we get a 401, the user is already technically logged out 
                // from the server's perspective, so we just continue.
                console.warn("Server-side logout skipped (already unauthorized):", error.message);
            } finally {
                // ALWAYS clear local state and redirect, regardless of API success
                localStorage.removeItem("user");
                navigate('/login');
                // Optional: force a refresh if your app state doesn't update automatically
                // window.location.reload(); 
            }
        } else if (setting === 'Login') {
            navigate('/login');
        } else if (setting === 'Signup') {
            navigate('/signup');
        } else if (setting === 'My Profile') {
            navigate('/profile');
        }
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const getPagePath = (page) => {
        if (page === 'Home') return '/';
        return `/${page.toLowerCase().replace(/\s+/g, '-')}`;
    };

    return (
        <AppBar position="static" sx={{ background: 'linear-gradient(to right, #030012 0%, #090327 30%, #090327 70%, #030012 100%)', margin: 0, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    {/* Desktop Logo */}
                    <Box component={Link} to="/" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, alignItems: 'center', textDecoration: 'none' }}>
                        <Box component="img" sx={{ height: 20, width: 'auto' }} alt="Logo" src="/logo.png" />
                    </Box>

                    <Typography variant="h6" noWrap component={Link} to="/" sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontWeight: 700, color: 'inherit', textDecoration: 'none' }}>
                        myNetflix
                    </Typography>

                    {/* Mobile Menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorElNav}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' }, "& .MuiPaper-root": { backgroundColor: '#090327', color: 'white' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu} component={Link} to={getPagePath(page)}>
                                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Desktop Navigation */}
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

                    {/* --- CONDITIONALLY RENDERED USER SECTION --- */}
                    {!hideUserMenu && (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="User Avatar" src="https://picsum.photos/200/300" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                anchorEl={anchorElUser}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={() => handleSettingClick(setting)}>
                                        <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default ResponsiveAppBar