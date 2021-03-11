import { makeAutoObservable } from 'mobx'
import firebase, { db, storage } from '../../../firebase/firebaseConfig'

class HomeTravelerStore {
  announcements = []
  isFetching = false
  isRefreshing = false
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
    rating: null,
    comments: [],
    id: '',
  }
  limit = 5
  lastVisible = null
  requestFeedback = {
    visible: false,
    error: false,
    message: '',
    onPress: null,
    btnName: '',
  }
  noMoreAnnouncements = false

  resetStore() {
    this.announcement = {
      title: '',
      experiencesTypes: [],
      description: '',
      photo: null,
      amount: null,
      amountText: '',
      dates: [],
      ownerUID: '',
      ownerName: '',
      rating: null,
      comments: [],
      id: '',
    }
    this.requestFeedback = {
      visible: false,
      error: false,
      message: '',
      onPress: null,
      btnName: '',
    }
    this.photoBlob = ''
  }

  async getAnnouncements() {
    try {
      const aux = []
      this.isFetching = true

      const response = await db.collection('announcements').limit(this.limit).get()
      response.forEach((item) => {
        const announcement = item.data()
        announcement.id = item.id
        aux.push(announcement)
      })
      this.announcements = aux
      this.lastVisible = response.docs[response.docs.length - 1]

      await this.getPhotos()

      this.isFetching = false
    } catch (error) {
      this.requestFeedback = {
        visible: true,
        error: true,
        message: 'Não foi possível recuperar os anúncios. Tente novamente.',
        onPress: () => { this.requestFeedback.visible = false },
        btnName: 'Ok',
      }
    }
  }

  async getPhotos() {
    try {
      this.announcements = await Promise.all(this.announcements.map(async (announcement) => {
        const url = await storage.child(`announcements/${announcement.id}`).getDownloadURL()
        announcement.photo = url
        return announcement
      }))
    } catch (error) {
      throw new Error()
    }
  }

  async getMoreAnnouncements() {
    try {
      if (this.noMoreAnnouncements) {
        return
      }

      let moreAnnouncements = []
      this.isRefreshing = true

      const response = await db.collection('announcements')
        .startAfter(this.lastVisible)
        .limit(this.limit)
        .get()
      response.forEach((item) => {
        const announcement = item.data()
        announcement.id = item.id
        moreAnnouncements.push(announcement)
      })

      moreAnnouncements = await this.getMorePhotos(moreAnnouncements)

      this.announcements = [...this.announcements, ...moreAnnouncements]
      this.lastVisible = response.docs[response.docs.length - 1]

      this.noMoreAnnouncements = response.empty
      this.isRefreshing = false
    } catch (error) {
      this.requestFeedback = {
        visible: true,
        error: true,
        message: 'Não foi possível recuperar mais anúncios. Tente novamente.',
        onPress: () => { this.requestFeedback.visible = false },
        btnName: 'Ok',
      }
    }
  }

  async getMorePhotos(moreAnnouncements) {
    try {
      let moreAnnouncementsCopy = moreAnnouncements
      moreAnnouncementsCopy = await Promise.all(moreAnnouncementsCopy.map(async (announcement) => {
        const url = await storage.child(`announcements/${announcement.id}`).getDownloadURL()
        announcement.photo = url
        return announcement
      }))
      return moreAnnouncementsCopy
    } catch (error) {
      throw new Error()
    }
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default HomeTravelerStore
