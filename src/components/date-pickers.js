import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import DatePicker from 'react-native-datepicker'
const DatePickers = ({onStartDateChange, onEndDateChange, startDate, endDate }) => {
    return(
        <View style={styles.wrapper}>
            <DatePicker
                style={styles.datePicker}
                mode="datetime"
                date={startDate}
                placeholder="start date"
                format="YYYY-MM-DD HH:mm"
               showIcon={false}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateInput: styles.dateInput,
                    dateIcon: styles.dateIcon
                }}
                onDateChange={(date) => {onStartDateChange(date)}}
            />

            <DatePicker
                style={styles.datePicker}
                mode="datetime"
                date={endDate}
                placeholder="end date"
                format="YYYY-MM-DD HH:mm"
                showIcon={false}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateInput: styles.dateInput,
                    dateIcon: styles.dateIcon
                }}
                onDateChange={(date) => {onEndDateChange(date)}}
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
        margin: 10
    },

    dateInput: {
        borderRadius: 20
    },

});
export default DatePickers;