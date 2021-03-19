import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { StyleSheet, FlatList, View } from 'react-native'
import { ActivityIndicator, useTheme, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import {
  Container, HeaderBarLogo, AnnouncementCardTraveler, ModalFeedback,
} from '../../components'
import FavoritesStore from './store/FavoritesStore'
import HomeTravelerStore from '../HomeTraveler/store/HomeTravelerStore'

const Favorites = observer(({ navigation }) => {
  const [storeFavotires] = useState(() => new FavoritesStore())
  const [store] = useState(() => new HomeTravelerStore())
  const { colors } = useTheme()

  function renderItem(item) {
    return (
      <AnnouncementCardTraveler
        key={item.id}
        item={item}
        action={() => {
          store.announcement = item
          navigation.navigate('AnnouncementDetails', { store })
        }}
      />
    )
  }

  useEffect(() => {
    storeFavotires.getFavorites()
  }, [])

  return (
    <Container style={[styles.container, { backgroundColor: colors.white }]}>
      <HeaderBarLogo />
      {storeFavotires.isFetching ? <ActivityIndicator style={styles.activityIndicator} /> : (
        storeFavotires.favorites.length ? (
          <FlatList
            data={storeFavotires.favorites}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatList}
          />
        )
          : (
            <View style={styles.textWrapper}>
              <Text style={styles.text}>Você ainda não possui anúncios favoritados</Text>
            </View>
          )
      )}

      <ModalFeedback
        visible={storeFavotires.requestFeedback.visible}
        message={storeFavotires.requestFeedback.message}
        btnName={storeFavotires.requestFeedback.btnName}
        error={storeFavotires.requestFeedback.error}
        success={!storeFavotires.requestFeedback.error}
        onPress={storeFavotires.requestFeedback.onPress}
        secundaryAction={storeFavotires.requestFeedback.secundaryAction}
        secundaryName={storeFavotires.requestFeedback.secundaryName}
      />
    </Container>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    padding: 20,
  },
  activityIndicator: {
    marginTop: 200,
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: RFValue(18),
    textAlign: 'center',
    marginHorizontal: 20,
    opacity: 0.6,
  },
})

export default Favorites
