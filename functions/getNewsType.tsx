import { GiLaurelCrown, GiLeeEnfield, GiLuger } from "react-icons/gi";
import { SlBookOpen, SlEnvolopeLetter, SlTrophy } from "react-icons/sl";

export function getNewsType(path:string){

    // Resultate Gewehr:    ["", "MSVS", "Gewehr", "Resultate", {event}, {year}, {document}]
    // Resultate Pistole:   ["", "MSVS", "Pistole", "Resultate", {event}, {year}, {document}]

    // Einladungen Gewehr:  ["", "MSVS", "Gewehr", "Einladungen", {year}, {document}]
    // Einladungen Pistole: ["", "MSVS", "Pistole", "Einladungen", {year}, {document}]

    // Resultate Cup:       ["", "MSVS", "Kantonalcup", {year}, "Resultate", {round}, {document}]
    // Kombinationen Cup:   ["", "MSVS", "Kantonalcup", {year}, "Kombinationen", {round}, {document}]
    // Dokumente Cup:       ["", "MSVS", "Kantonalcup", {year}, "Dokumente", {document}]

    // Dokumente:           ["", "MSVS", "Dokumente", {type}, {document}]

    const pathArray = path.split("/")

    if(pathArray[2] === "Gewehr"){
        return {type: <GiLeeEnfield />, document: pathArray[3] === "Resultate" ? <SlTrophy /> : <SlEnvolopeLetter />}
    }
    if(pathArray[2] === "Pistole"){
        return {type: <GiLuger />, document: pathArray[3] === "Resultate" ? <SlTrophy /> : <SlEnvolopeLetter />}
    }
    if(pathArray[2] === "Kantonalcup"){
        return {type: <GiLaurelCrown />, document: pathArray[4] === "Resultate" ? <SlTrophy /> : <SlEnvolopeLetter />}
    }

    return {type: <SlBookOpen />, document: <></>}
}