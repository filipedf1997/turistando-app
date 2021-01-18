import { makeAutoObservable } from 'mobx'
import firebase from '../../../firebase/firebaseConfig'

class SignInStore {
  email = ''
  password = ''
  isFetching = false

  get disable() {
    return !this.email || !this.password
  }

  async login() {
    try {
      this.isFetching = true
      const { user: {uid} } = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      const snapshot = await firebase.database().ref(`users/${uid}`)
        .once('value')
      this.isFetching = false

      return snapshot.val()
    } catch (error) {
      console.log(error)
      this.isFetching = false

      return false
    }
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default SignInStore