
export const calulatePercetange_old_and_current_price = (current_price: number, old_price: number) => {
    if (current_price > old_price){
        const positive_result = ((current_price - old_price) * 100) / old_price
        return {result: positive_result, type: 'positive'}
    } else {
        const negative_result = ((old_price - current_price) * 100) / current_price
        return {result: negative_result, type: 'negative'}
    }
}

export const calulatePercetange_previous_and_current_price = (current_price: number, previous_day_price: number) => {
    if (current_price > previous_day_price){
        const positive_result = ((current_price - previous_day_price) * 100) / previous_day_price
        return {result: positive_result, type: 'positive'}
    } else {
        const negative_result = ((previous_day_price - current_price) * 100) / current_price
        return {result: negative_result, type: 'negative'}
    }
}