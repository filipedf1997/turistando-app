import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons'
import { s, vs } from 'react-native-size-matters'

const HeaderBarAnnoucementDetail = ({
  arrowAction, favoriteAction, chatAction, isFavorite, onlyArrow,
}) => {
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, { backgroundColor: colors.white }]} onPress={arrowAction}>
        <AntDesign name="arrowleft" size={28} color={colors.black} />
      </TouchableOpacity>

      {!onlyArrow && (
      <View style={styles.innerContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.white }]} onPress={favoriteAction}>
          {isFavorite
            ? <Entypo name="star" style={styles.star} size={28} color={colors.orange} />
            : <Entypo name="star-outlined" style={styles.star} size={28} color={colors.black} />}
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.chat, { backgroundColor: colors.white }]} onPress={chatAction}>
          <MaterialIcons name="chat" size={24} color={colors.black} />
        </TouchableOpacity>
      </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 10,
    justifyContent: 'space-between',
  },
  innerContainer: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: vs(40),
    width: s(38),
  },
  chat: {
    marginLeft: 25,
  },
  star: { marginBottom: 2 },
})

export default HeaderBarAnnoucementDetail
