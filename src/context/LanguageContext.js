import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18n } from 'i18n-js';
import { translations } from '../../translation';

const LanguageContext = createContext();

export const i18n = new I18n(translations);

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState('English');

  useEffect(() => {
    loadSavedLanguage();
  }, []);

  const loadSavedLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('userLanguage');
      if (savedLanguage) {
        setLocale(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const changeLanguage = async (language) => {
    try {
      await AsyncStorage.setItem('userLanguage', language);
      setLocale(language);
      i18n.locale = language;
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  i18n.locale = locale;
  i18n.enableFallback = true;

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage, t: i18n.translate.bind(i18n) }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);