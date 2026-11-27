import { t } from 'i18next'

const Main = () => {
    return (
        <div className="relative z-10 bg-white  py-2 md:py-2.5 border-b border-gray-200">
            <div className="container mx-auto flex items-center justify-center px-4 sm:px-6 text-center">
                <span className="text-lg lg:text-2xl font-black ">
                    {t("Main")}
                </span>
            </div>
        </div>
    )
}

export default Main
