import * as React from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import UpdateIcon from '@mui/icons-material/Update'

type AutoreloadOptions = {
  [key: number]: string
}

const timerOptions: { [key: number]: string } = {
  0: 'OFF',
  5: '5s',
  15: '15s',
  30: '30s',
  60: '1m',
  120: '2m',
}

interface AutoreloadButtonProps {
  autoloader: any
}

export default function AutoreloadButton(props: AutoreloadButtonProps) {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLDivElement>(null)
  //const [selectedIndex, setSelectedIndex] = React.useState(1)
  const [selectedInterval, setSelectedInterval] = React.useState(props?.autoloader?.interval / 1000 || 0)
  const [countdown, setCountdown] = React.useState(0)

  // const handleClick = () => {
  //   //console.info(`You clicked ${options[selectedIndex]}`)
  //   console.info(`You clicked ${selectedInterval}`)
  // }

  // const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
  //   setSelectedIndex(index)
  //   setOpen(false)
  // }

  const handleMenuItemClick2 = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, interval: number) => {
    console.log('interval', interval)
    props.autoloader.setInterval(interval * 1000)
    //setSelectedInterval(interval)
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  React.useEffect(() => {
    if (props.autoloader.interval > 0) {
      const timer = setInterval(() => {
        //const countdownValue = Date.now() - props?.autoloader?.lastExec - props.autoloader.interval
        const countdownValue = props?.autoloader?.lastExec + props.autoloader.interval - Date.now()
        //setCountdown(Math.ceil(countdownValue / 1000))
        setCountdown(countdownValue / 1000)
      }, 1000)
      return () => {
        clearInterval(timer)
      }
    } else {
      setCountdown(0)
    }
  }, [props.autoloader.interval, props.autoloader.lastExec])

  React.useEffect(() => {
    //console.log('AutoreloadButton:mount', props.autoloader.interval)
    setSelectedInterval(props?.autoloader?.interval / 1000 || 0)
  }, [props.autoloader.interval])

  return (
    <React.Fragment>
      <ButtonGroup
        variant='outlined'
        ref={anchorRef}
        aria-label='Autoreload'
        title={`Last updated: ${props?.autoloader?.lastExec ? new Date(props.autoloader.lastExec).toLocaleTimeString() : '?'}`}
      >
        {/*<Button onClick={handleClick}>Autoreload: {options[selectedIndex]}</Button>*/}
        <Button>
          Refresh:
          {selectedInterval > 0 ? ` ${selectedInterval}s (${countdown.toFixed(0)})` : ' OFF'}
        </Button>
        <Button
          size='small'
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label='select merge strategy'
          aria-haspopup='menu'
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper sx={{ zIndex: 9999 }} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                {/*<MenuList id='split-button-menu' autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      //disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>*/}
                <MenuList id='split-button-menu' autoFocusItem>
                  {Object.entries(timerOptions).map((option, index) => (
                    <MenuItem
                      key={option[0]}
                      selected={parseInt(option[0]) === selectedInterval}
                      onClick={(event) => handleMenuItemClick2(event, parseInt(option[0]))}
                    >
                      {option[1]}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  )
}
