import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector'
import i18next from "i18next";


const en = {
    appName: 'Constituent Connect',
    loginForm: {
        login: 'Login',
        resetPasswordMessage: 'You are required to reset your password. Please enter a new password below.',
        resetPassword: 'Reset Password',
        userName: 'Username',
        password: 'Password',
        incorrectLoginInfo: 'The email or password provided are incorrect, or not registered with our system.'
    }
}


i18next
.use(initReactI18next)
.use(LanguageDetector)
.init({
    fallbackLng: 'en',
    resources: {
        en: {
            translation: en
        }
    }
})