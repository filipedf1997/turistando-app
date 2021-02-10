import React from 'react'
import { observer } from 'mobx-react'
import { NavigationContainer } from '@react-navigation/native'
import TravelerNavigator from './TravelerNavigator'
import ProviderNavigator from './ProviderNavigator'
import AuthNavigator from './AuthNavigator'
import { useStores } from '../hooks/useStores'

const BaseNavigator = observer(() => {
  const { userStore } = useStores()

  return (
    <NavigationContainer>
      {
        userStore.user && userStore.idToken
          ? (userStore.user?.isProvider ? <ProviderNavigator /> : <TravelerNavigator />)
          : <AuthNavigator />
      }
    </NavigationContainer>
  )
})

export default BaseNavigator
