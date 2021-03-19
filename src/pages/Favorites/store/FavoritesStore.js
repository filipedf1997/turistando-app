import { makeAutoObservable } from 'mobx'
import firebase, { db } from '../../../firebase/firebaseConfig'

class FavoritesStore {
  userUid = firebase.auth().currentUser.uid

  async checkFavorite(announcement) {
    try {
      const querySnapshot = await db.collection('favorites')
        .where('travelerUid', '==', this.userUid)
        .where('announcementId', '==', announcement.id)
        .get()
      return !querySnapshot.empty
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async addFavorite(announcement) {
    try {
      const favorite = {
        announcement,
        announcementId: announcement.id,
        travelerUid: this.userUid,
      }
      await db.collection('favorites').add(favorite)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async removeFavorite(announcement) {
    try {
      const querySnapshot = await db.collection('favorites')
        .where('travelerUid', '==', this.userUid)
        .where('announcementId', '==', announcement.id)
        .get()
      querySnapshot.forEach((doc) => {
        doc.ref.delete()
      })

      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default FavoritesStore
