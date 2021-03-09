import { makeAutoObservable } from 'mobx'
import firebase, { db, storage } from '../../../firebase/firebaseConfig'

class AnnouncementStore {
  announcement = {
    title: '',
    experiencesTypes: [],
    description: '',
    photo: null,
    amount: null,
    dates: [],
    ownerUID: '',
    ownerName: '',
    rating: null,
    comments: [],
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

  get disable() {
    return !this.announcement.title || !this.announcement.experiencesTypes.length
      || !this.announcement.description || !this.announcement.photo
      || !this.announcement.amount || !this.announcement.dates.length
  }

  resetStore() {
    this.announcement = {
      title: '',
      experiencesTypes: [],
      photo: null,
      description: '',
      amount: null,
      dates: [],
      owner: null,
      rating: null,
      comments: [],
    }
    this.requestFeedback = {
      visible: false,
      error: false,
      message: '',
      onPress: null,
      btnName: '',
    }
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
      delete this.announcement.photo
      const { id } = await db.collection('announcements').add(this.announcement)
      await storage.child(`announcements/${id}`).put(this.photo)

      this.isFetching = false
      return true
    } catch (error) {
      this.isFetching = false
      return false
    }
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default AnnouncementStore
