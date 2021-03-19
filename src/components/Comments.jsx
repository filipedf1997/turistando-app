import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import { Rating } from 'react-native-ratings'
import { RFValue } from 'react-native-responsive-fontsize'
import CircleFirstLetter from './CircleFirstLetter'

const Comments = ({ item }) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.whiteGray }]}>
      <View style={styles.nameWrapper}>
        <CircleFirstLetter name={item.name} />
        <Text style={[styles.name, styles.text]}>
          {item.name}
        </Text>
      </View>
      <Text style={styles.text}>
        {item.comment}
      </Text>
      <Rating
        type="custom"
        ratingCount={5}
        ratingColor={colors.orange}
        ratingBackgroundColor={colors.borderTabColor}
        tintColor={colors.whiteGray}
        readonly
        imageSize={15}
        startingValue={item.stars}
        style={styles.stars}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderRadius: 4,
    padding: 15,
    alignItems: 'flex-start',
  },
  nameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  text: {
    fontSize: RFValue(14),
  },
  name: { marginLeft: 5 },
  stars: { marginTop: 5 },
})

export default Comments
