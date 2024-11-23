import { useState, useEffect } from "react";
import { useLocation, Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";
import {
  useVisionUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

// Import Firebase authentication
import { auth } from "../../../firebase";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } =
    controller;
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const route = location.pathname.split("/").slice(1);

  useEffect(() => {
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    function handleTransparentNavbar() {
      setTransparentNavbar(
        dispatch,
        fixedNavbar && window.scrollY === 0 || !fixedNavbar
      );
    }

    window.addEventListener("scroll", handleTransparentNavbar);
    handleTransparentNavbar();

    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User logged out successfully");
      // Redirect to home page
      history.push("/home");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const handleHomeIconClick = () => {
    // Navigate to dashboard route
    history.push("/dashboard");
    // Optionally, you can set other state or perform additional logic
  };

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem
        color="text"
        image={
          <Icon
            fontSize="small"
            sx={{ color: ({ palette: { white } }) => white.main }}
          >
            payment
          </Icon>
        }
        title={["", "Payment successfully completed"]}
        date="2 days"
        onClick={handleCloseMenu}
      />
    </Menu>
  );

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <VuiBox
          color="inherit"
          mb={{ xs: 1, md: 0 }}
          sx={(theme) => navbarRow(theme, { isMini })}
        >
          {location.pathname !== "/home" && ( // Conditionally render Breadcrumbs
            <Breadcrumbs
              icon="home"
              title={route[route.length - 1]}
              onClick={handleHomeIconClick}
              route={route}
              light={light}
            />
          )}
        </VuiBox>
        <VuiBox
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flex: 1,
          }}
        >
          <VuiBox
            color={light ? "white" : "inherit"}
            sx={{ display: "flex", alignItems: "center" }}
          >
            {location.pathname === "/home" && ( // Render Sign In/Sign Up for home page
              <>
                <Link to="../../authentication/sign-in">
                  <IconButton sx={navbarIconButton} size="large">
                    <Icon
                      sx={({ palette: { dark, white } }) => ({
                        color: light ? white.main : dark.main,
                      })}
                    >
                      account_circle
                    </Icon>
                    <VuiTypography
                      variant="button"
                      fontWeight="medium"
                      color={light ? "white" : "dark"}
                      sx={{ ml: 1 }}
                    >
                      Sign In
                    </VuiTypography>
                  </IconButton>
                </Link>
                <Link to="../../authentication/sign-up">
                  <IconButton sx={navbarIconButton} size="large">
                    <Icon
                      sx={({ palette: { dark, white } }) => ({
                        color: light ? white.main : dark.main,
                      })}
                    >
                      key
                    </Icon>
                    <VuiTypography
                      variant="button"
                      fontWeight="medium"
                      color={light ? "white" : "dark"}
                      sx={{ ml: 1 }}
                    >
                      Sign Up
                    </VuiTypography>
                  </IconButton>
                </Link>
              </>
            )}
          </VuiBox>
          {location.pathname !== "/home" && ( // Render other navbar items
            <>
              <IconButton
                sx={navbarIconButton}
                size="large"
                onClick={handleLogout}
              >
                <Icon
                  sx={({ palette: { dark, white } }) => ({
                    color: light ? white.main : dark.main,
                  })}
                >
                  logout
                </Icon>
                <VuiTypography
                  variant="button"
                  fontWeight="medium"
                  color="white"
                  sx={{ ml: 1 }}
                >
                  Logout
                </VuiTypography>
              </IconButton>
              <IconButton
                size="large"
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon className={"text-white"}>
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              <IconButton
                size="large"
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              ></IconButton>
              <IconButton
                size="large"
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon className={light ? "text-white" : "text-dark"}>
                  notifications
                </Icon>
              </IconButton>
              {renderMenu()}
              <Link to="/profile">
              <IconButton sx={navbarIconButton} size="large">
                <Icon
                  sx={({ palette: { dark, white } }) => ({
                    color: light ? white.main : dark.main,
                    ml: 2,
                  })}
                >
                  account_circle
                </Icon>
                <VuiTypography
                  variant="button"
                  fontWeight="medium"
                  color={light ? "white" : "dark"}
                  sx={{ ml: 1 }}
                >
                  
                </VuiTypography>
              </IconButton>
              </Link>
            </>
          )}
        </VuiBox>
      </Toolbar>
    </AppBar>
  );
}

DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
