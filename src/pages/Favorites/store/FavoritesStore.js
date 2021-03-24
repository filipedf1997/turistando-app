import { makeAutoObservable } from 'mobx'
import firebase, { db } from '../../../firebase/firebaseConfig'

class FavoritesStore {
  favorites = []
  isFetching = true
  announcement = {
    title: '',
    experiencesTypes: [],
    description: '',
    photo: null,
    amount: null,
    amountText: '',
    dates: [],
    ownerUID: '',
    ownerName: '',
    rating: [],
    averageRatings: 0,
    id: '',
  }
  requestFeedback = {
    visible: false,
    error: false,
    message: '',
    onPress: null,
    btnName: '',
    secundaryAction: null,
    secundaryName: '',
  }
  userUid = firebase.auth().currentUser.uid

  async checkFavorite(announcement) {
    try {
      const response = await db.collection('favorites')
        .where('travelerUid', '==', this.userUid)
        .where('announcementId', '==', announcement.id)
        .get()
      return !response.empty
    } catch (error) {
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
      return false
    }
  }

  async removeFavorite(announcement) {
    try {
      const response = await db.collection('favorites')
        .where('travelerUid', '==', this.userUid)
        .where('announcementId', '==', announcement.id)
        .get()
      response.forEach((doc) => {
        doc.ref.delete()
      })

      return true
    } catch (error) {
      return false
    }
  }

  async getFavorites() {
    try {
      let aux = []

      const unsubscribe = db.collection('favorites')
        .where('travelerUid', '==', this.userUid)
        .onSnapshot((querySnapshot) => {
          aux = []
          querySnapshot.forEach((doc) => {
            aux.push(doc.data().announcement)
          })
          this.favorites = aux
          this.isFetching = false
        })

      firebase.auth().onAuthStateChanged(async (currentUser) => {
        if (!currentUser) {
          unsubscribe()
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default FavoritesStore
