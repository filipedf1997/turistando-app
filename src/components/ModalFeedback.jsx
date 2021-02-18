import React, { useEffect } from 'react'
import {
  Modal, Portal, Text, useTheme,
} from 'react-native-paper'
import { StyleSheet, View, Keyboard } from 'react-native'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'

import Button from './Button'

const ModalFeedback = ({
  visible, message, btnName, dismissable, error, success, onPress, loading, ...props
}) => {
  const { colors } = useTheme()

  useEffect(() => {
    Keyboard.dismiss()
  }, [visible])

  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={dismissable ?? false}
        {...props}
        contentContainerStyle={[styles.modal, { backgroundColor: colors.white }]}
      >
        <View style={styles.image}>
          {success && <AntDesign name="checkcircle" size={68} color={colors.green} />}
          {error && <MaterialIcons name="cancel" size={82} color={colors.red} />}
        </View>
        <Text style={styles.text}>{message}</Text>

        <Button
          mode="contained"
          onPress={onPress}
          loading={loading}
        >
          {btnName}
        </Button>
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 40,
    padding: 20,
    borderRadius: 15,
  },
  image: {
    alignItems: 'center',
    marginBottom: 15,
  },
  text: {
    textAlign: 'center',
    marginBottom: 20,
    marginHorizontal: 10,
  },
})

export default ModalFeedback
