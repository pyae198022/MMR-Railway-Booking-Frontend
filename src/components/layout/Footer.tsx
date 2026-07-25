import { useLanguage } from '../../context/LanguageContext'

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-4xl px-4 py-5 text-center text-xs text-slate-500 sm:px-6 sm:text-left">
        {t('footer_copy')}
      </div>
    </footer>
  )
}
