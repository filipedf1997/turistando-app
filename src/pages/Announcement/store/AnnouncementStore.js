import { makeAutoObservable } from 'mobx'
// import firebase, { db } from '../../../firebase/firebaseConfig'

class AnnouncementStore {
  announcement = {
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
  }

  handleDayChange(index) {
    if (this.announcement.dates.includes(index)) {
      this.announcement.dates = this.announcement.dates.filter((day) => day !== index)
    } else {
      this.announcement.dates.push(index)
    }
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default AnnouncementStore
