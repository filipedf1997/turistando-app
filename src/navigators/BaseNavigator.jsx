import React from 'react'
import { observer } from 'mobx-react'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './AppNavigator'
import AuthNavigator from './AuthNavigator'
import { useStores } from '../hooks/useStores'

const BaseNavigator = observer(() => {
  const { userStore } = useStores()
  
  return(
    <NavigationContainer>
      {
        userStore.user ? <AppNavigator /> : <AuthNavigator />
      }
    </NavigationContainer>
  )
})

export default BaseNavigator