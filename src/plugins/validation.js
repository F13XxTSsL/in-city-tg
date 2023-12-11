import { configure, defineRule } from 'vee-validate'

configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: true
})

defineRule('required', value => {
    if (!value || !value.length) {
        return 'Это поле обязательно к заполнению'
    }
    return true
})

defineRule('checked', value => {
    if (!value) {
        return 'Тут нужно ваше согласие'
    }
    return true
})