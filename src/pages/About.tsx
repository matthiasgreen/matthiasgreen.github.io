import { useTranslation } from "react-i18next";

export default function About() {
    const { t } = useTranslation();
    return (
        <div>
            <h1>{t("aboutTitle")}</h1>
            <h2>{t("aboutSubtitle")}</h2>
        </div>
    )
}