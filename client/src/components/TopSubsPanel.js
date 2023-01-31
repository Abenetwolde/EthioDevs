import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSubscribe } from '../reducers/subReducer';
import { notify } from '../reducers/notificationReducer';
import SubFormModal from './SubFormModal';
import LoadingSpinner from './LoadingSpinner';
import getErrorMsg from '../utils/getErrorMsg';
import storageService from '../utils/localStorage';
import { useTranslation } from "react-i18next";
import AuthFormModal from './AuthFormModal';
import {
  Paper,
  Typography,
  useMediaQuery,
  Link,
  Button,
  Divider,
  Avatar
} from '@material-ui/core';
import { useSubPanelStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import { getCircularAvatar } from '../utils/cloudinaryTransform';
const TopSubsPanel = () => {
  const { t } = useTranslation();
  const { subs, user } = useSelector((state) => state);
  console.log("Top subs"+subs);
  const dispatch = useDispatch();
  const classes = useSubPanelStyles();
  const theme = useTheme();
  const isNotDesktop = useMediaQuery(theme.breakpoints.down('md'));

  if (isNotDesktop) {
    return null;
  }

  const loggedUser = storageService.loadUser() || user;
console.log(subs);
  const loadingSubs = !subs || !subs.topSubs;

  const isSubscribed = (subscribedBy, user) => {
    return subscribedBy.includes(user?.id);
  };

  const handleJoinSub = async (id, subscribedBy, subredditName) => {
    try {
      let updatedSubscribedBy;
      console.log(loggedUser);
      if (subscribedBy.includes(user.id)) {
        updatedSubscribedBy = subscribedBy.filter((s) => s !== user.id);
      } else {
        updatedSubscribedBy = [...subscribedBy, user.id];
      }
      dispatch(toggleSubscribe(id, updatedSubscribedBy));

      let message = subscribedBy.includes(user.id)
        ? `Unsubscribed from r/${subredditName}`
        : `Subscribed to r/${subredditName}!`;
      dispatch(notify(message, 'success'));
    } catch (err) {
      dispatch(notify(getErrorMsg(err), 'error'));
    }
  };

  return (
    <Paper variant="outlined" className={classes.mainPaper}>
      <Paper variant="outlined" className={classes.listPaper}>
        <Typography variant="h5" color="secondary" className={classes.title}>
        { t('plan_text') }{2+2}
        </Typography>
        {loadingSubs ? (
          <LoadingSpinner text="Fetching subs data..." />
        ) : (

          subs.topSubs.map((s, i) => (

            // <div key={s.id} className={classes.listWrapper}>
            //    <Typography variant="body2" className={classes.listItem}>
            //     {`${i + 1}. `}

            //     <Link
            //       component={RouterLink}
            //       to={`/r/${s.subredditName}`}
            //       color="primary"
            //      >
            //       <div>  r/{s.subredditName} {` - ${s.subscriberCount} members `}</div>

            //     </Link>

            //    </Typography>
            //     {loggedUser && (
            //      <Button
            //        variant="outlined"
            //        color="primary"
            //        size="small"
            //        startIcon={
            //          isSubscribed(s.subscribedBy, user) ? (
            //            <CheckIcon />
            //          ) : (
            //            <AddIcon />
            //          )}

            //        onClick={() =>
            //          handleJoinSub(s.id, s.subscribedBy, s.subredditName)
            //        }
            //      >
            //        {isSubscribed(s.subscribedBy, user) ? 'Joined' : 'Join'}
            //      </Button>

            //    )}
            // </div>
            <>

           <div key={s.id} className={classes.listWrapper}>

            <div className={classes.listItem}>

             <Typography variant="body2" >
               {`${i + 1}. `}  </Typography>

              <Avatar  sx={{}} alt="G" src={(s.imageSubmission?.imageLink)}/>


               {/* <div className={classes.avater} style={`background-image:${s.imageSubmisstion}`}></div> */}
               <div className={classes.avaterAndMember}>
               <Link
                 component={RouterLink}
                 to={`/r/${s.subredditName}`}
                 color="primary"
               >
                 {s.subredditName}
                </Link>
                 {` ${s.subscriberCount} members `}
               </div>


               {/* {loggedUser && ( */}
           {loggedUser ?
                 <Button
                   variant="outlined"
                   color="primary"
                   size="small"
                   startIcon={
                     isSubscribed(s?.subscribedBy, user) ? (
                       <CheckIcon />
                     ) : (
                       <AddIcon />
                     )}

                 onClick={() =>
                   handleJoinSub(s?.id, s?.subscribedBy, s?.subredditName)
                 }
               >
                 {isSubscribed(s?.subscribedBy, user) ? 'Joined' : 'Join'}
               </Button>
              :<AuthFormModal type="Join" /> }
              {/* )} */}
              </div>

           </div>
           <Divider light />
            </>
          ))

        )}
      </Paper>

      {loggedUser?.Admin &&  <SubFormModal />}
    </Paper>
  );
};

export default TopSubsPanel;
