import s from "/css/callout.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation, faNoteSticky, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";

export default function CustomCallout({ children, type, titleSize=16 }) {

    const className = getClass(type)
    const titleClassName = getTitleClass(type)
    const icon = getIcon(type)
    const title = getTitle(type);

    return (
        <>
            <div className={className}>
                <div>
                    <div className={titleClassName} style={{fontSize: titleSize}}>
                        <FontAwesomeIcon icon={icon} width={titleSize}/>
                        <p>{title}</p>
                    </div>
                </div>
                <div className={s.texts}>{children}</div>
            </div>
        </>
    );
}

function getClass(type) {
    const c = s[type] || '';
    return `${c} ${s.box}`;
}

function getTitleClass(type) {
    return `${s.title} ${s[type + 'title'] || ''}`.trim();
}

function getIcon(type)
{
    switch(type)
    {
        case "warning":
            return faTriangleExclamation;
        case "important":
            return faCircleExclamation;
        case "note":
            return faNoteSticky;
    }
}

function getTitle(type) {
    const { locale } = useRouter();
    switch(locale) {
        case "ja-JP":
            switch(type) {
                case "warning":
                    return "注意";
                case "important":
                    return "重要";
                case "note":
                    return "ノート";
            }
            break
        case "en-US":
            switch(type) {
                case "warning":
                    return "Warning";
                case "important":
                    return "Important";
                case "note":
                    return "Note";
            }
            break
    }
}
