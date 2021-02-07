import { makeAutoObservable } from 'mobx'
import firebase, { db } from '../../../firebase/firebaseConfig'

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
      const { user: { uid } } = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      const user = await db.collection("users").doc(uid).get()

      this.isFetching = false
      return user.data()
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