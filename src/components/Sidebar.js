import React, {  useState, forwardRef } from 'react';
import { List, ListItem, Collapse, Button, Drawer, Typography, Box } from '@material-ui/core';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';

import data from './SidebarItems';
import useStyles from './SidebarStyles';


const SideBar = (props) => {
  const [menu, setMenu] = useState({});
  const { className, ...rest } = props;
  const classes  = useStyles();

  const handleClick = (item) => {
    let newData = {...menu, [item] : !menu[item]};
    setMenu(newData);
  }

  const CustomRouterLink = forwardRef((props, ref) => (
    <div ref={ref} style={{ flexGrow: 1 }}>
      <RouterLink {...props} />
    </div>
  ));

  const handleMenu = ( children, level=0 ) => {
    return children.map(({subChildren, name, url, links }) => {
      if (!subChildren) {
        return (
        <List component="div" disablePadding key={name}>
          <ListItem
            className={classes.item}
            disableGutters
            style={{ 
              padding:"0px",     
              borderBottom: '1px solid lightGrey'
          }}
            key={name}>
            <Button
              className={clsx({
                [classes.btnRoot] : true,
                [classes.button] : true,
                [classes.subMenu] : level })}
              component={CustomRouterLink}
              to={url}>
              {name}
            </Button>
          </ListItem>
        </List>
        )
      }
  
      return (
        <div key={name}>
          <ListItem
            className={classes.item}
            disableGutters
            key={name}
            onClick={() => handleClick(name)}>
          </ListItem>
        <Collapse
          in={ (menu[name]) ? true : false }
          timeout="auto"
          unmountOnExit>
          {handleMenu(subChildren, 1)}
        </Collapse>
        </div>
      )
    })
  }

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        classes={{ paper: classes.drawerPaper }}
        elevation={16}
        open={true}
        anchor="left" >
        <Typography
          align={'center'} 
          color={'primary'}      
          component="div"
          style={{ 
            padding:"0px",  
            borderBottom: '1px solid lightGrey'
          }}>
          <Box 
            fontSize={17} 
            fontWeight="fontWeightBold" m={1}>
            Vaatteiden saatavuus
          </Box>
        </Typography>
        <List {...rest} className={clsx(classes.root, className)} >
          {handleMenu(data)}
        </List>
      </Drawer>
    </>
  )
}


export default SideBar;