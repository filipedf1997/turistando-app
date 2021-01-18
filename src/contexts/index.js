import React from 'react'
import UserStore from '../mobx/UserStore'

export const stores = {
  userStore: new UserStore(),
}

export const storesContext = React.createContext(stores)
