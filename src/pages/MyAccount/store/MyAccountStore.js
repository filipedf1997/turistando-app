import { makeAutoObservable } from 'mobx'
import firebase, { db } from '../../../firebase/firebaseConfig'

class MyAccountStore {
  user = {
    name: '',
    fone: '',
    profile: null,
  }
  isFetching = false

  get disable() {
    return !this.user.name && !this.user.fone && !this.user.profile
  }

  async uptadeUser(currentUser) {
    try {
      this.isFetching = true
      const { uid } = firebase.auth().currentUser
      await db.collection('users').doc(uid).update({
        name: this.user.name || currentUser.name,
        fone: this.user.fone || currentUser.fone,
        profile: this.user.profile || currentUser.profile,
      })
      this.isFetching = false

      return true
    } catch (error) {
      console.log('erro na atualização: ', error)
      this.isFetching = false

      return false
    }
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default MyAccountStore
