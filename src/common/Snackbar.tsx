import React, { SyntheticEvent, useState } from 'react'
import clsx from 'clsx'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import { amber, green } from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import WarningIcon from '@material-ui/icons/Warning'
import { makeStyles, Theme } from '@material-ui/core/styles'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
}

const useStyles1 = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
}))

export interface Props {
  className: string
  message: string
  onClose: () => void
  variant: keyof typeof variantIcon
}

function MySnackbarContentWrapper(props: Props) {
  const classes = useStyles1()
  const { className, message, onClose, variant } = props
  const Icon = variantIcon[variant]

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby='client-snackbar'
      message={
        <span id='client-snackbar' className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key='close'
          aria-label='close'
          color='inherit'
          onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
    />
  )
}

const useStyles2 = makeStyles((theme: Theme) => ({
  margin: {
    margin: theme.spacing(1)
  }
}))

export interface SnackBarProps {
  variant: keyof typeof variantIcon
  message: string
}

const SnackBar: React.SFC<SnackBarProps> = ({ variant, message }) => {
  const classes = useStyles2()
  const [open, setOpen] = useState(true)

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    event && console.log(event)
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const bar =
    message === '' ? null : (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}>
        <MySnackbarContentWrapper
          onClose={handleClose}
          className={classes.margin}
          variant={variant}
          message={message}
        />
      </Snackbar>
    )

  return <div>{bar}</div>
}

export default SnackBar