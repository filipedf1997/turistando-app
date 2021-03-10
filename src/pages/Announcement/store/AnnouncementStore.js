import { makeAutoObservable } from 'mobx'
import firebase, { db, storage } from '../../../firebase/firebaseConfig'

class AnnouncementStore {
  announcements = []
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
  experiencesTypes = [
    {
      value: '1',
      label: 'Passeio de Buggy',
    },
    {
      value: '2',
      label: 'Guia turístico',
    },
    {
      value: '3',
      label: 'Surf',
    },
    {
      value: '4',
      label: 'Kitesurf',
    },
    {
      value: '5',
      label: 'Passeio de barco',
    },
  ]
  days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
  isFetching = false
  requestFeedback = {
    visible: false,
    error: false,
    message: '',
    onPress: null,
    btnName: '',
  }
  photoBlob = ''
  dropdownVisible = false

  get disable() {
    return !this.announcement.title || !this.announcement.experiencesTypes.length
      || !this.announcement.description || !this.announcement.photo
      || !this.announcement.amountText || !this.announcement.dates.length
  }

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
    this.dropdownVisible = false
  }

  handleDayChange(index) {
    if (this.announcement.dates.includes(index)) {
      this.announcement.dates = this.announcement.dates.filter((day) => day !== index)
    } else {
      this.announcement.dates.push(index)
    }
  }

  async createAnnouncement() {
    try {
      this.isFetching = true

      const user = firebase.auth().currentUser
      this.announcement.ownerUID = user.uid
      this.announcement.ownerName = user.displayName
      const { id } = await db.collection('announcements').add(this.announcement)
      await storage.child(`announcements/${id}`).put(this.photoBlob)

      this.isFetching = false
      return true
    } catch (error) {
      this.isFetching = false
      return false
    }
  }

  async editAnnouncement() {
    try {
      this.isFetching = true

      await db.collection('announcements').doc(this.announcement.id).update(this.announcement)
      if (!this.photoBlob) {
        const response = await fetch(this.announcement.photo)
        this.photoBlob = await response.blob()
      }
      await storage.child(`announcements/${this.announcement.id}`).put(this.photoBlob)

      this.isFetching = false
      return true
    } catch (error) {
      this.isFetching = false
      return false
    }
  }

  async getAnnouncements() {
    try {
      const aux = []
      this.isFetching = true

      const { uid } = firebase.auth().currentUser
      const response = await db.collection('announcements').where('ownerUID', '==', uid).get()
      response.forEach((item) => {
        const announcement = item.data()
        announcement.id = item.id
        aux.push(announcement)
      })
      this.announcements = aux

      await this.getPhotos()

      this.isFetching = false
      // console.log(this.announcements)
    } catch (error) {
      console.log(error)
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
      console.log(error)
    }
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default AnnouncementStore
