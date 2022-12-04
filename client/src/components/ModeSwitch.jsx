import { Button, useColorMode } from '@chakra-ui/react'
import React from 'react'

const ModeSwitch = () => {
    const { colorMode, toggleColorMode } = useColorMode()
  return (
    <div>
     
          <header>
            <Button onClick={toggleColorMode}>
              Switch to  {colorMode === "light" ? "Dark" : "Light"} mode
            </Button>
          </header>
        
      </div>
  )
}

export default ModeSwitch