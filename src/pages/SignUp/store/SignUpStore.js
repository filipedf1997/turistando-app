import { makeAutoObservable } from 'mobx'
import firebase from '../../../firebase/firebaseConfig'

class SignUpStore {
  user = {
    name: '',
    email: '',
    password: ''
  }
  isFetching = false

  get disable() {
    return !this.user.name || !this.user.email || !this.user.password
  }

  async createUser() {
    try {
      this.isFetching = true
      const { user: {uid} } = await firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
      delete this.user.password
      await firebase.database().ref(`users/${uid}`).set(this.user)
      await firebase.auth().signOut()
      this.isFetching = false

      return true
    } catch (error) {
      console.log("erro no cadastro: ", error)
      this.isFetching = false

      return false
    }
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default SignUpStore