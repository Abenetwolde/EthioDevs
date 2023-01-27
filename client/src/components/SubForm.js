import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addNewSub } from '../reducers/subReducer';
import { Formik, Form } from 'formik';
import { TextInput } from './FormikMuiFields';
import { notify } from '../reducers/notificationReducer';
import AlertMessage from './AlertMessage';
import * as yup from 'yup';
import getErrorMsg from '../utils/getErrorMsg';
import TitleIcon from '@material-ui/icons/Title';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import ImageIcon from '@material-ui/icons/Image';
import LinkIcon from '@material-ui/icons/Link';
import PublishIcon from '@material-ui/icons/Publish';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import ChatIcon from '@material-ui/icons/Chat';
import PostAddIcon from '@material-ui/icons/PostAdd'
import generateBase64Encode from '../utils/genBase64Encode';
import { useSubredditFormStyles } from '../styles/muiStyles';
import { Button, Typography,
  useMediaQuery,
  IconButton, } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import AddIcon from '@material-ui/icons/Add';
import { useTheme } from '@material-ui/core/styles';
const validationSchema = yup.object({
  subredditName: yup
    .string()
    .required('Required')
    .max(20, 'Must be at most 20 characters')
    .min(3, 'Must be at least 3 characters')
    .matches(
      /^[a-zA-Z0-9-_]*$/,
      'Only alphanumeric characters allowed, no spaces/symbols'
    ),
  description: yup
    .string()
    .required('Required')
    .max(100, 'Must be at most 100 characters')
    .min(3, 'Must be at least 3 characters'),
});

const SubForm = () => {

  const theme = useTheme();
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const classes = useSubredditFormStyles();
  const history = useHistory();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const fileInputOnChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    setFileName(file.name);
    generateBase64Encode(file, setFieldValue);
  };

  const clearFileSelection = (setFieldValue) => {
    setFieldValue('imageSubmission', '');
    setFileName('');
  };
  const handleCreateSub = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      console.log(values);
      await dispatch(addNewSub(values));
      setSubmitting(false);
      dispatch(
        notify(`New subreddish created: r/${values.subredditName}`, 'success')
      );
      history.push(`/r/${values.subredditName}`);
    } catch (err) {
      setSubmitting(false);
      dispatch(notify(getErrorMsg(err), 'error'));
    }
  };

  return (
    <div className={classes.formWrapper}>
      <Formik
        validateOnChange={true}
        initialValues={{ subredditName: '', description: '' ,imageSubmission: ''}}
        onSubmit={handleCreateSub}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className={classes.form}>
            <div className={classes.input}>
              <Typography
                className={classes.inputIconText}
                color="primary"
                variant="h5"
              >
                r/
              </Typography>
              <TextInput
                name="subredditName"
                type="text"
                placeholder="Enter name"
                label="Subreddish Name"
                required
                fullWidth
              />
            </div>
            <div className={classes.descInput}>
              <InfoIcon className={classes.inputIcon} color="primary" />
              <TextInput
                name="description"
                type="text"
                placeholder="Enter description"
                label="Description"
                required
                fullWidth
                variant="outlined"
                multiline
                rows={2}
                maxRows={Infinity}
              />
            </div>
            <div className={classes.imageInput}>
                <div className={classes.imageBtnsWrapper}>
                  <ImageIcon className={classes.inputIcon} color="primary" />
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    hidden
                    onChange={(e) => fileInputOnChange(e, setFieldValue)}
                    required={true}
                  />
                  <Button
                    component="label"
                    htmlFor="image-upload"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    startIcon={
                      values.imageSubmission ? (
                        <CheckCircleIcon />
                      ) : (
                        <PublishIcon />
                      )
                    }
                    size={isMobile ? 'small' : 'medium'}
                    className={classes.selectBtn}
                  >
                    {values.imageSubmission
                      ? `${isMobile ? '' : 'Selected '}"${fileName}"`
                      : `Select Image`}
                  </Button>
                  {values.imageSubmission && (
                    <IconButton
                      onClick={() => clearFileSelection(setFieldValue)}
                      color="secondary"
                      size={isMobile ? 'small' : 'medium'}
                      className={classes.clearSelectionBtn}
                    >
                      <CancelIcon />
                    </IconButton>
                  )}
                </div>
                {values.imageSubmission && (
                  <div className={classes.imagePreview}>
                    <img
                      alt={fileName}
                      src={values.imageSubmission}
                      width={isMobile ? 250 : 350}
                    />
                  </div>
                )}
              </div>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              size="large"
              className={classes.submitButton}
              disabled={isSubmitting}
              startIcon={<AddIcon />}
            >
              {isSubmitting ? 'Creating' : 'Create Subreddish'}
            </Button>
          </Form>
        )}
      </Formik>
      <AlertMessage
        error={error}
        severity="error"
        clearError={() => setError(null)}
      />
    </div>
  );
};

export default SubForm;
