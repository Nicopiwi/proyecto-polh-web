import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RecetaIcon from '@material-ui/icons/Assignment';
import CrearIcon from '@material-ui/icons/Create';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import MakeRecipe from './makeRecipe'
import MyRecipes from './myRecipes'
import Profile from './profile'

import { useSelector } from "react-redux";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  marginText:{
    marginRight:'20px'
  },
  title:{
    left: '50%',
    alignSelf:'center'
  },
  cover:{
    width:'100%',
    height:'calc(100% - 64px);'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function DashboardScreen(props) {
    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();
    const userName = useSelector(state => state.user.userType==="medico"?`${state.user.userName} ${state.user.userSurname}`:state.user.userNombreEstablecimiento);
    const userType = useSelector(state => state.user.userType);
    const [mobileOpen, setMobileOpen] = React.useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    const logOut=()=>{
        console.log(userType)
        localStorage.removeItem('userToken')
        props.history.push('/')
    }

  
    const drawer = (
      <div>
        <div className={classes.toolbar}>
          <div className={classes.cover}>
          </div>
          </div>
        <Divider />
        <List>
            <ListItem button onClick={()=>{props.history.push('/dashboard/misrecetas')}}>
              <ListItemIcon>
                  <RecetaIcon />
                </ListItemIcon>
              <ListItemText primary={"Mis Recetas"} />
            </ListItem>
            {userType==='medico'&&(
              <ListItem button onClick={()=>{props.history.push('/dashboard/crearrecetas')}}>
              <ListItemIcon>
                  <CrearIcon />
                </ListItemIcon>
              <ListItemText primary={"Crear Receta"} />
              </ListItem>
            )}
            
            <Divider />
            <ListItem button onClick={()=>{props.history.push('/dashboard/cuenta')}}>
            <ListItemIcon>
                <AccountCircleIcon/>
            </ListItemIcon>
              <ListItemText primary={"Cuenta"} />
            </ListItem>
            <Divider />
            <ListItem button onClick={()=>logOut()}>
              <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
              <ListItemText primary={"Cerrar Sesión"} />
            </ListItem>
        </List>
      </div>
    );
  
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <span class={classes.marginText}>
                  <img src={require('../assets/logo.png')} height="42" width="42"/>
              </span>

            <Typography variant="h6" noWrap>
             
                  Recetas | Usuario {userName}
        
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, 
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
            <Switch>
                <Route exact path="/dashboard" component={MyRecipes} />
                <Route exact path="/dashboard/misrecetas" component={MyRecipes} />
                <Route exact path="/dashboard/crearrecetas" render={()=>(userType==='medico'?<MakeRecipe/>:<Redirect to="/dashboard"></Redirect>)} />
                <Route exact path="/dashboard/cuenta" component={Profile} />
            </Switch>
        </main>
      </div>
    );
  }
  

export default withRouter(DashboardScreen);