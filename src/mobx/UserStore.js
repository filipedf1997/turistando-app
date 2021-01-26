import { makeAutoObservable } from 'mobx'

class UserStore {
  user = null
  idToken = null

  constructor() {
    makeAutoObservable(this)
  }
}

export default UserStore