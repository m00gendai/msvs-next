export default function getFile(id, setShow){
   setShow == null ? null : setShow(true)
    const setFileId = async function(){
        let file = {"file_id" : id}

        const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body:
            JSON.stringify(file)
        })
        return await response.json()
    }
    
    setFileId().then((data) =>{
        setShow == null ? null : setShow(false)
        window.open(data.url, "_blank")
    })
}