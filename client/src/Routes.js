import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container,useMediaQuery, } from '@material-ui/core/';

import PostFormModal from './components/PostFormModal';
import PostList from './components/PostList';
import PostCommentsPage from './components/PostCommentsPage';
import UserPage from './components/UserPage';
import SubPage from './components/SubPage';
import TopSubsPanel from './components/TopSubsPanel';
import SearchResults from './components/SearchResults';
import NotFoundPage from './components/NotFoundPage';
import { useTheme  } from '@material-ui/core/styles';

import { useMainPaperStyles } from './styles/muiStyles';
import CarasoleImage from './components/CarasoleImage';

const Routes = () => {
  const theme = useTheme();
  const classes = useMainPaperStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <Switch>
      <Route exact path="/">
        <Container disableGutters className={classes.homepage}>
        <TopSubsPanel />
          <div className={classes.postsPanel}>
           {!isMobile&&<CarasoleImage/>} 
            <PostFormModal />
            <PostList />
          </div>
          
        </Container>
      </Route>
      <Route exact path="/comments/:id">
        <PostCommentsPage />
      </Route>
      <Route exact path="/u/:username">
        <UserPage />
      </Route>
      <Route exact path="/r/:sub">
        <SubPage />
      </Route>
      <Route exact path="/search/:query">
        <SearchResults />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

export default Routes;
