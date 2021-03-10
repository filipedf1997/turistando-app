import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import { s, vs } from 'react-native-size-matters'

const DaysLabel = ({ dates }) => {
  const { colors } = useTheme()
  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

  return (
    <View style={styles.container}>
      {days.map((day, index) => (
        <View key={index} style={[styles.wrapper, dates.includes(index) ? { backgroundColor: colors.primary } : { borderWidth: 1 }]}>
          <Text style={{ fontSize: 10, color: dates.includes(index) ? colors.white : colors.lightText }}>
            {day}
          </Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: vs(3),
    marginBottom: vs(7),
  },
  wrapper: {
    alignItems: 'center',
    width: s(18),
    paddingVertical: vs(1),
    borderRadius: 3,
  },
})

export default DaysLabel
