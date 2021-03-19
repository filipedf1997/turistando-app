import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, useTheme } from 'react-native-paper'
import {
  Container, Content, HeaderBarLogo, Button, AnnouncementCard, ModalFeedback,
} from '../../components'
import AnnouncementStore from './store/AnnouncementStore'
import { useStores } from '../../hooks/useStores'

const Announcement = observer(({ navigation }) => {
  const [store] = useState(() => new AnnouncementStore())
  const { userStore } = useStores()
  const { colors } = useTheme()

  useEffect(() => {
    store.getAnnouncements()
    store.ownerName = userStore.user.name
    store.ownerDescription = userStore.user.profile
  }, [])

  return (
    <Container style={styles.container}>
      <HeaderBarLogo />
      {store.isFetching ? <ActivityIndicator /> : (
        <Content scrollViewProps={{ contentContainerStyle: [styles.content, { backgroundColor: colors.white }] }}>
          {store.announcements.map((item) => (
            <AnnouncementCard
              key={item.id}
              item={item}
              action={() => {
                store.announcement = item
                navigation.navigate('EditAnnouncement', { store })
              }}
            />
          ))}
        </Content>
      )}
      <View style={styles.buttonWrapper}>
        <Button
          mode="contained"
          disabled={store.isFetching}
          onPress={() => navigation.navigate('NewAnnouncement', { store })}
        >
          Adicionar anúncio
        </Button>
      </View>

      <ModalFeedback
        visible={store.requestFeedback.visible}
        message={store.requestFeedback.message}
        btnName={store.requestFeedback.btnName}
        error={store.requestFeedback.error}
        success={!store.requestFeedback.error}
        onPress={store.requestFeedback.onPress}
        secundaryAction={store.requestFeedback.secundaryAction}
        secundaryName={store.requestFeedback.secundaryName}
      />
    </Container>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    paddingVertical: 20,
  },
  buttonWrapper: { padding: 20 },
})

export default Announcement
