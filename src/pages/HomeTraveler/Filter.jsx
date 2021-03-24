import React from 'react'
import { observer } from 'mobx-react'
import { StyleSheet, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { MultiselectDropdown, Dropdown } from 'sharingan-rn-modal-dropdown'
import moment from 'moment'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import {
  Container, Content, HeaderBar, Button, TextInputMask,
} from '../../components'

const Filter = observer(({ navigation, route }) => {
  const store = route?.params?.store
  const { colors } = useTheme()

  function handleConfirmDate(date) {
    store.filterDateText = date
    store.filterDate = moment(date).format('ddd')
    store.showDatePicker = false
  }

  return (
    <Container>
      <HeaderBar onPress={navigation.goBack} />
      <Content>
        <Text style={[styles.title, { color: colors.primary }]}>
          Filtros de pesquisa
        </Text>
        <View style={styles.line} />

        <Text style={[styles.subTitle, { color: colors.primary }]}>
          Ordenar busca
        </Text>
        <View>
          <Dropdown
            label=""
            mode="outlined"
            data={store.sortData}
            value={store.chosenSort}
            disableSort
            onChange={(value) => { store.chosenSort = value }}
          />
        </View>
        <View style={styles.line} />

        <Text style={[styles.subTitle, { color: colors.primary }]}>
          Tipo de Experiência
        </Text>
        <Text style={styles.text}>
          Selecione uma ou mais categorias
        </Text>
        <View>
          <MultiselectDropdown
            label=""
            emptySelectionText="Selecione uma ou mais categorias"
            mode="outlined"
            data={store.experiencesTypes}
            chipType="flat"
            chipTextStyle={{ color: colors.white }}
            chipStyle={{ backgroundColor: colors.blue, borderWidth: 0 }}
            value={store.filterExperiences}
            onChange={(list) => { store.filterExperiences = list }}
            disableSort
          />
        </View>
        <View style={styles.line} />

        <Text style={[styles.subTitle, { color: colors.primary }]}>
          Data pretendida
        </Text>
        <Button
          mode="outlined"
          style={{ borderColor: colors.primary, borderWidth: 1 }}
          onPress={() => { store.showDatePicker = true }}
        >
          {store.filterDateText ? `${moment(store.filterDateText).format('ddd')}, ${moment(store.filterDateText).format('DD/MM/YYYY')}` : 'Selecionar data'}
        </Button>
        <DateTimePickerModal
          pickerContainerStyleIOS={{ backgroundColor: colors.background }}
          cancelTextIOS="Cancelar"
          confirmTextIOS="Confirmar"
          customCancelButtonIOS={() => null}
          modalStyleIOS={styles.modalStyle}
          headerTextIOS="Selecione uma data"
          locale="pt_BR"
          isVisible={store.showDatePicker}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={() => { store.showDatePicker = false }}
          minimumDate={new Date()}
        />
        <View style={styles.line} />

        <Text style={[styles.subTitle, { color: colors.primary }]}>
          Faixa de Preço
        </Text>
        <View style={styles.amountWrapper}>
          <View style={styles.innerAmount}>
            <Text style={styles.textCenter}>Mínimo</Text>
            <TextInputMask
              type="money"
              options={{
                precision: 2,
                separator: ',',
                delimiter: '.',
                unit: 'R$ ',
                suffixUnit: '',
              }}
              placeholder="R$ 0,00"
              mode="flat"
              style={{ backgroundColor: colors.background, height: 45 }}
              value={store.filtertMinAmount}
              includeRawValueInChangeText
              onChangeText={(text, value) => { store.filtertMinAmount = value }}
            />
          </View>
          <View style={styles.innerAmount}>
            <Text style={styles.textCenter}>Máximo</Text>
            <TextInputMask
              type="money"
              options={{
                precision: 2,
                separator: ',',
                delimiter: '.',
                unit: 'R$ ',
                suffixUnit: '',
              }}
              placeholder="R$ 0,00"
              mode="flat"
              style={{ backgroundColor: colors.background, height: 45 }}
              value={store.filtertMaxAmount}
              includeRawValueInChangeText
              onChangeText={(text, value) => { store.filtertMaxAmount = value }}
            />
          </View>
        </View>

        <Button
          mode="contained"
          onPress={() => {
            navigation.goBack()
            store.getAnnouncements()
          }}
        >
          Filtrar
        </Button>
        <Button
          onPress={() => store.clearFilters()}
          style={styles.clearFilterBtn}
        >
          Limpar filtros
        </Button>
      </Content>
    </Container>
  )
})

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    marginTop: 20,
  },
  line: {
    borderTopWidth: 1,
    opacity: 0.6,
    marginVertical: 20,
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  text: {
    marginBottom: 10,
  },
  modalStyle: {
    justifyContent: 'center',
  },
  amountWrapper: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  innerAmount: { width: '35%' },
  textCenter: { textAlign: 'center' },
  clearFilterBtn: {
    marginTop: 10,
    marginBottom: 30,
  },
})

export default Filter
