import { makeAutoObservable } from 'mobx'
import firebase, { db } from '../../../firebase/firebaseConfig'

class SignUpStore {
  user = {
    name: '',
    email: '',
    fone: '',
    password: '',
    confirmPassword: '',
    isProvider: false,
    profile: null,
  }
  isFetching = false
  keyboardHide = true

  get disable() {
    return !this.user.name || !this.user.email || !this.user.password || !this.user.fone
      || !this.user.confirmPassword || (this.user.isProvider && !this.user.profile)
  }

  async createUser() {
    try {
      this.isFetching = true
      const {
        user:
        { uid },
      } = await firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
      delete this.user.password
      delete this.user.confirmPassword
      await db.collection('users').doc(uid).set(this.user)
      await firebase.auth().signOut()
      this.isFetching = false

      return true
    } catch (error) {
      console.log('erro no cadastro: ', error)
      this.isFetching = false

      return false
    }
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default SignUpStore
