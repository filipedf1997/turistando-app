import { makeAutoObservable } from 'mobx'
// import firebase, { db } from '../../../firebase/firebaseConfig'

class AnnouncementStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default AnnouncementStore
