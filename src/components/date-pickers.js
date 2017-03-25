import React from 'react'
import { View, StyleSheet } from 'react-native'

import DatePicker from 'react-native-datepicker'
const DatePickers = ({onDateChange}) => {
    return(
        <View style={styles.wrapper}>
            <DatePicker
                style={styles.datePicker}
                mode="date"
                placeholder="end date"
                format="YYYY-MM-DD"
                minDate="2016-05-01"
                maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateInput: styles.dateInput,
                    dateIcon: styles.dateIcon
                }}
                onDateChange={(date) => {onDateChange(date)}}
            />

            <DatePicker
                style={styles.datePicker}
                mode="date"
                placeholder="start date"
                format="YYYY-MM-DD"
                minDate="2016-05-01"
                maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateInput: styles.dateInput,
                    dateIcon: styles.dateIcon
                }}
                onDateChange={(date) => {this.setState({date: date})}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
        
    },

    datePicker: {
        width: 150,
        marginTop: 10,
        marginBottom: 10
    },

    dateInput: {
        borderRadius: 20
    },

    dateIcon: {
        height: 0
    }

});
export default DatePickers;